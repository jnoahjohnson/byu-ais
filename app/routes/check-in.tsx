import { useEffect, useState } from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import ContentContainer from "~/components/layout/content-container";
import {
  checkInMember,
  getEventsToday,
  members,
} from "~/services/airtable.server";
import IdForm from "~/components/check-in/id-form";
import EventForm from "~/components/check-in/event-form";
import { CheckIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const error = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const container = {
  hidden: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.5 },
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formStep = formData.get("formStep");

  if (formStep === "id") {
    const netId = formData.get("netId");

    if (typeof netId !== "string") {
      return { error: "Please enter your netId" };
    }

    const member = await members
      .select({ filterByFormula: `{Net ID} = '${netId}'` })
      .firstPage();

    if (member.length === 0) {
      return { error: "Net ID not found" };
    }

    const events = await getEventsToday();

    return {
      hasMember: true,
      memberInfo: {
        id: member[0].id,
        name: member[0].fields["First Name"],
        netId: member[0].fields["Net ID"],
      },
      events,
    };
  } else if (formStep === "event") {
    const eventId = formData.get("eventId");
    const userId = formData.get("userId");
    const hasPlusOne = formData.get("hasPlusOne");

    if (typeof eventId !== "string" || typeof userId !== "string") {
      return { error: "Please select an event" };
    }

    const checkInStatus = await checkInMember(
      eventId,
      userId,
      hasPlusOne ? 2 : 1
    );

    console.log("checkInStatus", checkInStatus);

    if (checkInStatus === "success") {
      return { checkedIn: true };
    } else if (checkInStatus === "alreadyCheckedIn") {
      return { alreadyCheckedIn: true };
    } else {
      return { error: "Something went wrong" };
    }
  }
};

export const loader: LoaderFunction = async () => {
  const events = await getEventsToday();
  console.log(events);
  return {};
};

export default function CheckInPage() {
  const data = useActionData();
  const [pageStep, setPageStep] = useState(1);

  useEffect(() => {
    console.log("data", data);

    if (data?.hasMember) {
      setPageStep(2);
    } else if (data?.checkedIn) {
      setPageStep(3);
    } else if (data?.alreadyCheckedIn) {
      setPageStep(4);
    }
  }, [data]);

  return (
    <ContentContainer>
      <div className="text-center max-w-lg mx-auto py-6">
        <h1 className="font-bold text-2xl text-center">Check In</h1>
        <h2 className="text-lg text-gray-600 mb-4 text-center">
          Are you at an activity? Then you have come to the right place to check
          in.
        </h2>

        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={pageStep}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {pageStep === 1 ? (
              <IdForm />
            ) : pageStep === 2 ? (
              <EventForm
                userName={data?.memberInfo?.name}
                userId={data?.memberInfo?.netId ?? ""}
                events={data?.events ?? []}
              />
            ) : pageStep == 3 ? (
              <div className="max-w-30 h-30">
                <div className="rounded-full w-30 h-40 mx-auto flex items-center justify-center bg-green-600 text-white mb-2">
                  <CheckIcon className="w-24 h-24" />
                </div>
                <p className="font-semibold text-lg text-gray-700">
                  You are checked in! <br />
                  <strong>
                    Make sure to fill out the waivers for the event.
                  </strong>{" "}
                </p>
              </div>
            ) : (
              <div className="max-w-30 h-30">
                <div className="rounded-full w-30 h-40 mx-auto flex items-center justify-center bg-yellow-600 text-white mb-2">
                  <InformationCircleIcon className="w-24 h-24" />
                </div>
                <p className="font-semibold text-lg text-gray-700">
                  It looks like you already checked in... If this is a mistake,
                  let us know or{" "}
                  <a href="/check-in" className="text-blue underline">
                    try again.
                  </a>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          variants={error}
          animate={data?.error ? "show" : "hidden"}
          initial="hidden"
        >
          <p className="text-red-500 text-sm font-bold text-center capitalize">
            {data?.error || ""}
          </p>
          <p className="font-semibold ">
            If you need to join AIS, click{" "}
            <a
              href="https://marriott.byu.edu/clubs/directory"
              className="underline text-blue-400"
            >
              here
            </a>{" "}
            or talk to a volunteer at the event.
          </p>
        </motion.div>
      </div>
    </ContentContainer>
  );
}
