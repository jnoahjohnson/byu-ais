import Airtable from "airtable";
import { DateTime } from "luxon";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });

export const members = airtable.base("appO7gN8LqN4C5Zhn").table("tbl9pxlCSM0Uqz0H9");
export const sponsors = airtable.base("appO7gN8LqN4C5Zhn").table("Sponsors");
export const events = airtable.base("appO7gN8LqN4C5Zhn").table("Events");
export const eventMembers = airtable.base("appO7gN8LqN4C5Zhn").table("Event Members");

export const getSponsors = async () => {
    const records = await sponsors.select({}).all();

    return records.map((record: any) => (
        {
            name: record.get("Name"),
            level: record.get("Level"),
            description: record.get("Description"),
            logo: record.get("Logo")[0].url ?? "",
        }
    ));
}

export const getEventsToday = async () => {
    const dateTime = DateTime.now().setZone('America/Denver').toFormat('MM/dd/yyyy')
    console.log(dateTime)
    const records = await events.select({
        filterByFormula: `IS_SAME({Date},DATETIME_FORMAT(SET_TIMEZONE(TODAY(), 'America/Denver'),'M/D/Y'))`,
    }).all();
    
    return records.map((record: any) => (
        {
            id: record.id,
            title: record.get("Title"),
            date: record.get("Date"),
            location: record.get("Location"),
            description: record.get("Description"),  
        }
    ));
}

export const checkInMember = async (eventId: string, memberId: string, numPeople: number): Promise<string> => {
    const checkIfMemberIsCheckedIn = await eventMembers.select({
        filterByFormula: `AND({Event ID} = "${eventId}", {Net ID} = "${memberId}")`,
    }).all();

    console.log("Checked in", checkIfMemberIsCheckedIn.length);

    if (checkIfMemberIsCheckedIn.length > 0) {
        return "alreadyCheckedIn";
    }

    const createdMember = await eventMembers.create([
        {
            fields: {
                "Event ID": eventId,
                "Net ID": memberId,
                "Number of People": numPeople,
                "Event": [eventId]
            }
        }
    ])

    if (!createdMember) {
        return "error";
    }

    return "success";
}


