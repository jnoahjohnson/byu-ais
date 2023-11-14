import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ContentContainer from "~/components/layout/content-container";
import PageHeader from "~/components/page-header";
import { SponsorInfo } from "~/services/supabase.server";

import { getSponsors } from "~/services/airtable.server";

export const loader: LoaderFunction = async () => {
  const sponsors = await SponsorInfo();

  return json(
    { sponsors },
    {
      headers: {
        "Cache-Control": `public, max-age=43200, s-maxage=43200`,
      },
    }
  );
};

export default function SponsorsPage() {
  const { sponsors } = useLoaderData<{
    sponsors: { name: string; logo: string }[];
  }>();

  return (
    <div className="py-8">
      <ContentContainer>
        <PageHeader
          title="Sponsors"
          subtitle=" We have incredible sponsors. They support the club activities and
            students. Throughout the semester there are info sessions with our
            sponsors to learn more about the opportunities that they provide"
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {sponsors.map(({ name, logo }) => (
            <li
              key={name}
              className="p-6 bg-gray-100 rounded relative flex flex-col items-center justify-center pb-16 aspect-1"
            >
              <img src={logo} alt={name} className="max-h-48 w-auto" />

              <p className="left-4 bottom-4 font-bold text-sm absolute">
                {name}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded w-full bg-gradient-to-br from-blue-500 to-blue-700 text-white p-10">
          <h2 className="text-2xl font-extrabold mb-1">
            Interested in becoming a sponsor?
          </h2>
          <p className="text-lg mb-4">
            Sponsorship not only supports the students, but it also provides you
            with incredible connections through events and info sessions.
          </p>
          <a
            href="https://airtable.com/shrWacVnZuWqgrnHk"
            className="bg-white px-4 py-2 rounded text-blue-900"
            rel="noreferrer"
            target="_blank"
          >
            Request Information
          </a>
        </div>
      </ContentContainer>
    </div>
  );
}
