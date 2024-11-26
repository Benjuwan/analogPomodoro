import { PomodoroTimeContext } from "./PomodoroTimeContext";
import { ReactNode, useState } from "react";
import { setPomodoroTimeType } from "../components/utils/types/ThePomodoroTypes";

export const PomodoroTimeContextFragment = ({ children }: { children: ReactNode }) => {
    // 180deg == 30m（6deg * 30）, 30deg == 5m（6deg * 5）
    const initPomodoroTime: setPomodoroTimeType = {
        focus_reStartTime: 150,
        breakStartTime: 30
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