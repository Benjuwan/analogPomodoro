import { useState } from "react";
import { useHandlePomodoroImgEffect } from "./useHandlePomodoroImgEffect";

type handlePomodoroType = () => {
    handlePomodoro: (pomodoro?: number) => void;
    isBreak: boolean;
    isFocus: boolean;
    isPomodoroDone: boolean;
    pomodoro: number;
    isBtnActive: boolean;
    handlePause: () => void;
    isPause: boolean;
}

export const useHandlePomodoro: handlePomodoroType = () => {
    const [isBreak, setBreak] = useState<boolean>(false);
    const [isFocus, setFocus] = useState<boolean>(false);
    const [isPomodoroDone, setPomodoroDone] = useState<boolean>(false);
    const [pomodoro, setPomodoro] = useState<number>(0); // 初期値は0（1にしてしまうと pomodoroCounter の初期値（1）と差分が生まれず更新されないため）
    let pomodoroCounter: number = pomodoro > 1 ? pomodoro : 1;
    const [isBtnActive, setBtnActive] = useState<boolean>(false);

    /* ポモドーロの視覚的画像の表示に関する処理 */
    const { _beginPomodoroImgEffect, _endPomodoroImgEffect } = useHandlePomodoroImgEffect();

    /* ポモドーロのモード（タスク／休憩）チェンジに関する処理 */
    const _ctrlPomodoroSignal: () => void = () => {
        setFocus(true);
        setBreak(false);
    }

    /* 初期化（リセット）に関する処理 */
    const _initAllReset: (theInterval: number) => void = (theInterval: number) => {
        clearInterval(theInterval);
        pomodoroCounter = 1;
        setPomodoro((_prevPomodoro) => 0);
        setBtnActive(false);
    }

    /* ポモドーロ開始及びモードチェンジ時におけるサウンドエフェクト */
    const _notice: () => void = () => {
        const audioElm: HTMLAudioElement | null = document.querySelector('#noticeSound');
        if (audioElm) {
            audioElm.play();
        }
    }

    /* ポモドーロの一時停止及び当該ポモドーロの再スタートに関する処理 */
    const [isPause, setPause] = useState<boolean>(true);
    const [intervalValue, setIntervalValue] = useState<number>(0);
    const handlePause: () => void = () => {
        isFocus && setFocus(false);
        isBreak && setBreak(false);

        console.log(pomodoroCounter, pomodoro);
        if (isPause) {
            setPomodoro((_prevPomodoro) => pomodoroCounter);
            alert('ポモドーロが中断されました');
            clearInterval(intervalValue);
        } else {
            handlePomodoro(pomodoro);
        }

        // セッター関数は再レンダリングのトリガーなので、初期表示時は（初期設定時の）true のフローに進み、次レンダリング時には false のフローへ進む
        setPause(!isPause);
    }

    /* ポモドーロ本体の機能に関する処理 */
    const handlePomodoro: (pomodoro?: number) => void = (pomodoro?: number) => {
        _notice();
        _beginPomodoroImgEffect();

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
                _notice();
                _initAllReset(theInterval);
                _ctrlPomodoroSignal();
                _endPomodoroImgEffect();
                setPomodoroDone(true);
            }

            else if (countTimer === theBreak) {
                _notice();
                setFocus(false);
                setBreak(true);
                countTimer++;
            }

            else if (countTimer === term) {
                _notice();
                const currPomodoro: number = pomodoro ? pomodoro + 1 : pomodoroCounter++;
                setPomodoro((_prevPomodoro) => currPomodoro);
                _beginPomodoroImgEffect();
                _ctrlPomodoroSignal();
                countTimer = 1; // 秒数カウントリセット
            }

            else {
                countTimer++;
            }

            console.log(countTimer, pomodoroCounter, pomodoro);
        }, 1000);

        setIntervalValue((_prevIntervalValue) => theInterval);
    }

    return { handlePomodoro, isBreak, isFocus, isPomodoroDone, pomodoro, isBtnActive, handlePause, isPause }
}