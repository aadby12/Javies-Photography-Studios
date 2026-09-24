export function PageHero({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="bg-warm-white pt-28 pb-10 md:pt-32 md:pb-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        {eyebrow && (
          <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent-deep">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-display-md font-medium text-ink">{title}</h1>
      </div>
    </div>
  );
}
