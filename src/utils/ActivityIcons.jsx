import { GiBabyBottle, GiNightSleep  } from "react-icons/gi";
import { TbDiaper } from "react-icons/tb";


function getActivityIcon(event) {
    const rawEvent = event?.type || event?.eventType;
    const type = (rawEvent || "").toUpperCase();
    switch (type) {
        case "FEED":
            return <GiBabyBottle className="h-5 w-5 text-blue-500" />;

        case "SLEEP":
            return <GiNightSleep className="h-5 w-5 text-indigo-500" />;

        case "DIAPER":
            return <TbDiaper className="h-5 w-5 text-green-500" />;

        default:
            return null;
    }
}

export default getActivityIcon;
