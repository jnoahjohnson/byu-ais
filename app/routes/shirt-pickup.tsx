import { useEffect, useState } from "react";
import type { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import ContentContainer from "~/components/layout/content-container";
import { shirtCheckIn } from "~/services/airtable.server";
import IdForm from "~/components/check-in/id-form";
import { CheckIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { checkIfMember } from "~/services/supabase.server";

const error = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formStep = formData.get("formStep");

  if (formStep === "id") {
    const netId = formData.get("netId");

    if (
      typeof netId !== "string" ||
      !netId ||
      !netId.replace(/\s/g, "").length
    ) {
      return { error: "Please enter your netId" };
    }

    const isMember = await checkIfMember(netId);

    if (!isMember) {
      return { error: "Net ID not found" };
    }

    const shirtStatus = await shirtCheckIn(netId);

    if (shirtStatus === "error") {
      return { error: "Error checking in" };
    }

    return {
      hasMember: true,
      checkedIn: shirtStatus === "success",
      alreadyCheckedIn: shirtStatus === "alreadyCheckedIn",
    };
  }
};

export default function ShirtPickupPage() {
  const data = useActionData();
  const [pageStep, setPageStep] = useState(1);

  useEffect(() => {
    if (data?.checkedIn) {
      setPageStep(2);
    } else if (data?.alreadyCheckedIn) {
      setPageStep(3);
    }
  }, [data]);

  return (
    <ContentContainer>
      <div className="text-center max-w-lg mx-auto py-6">
        <h1 className="font-bold text-2xl text-center">Shirt Pickup</h1>
        <h2 className="text-lg text-gray-600 mb-4 text-center">
          Pickup your shirt! Enter your Net ID to get started.
        </h2>

        <AnimatePresence>
          <motion.div
            key={pageStep}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {pageStep === 1 ? (
              <IdForm />
            ) : pageStep == 2 ? (
              <div className="max-w-30 h-30">
                <div className="rounded-full w-30 h-40 mx-auto flex items-center justify-center bg-green-600 text-white mb-2">
                  <CheckIcon className="w-24 h-24" />
                </div>
              </div>
            ) : (
              <div className="max-w-30 h-30">
                <div className="rounded-full w-30 h-40 mx-auto flex items-center justify-center bg-yellow-600 text-white mb-2">
                  <InformationCircleIcon className="w-24 h-24" />
                </div>
                <p className="font-semibold text-lg text-gray-700">
                  It looks like you already checked in for a shirt... If this is
                  a mistake, let us know or{" "}
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
          <p className="text-red-500 text-sm font-bold text-center capitalize my-1">
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
            or talk to a volunteer
          </p>
        </motion.div>
      </div>
    </ContentContainer>
  );
}
