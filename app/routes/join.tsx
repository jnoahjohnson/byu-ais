import PageHeader from "~/components/page-header";

export default function JoinPage() {
  return (
    <div className="max-w-prose mx-auto px-4 py-8">
      <PageHeader
        title="Join AIS"
        subtitle="Ready to join? Click on the link below to get started!"
      />
      <a
        href="https://marriott.byu.edu/clubs/directory"
        target="_blank"
        rel="noreferrer"
        className="items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
      >
        Join AIS
      </a>
    </div>
  );
}
