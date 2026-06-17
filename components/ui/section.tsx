export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`px-4 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-6 lg:px-8 lg:pb-20 lg:pt-8 ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
