import {
  QuestionMarkCircleIcon,
  CheckIcon,
  UserGroupIcon,
  CpuChipIcon,
  ComputerDesktopIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ContentContainer from "~/components/layout/content-container";
import { getSponsors, members, sponsors } from "~/services/airtable.server";
import { activityData } from "~/data/data";
import ActivityOverview from "~/components/activities/activity-overview";

const features = [
  {
    name: "New? Learn more here",
    description:
      "Are you interested and want to learn more about us? Then click here to check out our about us page!",
    icon: QuestionMarkCircleIcon,
    href: "/about",
  },
  {
    name: "Convinced Yet?",
    description:
      "AIS is a network of students interested in the field of Information Systems. Click to join today!",
    icon: CheckIcon,
    href: "/join",
  },
  {
    name: "Our Sponsors",
    description:
      "Looking for a great place for an internship or full time job? Our sponsors hire more students than anyone else!",
    icon: UserGroupIcon,
    href: "/sponsors",
  },
];

export const loader: LoaderFunction = async ({}) => {
  const sponsorList = await getSponsors();

  return {
    featuredSponsors: sponsorList.filter(
      (sponsor) => sponsor.level === "Platinum"
    ),
  };
};

export default function Index() {
  const { featuredSponsors } = useLoaderData();

  return (
    <>
      <div className="w-full h-[515px] relative text-white flex items-center justify-start flex-col">
        <img
          src="https://images.unsplash.com/photo-1585156569731-4c5b959234f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
          alt="BYU Campus"
          className="inset-0 w-full h-full absolute object-cover object-center blur-sm"
        />
        <div className="inset-0 absolute w-full h-full bg-black opacity-50 " />
        <div className="absolute inset-0 w-full h-full flex justify-center flex-col px-4 sm:px-6 max-w-7xl mx-auto">
          <h1 className="font-extrabold text-4xl mb-2">Welcome to AIS!</h1>
          <h2 className="text-xl text-gray-200 max-w-3xl font-light">
            We are the Association of Information Systems at BYU. Our goal is to
            help students and alumni learn new skills, connect with eachother,
            and grow in their careers.
          </h2>
        </div>
      </div>

      <div className="text-white -mt-36 z-40">
        <ContentContainer>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 py-12 text-center">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <Link to={feature.href}>
                  <div className="flow-root rounded-lg bg-slate-50 px-6 pb-8 hover:shadow-lg hover:bg-slate-100 transition-all duration-200">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-400 to-blue-500 p-3 shadow-lg">
                          <feature.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </ContentContainer>
      </div>
      <ContentContainer>
        <div className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-lg font-semibold text-blue-600">
                Activities
              </h2>
              <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                So many ways to learn and connect
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                There are a variety of different activities that AIS puts on to
                help students grow their network and skills. Best of all, there
                is almost always food!
              </p>
            </div>

            <ActivityOverview />
          </div>
        </div>
      </ContentContainer>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            Sponsors that can help you grow
          </h2>
          <p className="text-center text-md font-semibold text-gray-600 mt-3">
            Featured Sponsors
          </p>

          <div className="mt-1 grid grid-cols-2 gap-0.5 md:grid-cols-3 ">
            {featuredSponsors.map((sponsor: any) => (
              <div
                className="col-span-1 flex justify-center bg-gray-50 py-8 px-8"
                key={sponsor.name}
              >
                <img
                  className="max-h-12"
                  src={sponsor.logo}
                  alt={sponsor.name}
                />
              </div>
            ))}
            {featuredSponsors.length % 3 !== 0 && (
              <div
                className="col-span-1 justify-center items-center bg-gray-50 py-8 px-8 md:flex hidden"
                key="others"
              >
                <p className="font-bold">Many More...</p>
              </div>
            )}
          </div>
          <div className="text-center mt-4">
            <Link
              to="/sponsors"
              className="text-blue-600 hover:text-blue-500 text-center"
            >
              See All Sponsors
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center py-12">
        <ContentContainer>
          <h2 className="font-bold text-3xl mb-2">
            400 Active members and counting…
          </h2>
          <h3 className="text-xl font-normal mb-6">
            In just the BYU chapter alone! Not to mention the other 65 chapters
            worldwide.
          </h3>
          <a
            href="https://marriott.byu.edu/clubs/directory"
            target="_blank"
            rel="noreferrer"
            className="mx-auto bg-white text-gray-800 px-4 py-2 rounded font-bold text-lg"
          >
            Join Today
          </a>
        </ContentContainer>
      </div>
    </>
  );
}
