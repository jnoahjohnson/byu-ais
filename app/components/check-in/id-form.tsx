import { Form, useTransition } from "@remix-run/react";

export default function IdForm() {
  const transition = useTransition();

  return (
    <Form method="post">
      <div className="max-w-xl mx-auto">
        <input type="hidden" name="formStep" value="id" />
        <div className="mt-1">
          <input
            type="netId"
            name="netId"
            id="netId"
            spellCheck="false"
            disabled={transition.state === "submitting"}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-4 mb-1 disabled:bg-gray-50 transition-all duration-100 bg-white"
            placeholder="Enter your Net ID"
          />
        </div>
        <button
          type="submit"
          disabled={transition.state === "submitting"}
          className={`px-4 py-2 rounded text-white transition-all duration-200 hover:shadow-lg bg-blue-500 mb-2 disabled:animate-pulse`}
        >
          Check In
        </button>
      </div>
    </Form>
  );
}
