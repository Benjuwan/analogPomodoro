import { createContext } from "react";
import { setPomodoroTimeType } from "../components/utils/types/ThePomodoroTypes";

type Default = {
    pomodoroTime: setPomodoroTimeType;
    setPomodoroTime: React.Dispatch<React.SetStateAction<setPomodoroTimeType>>;
}
export const PomodoroTimeContext = createContext({} as Default);