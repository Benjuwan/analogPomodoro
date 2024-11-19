import { createContext, ReactNode, useState } from "react";

type Default = {
    pomodoroStart: boolean;
    setPomodoroStart: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PomodoroStartContext = createContext({} as Default);

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