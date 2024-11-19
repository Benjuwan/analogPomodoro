import { createContext, ReactNode, useState } from "react";
import { setPomodoroTimeType } from "../components/utils/types/ThePomodoroTypes";

type Default = {
    pomodoroTime: setPomodoroTimeType;
    setPomodoroTime: React.Dispatch<React.SetStateAction<setPomodoroTimeType>>;
}
export const PomodoroTimeContext = createContext({} as Default);

export const PomodoroTimeContextFragment = ({ children }: { children: ReactNode }) => {
    const initPomodoroTime: setPomodoroTimeType = {
        focus_reStartTime: 6, // 180
        breakStartTime: 12, // 30
    }
    const [pomodoroTime, setPomodoroTime] = useState<setPomodoroTimeType>(initPomodoroTime);

    return (
        <PomodoroTimeContext.Provider value={{
            pomodoroTime, setPomodoroTime
        }}>
            {children}
        </PomodoroTimeContext.Provider>
    );
}