import { useState } from "react";

export const useHandlePomodoro = () => {
    let pomodoroCounter: number = 1;

    const [isBreak, setBreak] = useState<boolean>(false);
    const [isFocus, setFocus] = useState<boolean>(false);
    const [isPomodoroDone, setPomodoroDone] = useState<boolean>(false);
    const [pomodoro, setPomodoro] = useState<number>(0); // 初期値は0
    const [isBtnActive, setBtnActive] = useState<boolean>(false);

    const _ctrlPomodoroSignal: () => void = () => {
        setFocus(true);
        setBreak(false);
    }

    const _initAllReset: (theInterval: number) => void = (theInterval: number) => {
        clearInterval(theInterval);
        pomodoroCounter = 1;
        setPomodoro((_prevPomodoro) => 0);
        setBtnActive(false);
    }

    const _beginPomodoro: () => void = () => {
        const pomodoroImg: HTMLElement | null = document.querySelector('.pomodoroImg');
        if (pomodoroImg !== null) {
            const currMinutes: number = new Date().getMinutes();
            const targetMinutesDeg: number = Math.floor(currMinutes * 6); // 360/60（6度ずつ進む）
            pomodoroImg.style.setProperty('visibility', 'visible');
            pomodoroImg.style.setProperty('rotate', `${targetMinutesDeg}deg`);
        }

        const clockLong: HTMLElement | null = document.querySelector('#long');
        if (clockLong) {
            clockLong.style.setProperty('background-color', '#ff2727');
        }
    }

    const _endPomodoro: () => void = () => {
        const pomodoroImg: HTMLElement | null = document.querySelector('.pomodoroImg');
        if (pomodoroImg !== null) {
            pomodoroImg.style.setProperty('visibility', 'hidden');
        }

        const clockLong: HTMLElement | null = document.querySelector('#long');
        if (clockLong) {
            clockLong.style.setProperty('background-color', '#333');
        }
    }

    // 予期せぬ中断があった場合は、そのポモドーロをリセットする必要があります

    const handlePomodoro: () => void = () => {
        _beginPomodoro();

        setBtnActive(true);
        setFocus(true);

        if (isPomodoroDone) {
            setPomodoroDone(false);
        }

        // 45
        const theBreak: number = 45;                  // 1500 == 25m
        const theTerm_30min: number = theBreak + 300;   // 300 == 5m
        const term: number = 60;

        let countTimer: number = 0;
        const theInterval: number = setInterval(() => {
            if (pomodoroCounter === 4 && countTimer >= term) {
                _initAllReset(theInterval);
                _ctrlPomodoroSignal();
                _endPomodoro();
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
                _beginPomodoro();
                _ctrlPomodoroSignal();
                countTimer = 1; // 秒数カウントリセット
            }

            else {
                countTimer++;
            }

            console.log(countTimer, pomodoroCounter);
        }, 1000);
    }

    return { handlePomodoro, isBreak, isFocus, isPomodoroDone, pomodoro, isBtnActive }
}