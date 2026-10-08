import Image from "next/image";

type LogoProps = {
  tone?: "ink" | "light";
};

export function Logo({ tone = "ink" }: LogoProps) {
  const sub = tone === "light" ? "text-warm-white/75" : "text-ink-faint";

  return (
    <span className="inline-grid grid-cols-[auto_auto] items-start leading-none">
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={240}
        height={243}
        priority
        className="col-start-1 row-span-2 row-start-1 h-12 w-auto md:h-[3.35rem]"
      />
      <span className="col-start-2 row-start-1 -ml-[3px] pt-px font-display text-[1.45rem] font-medium tracking-[-0.04em] text-accent md:text-[1.65rem]">
        avies
      </span>
      <span
        className={`col-start-2 row-start-2 -ml-[3px] mt-1 font-sans text-[8px] font-medium uppercase tracking-[0.28em] md:text-[9px] ${sub}`}
      >
        Photography Studios
      </span>
    </span>
  );
}
