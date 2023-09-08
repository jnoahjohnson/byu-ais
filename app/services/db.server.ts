import { PrismaClient } from "@prisma/client";

import { singleton } from "./singleton.server";
import { DateTime } from "luxon";

// Hard-code a unique key, so we can look up the client when this module gets re-imported
export const db = singleton("prisma", () => new PrismaClient());

export const checkInMember = async (
  eventId: number,
  netId: string,
  numPeople: number
): Promise<string> => {
  const checkIfMemberIsCheckedIn = await db.event.findFirst({
    where: {
      id: eventId,
      checkIns: {
        some: {
          netId,
        },
      },
    },
  });

  console.log("Checked in", checkIfMemberIsCheckedIn);

  if (checkIfMemberIsCheckedIn) {
    return "alreadyCheckedIn";
  }

  const checkIn = await db.checkIn.create({
    data: {
      eventId,
      netId,
      numPeople,
    },
  });

  if (!checkIn) {
    return "error";
  }

  return "success";
};

// export const getEventsToday = async () => {
//     const dateTime = DateTime.now().setZone('America/Denver').toFormat('MM/dd/yyyy')
//     console.log(dateTime)
//     const records = await events.select({
//         filterByFormula: `IS_SAME({Date},DATETIME_FORMAT(SET_TIMEZONE(TODAY(), 'America/Denver'),'M/D/Y'))`,
//     }).all();

//     return records.map((record: any) => (
//         {
//             id: record.id,
//             title: record.get("Title"),
//             date: record.get("Date"),
//             location: record.get("Location"),
//             description: record.get("Description"),
//         }
//     ));
// }
export const getEventsToday = async () => {
  return await db.event.findMany({
    where: {
      date: {
        lte: DateTime.now().plus({ days: 1 }).toJSDate(),
        gte: DateTime.now().minus({ days: 1 }).toJSDate(),
      },
    },
  });
};
