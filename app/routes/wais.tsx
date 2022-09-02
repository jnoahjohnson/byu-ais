import PageHeader from "~/components/page-header";

export default function AboutPage() {
  return (
    <div className="max-w-prose mx-auto px-4 py-8">
      <PageHeader
        title="WAIS"
        subtitle="Learn more about the Women of Information Systems!"
      />
      <a
        href="https://marriott.byu.edu/clubs/directory"
        target="_blank"
        rel="noreferrer"
        className="items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
      >
        Go to WAIS Website
      </a>
    </div>
  );
}
