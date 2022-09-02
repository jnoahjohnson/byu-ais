import { Form, useTransition } from "@remix-run/react";
import { useState } from "react";

export default function EventForm({
  userId,
  events,
  userName,
}: {
  userId: string;
  events: any[];
  userName: string;
}) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const transition = useTransition();

  return (
    <div className="text-left">
      <h2 className="text-2xl font-bold mb-4">Hi {userName}!</h2>
      <h3 className="text-lg font-semibold text-gray-700">Select the Event</h3>
      {events.map((event) => (
        <button
          className={`flex items-center justify-between py-4 w-full ${
            selectedEvent === event.id
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-800"
          } border-2 border-solid border-blue-400 rounded p-2 mb-2 transition-all duration-200 hover:shadow-lg`}
          key={event.id}
          type="button"
          onClick={() =>
            selectedEvent === event.id
              ? setSelectedEvent(null)
              : setSelectedEvent(event.id)
          }
        >
          <p className="font-bold text-xl">{event.title}</p>
        </button>
      ))}
      <Form method="post">
        <input type="hidden" name="eventId" value={selectedEvent ?? ""} />
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="formStep" value="event" />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="hasPlusOne"
            id="hasPlusOne"
            className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
          />
          <label htmlFor="hasPlusOne" className="text-lg">
            Do you have a plus one?
          </label>
        </div>
        <button
          type="submit"
          disabled={transition.state === "submitting" || !selectedEvent}
          className={`px-4 py-2 rounded text-white transition-all duration-200 hover:shadow-lg bg-blue-500 mb-2 disabled:bg-gray-500 mx-auto block`}
        >
          Check In
        </button>
      </Form>
    </div>
  );
}
