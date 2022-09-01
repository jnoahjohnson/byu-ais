import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ContentContainer from "~/components/layout/content-container";
import { getClient } from "~/lib/sanity/get-client";

export const loader: LoaderFunction = async () => {
  const sponsors = await getClient().fetch(
    `*[_type == "sponsor"]{ name, logo }`
  );

  console.log(sponsors);
  return { sponsors };
};

export default function SponsorsPage() {
  const { sponsors } = useLoaderData<{
    sponsors: { name: string; logo: string }[];
  }>();

  return (
    <ContentContainer>
      <h1>Sponsors</h1>
      <ul className="grid grid-cols-3 gap-2">
        {sponsors.map(({ name, logo }) => (
          <li key={name}>
            <img src={logo} alt={name} className="w-full" />
            <p>{name}</p>
          </li>
        ))}
      </ul>
    </ContentContainer>
  );
}
