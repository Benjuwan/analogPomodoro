import { useState } from "react";

export const useHandlePomodoro = () => {
    let pomodoroCounter: number = 1;

    const [isBreak, setBreak] = useState<boolean>(false);
    const [isFocus, setFocus] = useState<boolean>(false);
    const [isPomodoroDone, setPomodoroDone] = useState<boolean>(false);
    const [pomodoro, setPomodoro] = useState<number>(0); // 初期値は0
    const [isBtnActive, setBtnActive] = useState<boolean>(false);

    const _initSignalReset = () => {
        setFocus(false);
        setBreak(false);
    }

    const _initAllReset: (theInterval: number) => void = (theInterval: number) => {
        clearInterval(theInterval);
        pomodoroCounter = 1;
        setPomodoro((_prevPomodoro) => 0);
        setBtnActive(false);
    }

    const handlePomodoro = () => {
        setBtnActive(true);
        setFocus(true);

        if (isPomodoroDone) {
            setPomodoroDone(false);
        }

        const theBreak: number = 9;            // 1500 == 25m
        const theTerm_30min: number = theBreak + 300;   // 300 == 5m
        const term: number = 10;

        let countTimer: number = 0;
        const theInterval: number = setInterval(() => {
            if (pomodoroCounter === 4 && countTimer >= term) {
                _initAllReset(theInterval);
                _initSignalReset();
                setPomodoroDone(true);
            }

            else if (countTimer === theBreak) {
                setFocus(false);
                setBreak(true);
                countTimer++;
            }

            else if (countTimer === term) {
                const currPomodoro: number = pomodoroCounter++;
                setPomodoro((_prevPomodoro) => currPomodoro);
                _initSignalReset();
                countTimer = 1; // 秒数カウントリセット
            }

            else {
                setFocus(true);
                countTimer++;
            }

            console.log(countTimer, pomodoroCounter);
        }, 1000);
    }

    return { handlePomodoro, isBreak, isFocus, isPomodoroDone, pomodoro, isBtnActive }
}