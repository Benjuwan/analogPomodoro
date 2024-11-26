import { ReactNode, useState } from "react";
import { PomodoroStartContext } from "./PomodoroStartContext";

export const PomodoroStartContextFragment = ({ children }: { children: ReactNode }) => {
    const [pomodoroStart, setPomodoroStart] = useState<boolean>(false);

    return (
        <PomodoroStartContext.Provider value={{
            pomodoroStart, setPomodoroStart
        }}>
            {children}
        </PomodoroStartContext.Provider>
    );
}