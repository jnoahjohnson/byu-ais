import PageHeader from "~/components/page-header";

export default function AboutPage() {
  return (
    <div className="max-w-prose mx-auto px-4 py-8">
      <PageHeader title="About Us" subtitle="" />
      <h2 className="text-2xl font-bold text-gray-800">Who is AIS?</h2>
      <p className="max-w-xl text-md text-gray-700 leading-leading mb-8">
        The Association for Information Systems (AIS) serves society through the
        advancement of knowledge and the promotion of excellence in the practice
        and study of information systems. AIS is the premier professional
        association for individuals and organizations who lead the research,
        teaching, practice, and study of information systems worldwide. BYU
        founded a local student chapter of AIS in 1993 in order to further this
        mission through Information Systems graduates.
      </p>
      <h2 className="text-2xl font-bold text-gray-800">Our Purpose</h2>
      <p className="max-w-xl text-md text-gray-700 leading-leading mb-8">
        We serve our members by promoting and developing Information
        Systems-related skills, career exploration, and dynamic relationships
        with professionals, recruiters, and students.
      </p>
      <h2 className="text-2xl font-bold text-gray-800">Giving Back</h2>
      <p className="max-w-xl text-md text-gray-700 leading-leading">
        AIS, in conjunction with the Information Systems department, provides
        the means for students to gain world-class experience. Alumni are
        encouraged to give back to the program for those that come after.
      </p>
    </div>
  );
}
