import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED_SERVICES = new Set([
  "Maternity",
  "Newborn",
  "Milestone",
  "Family",
  "Traditional",
  "Portrait",
  "Christmas",
]);

type BookingBody = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  website?: string; // honeypot
};

function clean(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingBody;

    // Honeypot — bots fill this; humans never see it
    if (clean(body.website)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160);
    const service = clean(body.service, 80);
    const preferredDate = clean(body.preferredDate, 40);
    const preferredTime = clean(body.preferredTime, 40);
    const message = clean(body.message, 2000);

    if (!name || !phone || !email || !service) {
      return NextResponse.json(
        { ok: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!ALLOWED_SERVICES.has(service)) {
      return NextResponse.json(
        { ok: false, error: "Please select a valid photography service." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const javiesEmail = process.env.JAVIES_EMAIL;
    const fromEmail =
      process.env.BOOKING_FROM_EMAIL || "Javies Photography Studio <onboarding@resend.dev>";

    if (!apiKey || !javiesEmail) {
      console.error("[booking] Missing RESEND_API_KEY or JAVIES_EMAIL");
      return NextResponse.json(
        {
          ok: false,
          error:
            "Something went wrong while sending your request. Please try again or contact us directly on WhatsApp.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const submittedAt = new Date().toLocaleString("en-GB", {
      timeZone: "Africa/Accra",
      dateStyle: "full",
      timeStyle: "short",
    });

    const adminHtml = `
      <div style="font-family: Georgia, serif; color: #1a1614; max-width: 560px; margin: 0 auto;">
        <h1 style="font-size: 22px; font-weight: 500; margin: 0 0 8px;">New Session Request</h1>
        <p style="font-size: 13px; color: #5c534c; margin: 0 0 24px;">Submitted ${submittedAt} (Accra)</p>
        <table style="width: 100%; border-collapse: collapse; font-family: system-ui, sans-serif; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #8a8178; width: 140px;">Client Name</td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a8178;">Phone</td><td style="padding: 8px 0;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a8178;">Email</td><td style="padding: 8px 0;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a8178;">Photography Service</td><td style="padding: 8px 0;">${escapeHtml(service)}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a8178;">Preferred Date</td><td style="padding: 8px 0;">${escapeHtml(preferredDate || "—")}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a8178;">Preferred Time</td><td style="padding: 8px 0;">${escapeHtml(preferredTime || "—")}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a8178; vertical-align: top;">Message</td><td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(message || "—")}</td></tr>
        </table>
      </div>
    `;

    const { error: adminError } = await resend.emails.send({
      from: fromEmail,
      to: [javiesEmail],
      replyTo: email,
      subject: "New Photography Session Request — Javies Photography Studio",
      html: adminHtml,
    });

    if (adminError) {
      console.error("[booking] Resend admin error:", adminError);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Something went wrong while sending your request. Please try again or contact us directly on WhatsApp.",
        },
        { status: 502 }
      );
    }

    // Customer confirmation (non-blocking failure — admin email already sent)
    try {
      await resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: "Your Session Request — Javies Photography Studio",
        html: `
          <div style="font-family: Georgia, serif; color: #1a1614; max-width: 560px; margin: 0 auto;">
            <h1 style="font-size: 22px; font-weight: 500; margin: 0 0 16px;">Thank you, ${escapeHtml(name)}</h1>
            <p style="font-family: system-ui, sans-serif; font-size: 15px; line-height: 1.6; color: #5c534c;">
              Thank you for your session request. Javies Photography Studio has received your enquiry and will confirm your preferred date and time.
            </p>
            <p style="font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.6; color: #8a8178; margin-top: 24px;">
              Service: ${escapeHtml(service)}<br/>
              Preferred date: ${escapeHtml(preferredDate || "To be confirmed")}<br/>
              Preferred time: ${escapeHtml(preferredTime || "To be confirmed")}
            </p>
            <p style="font-family: system-ui, sans-serif; font-size: 13px; color: #8a8178; margin-top: 32px;">
              Javies Photography Studio · Accra, Ghana
            </p>
          </div>
        `,
      });
    } catch (confirmErr) {
      console.error("[booking] Confirmation email failed:", confirmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[booking] Unexpected error:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong while sending your request. Please try again or contact us directly on WhatsApp.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
