import { createContext } from "react";

type Default = {
    pomodoroStart: boolean;
    setPomodoroStart: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PomodoroStartContext = createContext({} as Default);