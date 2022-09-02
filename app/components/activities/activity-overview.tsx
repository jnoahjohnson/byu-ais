import { activityData } from "~/data/data";

export default function ActivityOverview() {
  return (
    <div className="mt-10">
      <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
        {activityData.map((activity) => (
          <div key={activity.name} className="relative">
            <dt>
              <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-slate-50 shadow text-blue-600">
                <activity.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg font-medium leading-6 text-blue-900">
                {activity.name}
              </p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              {activity.description}
            </dd>
          </div>
        ))}
      </dl>

      <div className="py-12">
        <iframe
          title="ais-calendar"
          src="https://calendar.google.com/calendar/embed?src=ais.byu%40gmail.com&ctz=America%2FDenver"
          width="800"
          height="600"
          className="mx-auto max-w-full"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}
