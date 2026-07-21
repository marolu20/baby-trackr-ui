import { GiBabyBottle, GiNightSleep  } from "react-icons/gi";
import { TbDiaper } from "react-icons/tb";


function getActivityIcon(eventType) {
    switch (eventType) {
        case "Feed":
            return <GiBabyBottle className="h-5 w-5 text-blue-500" />;


        case "Sleep":
            return <GiNightSleep className="h-5 w-5 text-indigo-500" />;


        case "Diaper":
            return <TbDiaper className="h-5 w-5 text-green-500" />;


        default:
            return null;
    }
}

export default getActivityIcon;
