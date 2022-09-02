export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="pb-6">
      <h1 className="text-4xl font-extrabold">{title}</h1>
      <p className="max-w-xl text-lg text-gray-700">{subtitle}</p>
    </header>
  );
}
