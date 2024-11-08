import { useState } from "react";
import { useHandlePomodoroImgEffect } from "./useHandlePomodoroImgEffect";

type handlePomodoroType = () => {
    handlePomodoro: () => void;
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
    const [pomodoro, setPomodoro] = useState<number>(1);
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
        setPomodoro((_prevPomodoro) => 1);
        setBtnActive(false);
    }

    /* ポモドーロ開始及びモードチェンジ時におけるサウンドエフェクト */
    const _notice: (audioElmStr: string) => void = (audioElmStr: string) => {
        const audioElm: HTMLAudioElement | null = document.querySelector(`#${audioElmStr}`);
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

        if (isPause) {
            setPomodoro((_prevPomodoro) => pomodoro);
            alert('ポモドーロが中断されました');
            clearInterval(intervalValue);
        } else {
            handlePomodoro();
        }

        // セッター関数は再レンダリングのトリガーなので、初期表示時は（初期設定時の）true のフローに進み、次レンダリング時には false のフローへ進む
        setPause(!isPause);
    }

    /* ポモドーロ本体の機能に関する処理 */
    const handlePomodoro: () => void = () => {
        _notice('startSound');
        _beginPomodoroImgEffect();

        setBtnActive(true);
        setFocus(true);

        if (isPomodoroDone) {
            setPomodoroDone(false);
        }

        // 10 
        const theBreak: number = 1500;                  // 1500 == 25m
        const theTerm_30min: number = theBreak + 300;   // 300 == 5m
        // const testTerm: number = 15;

        let countTimer: number = 1;
        const theInterval: number = setInterval(() => {
            if (
                (pomodoroCounter <= 4 || pomodoro <= 4) &&
                countTimer <= theTerm_30min &&
                countTimer !== theTerm_30min &&
                countTimer !== theBreak
            ) {
                countTimer++;
                // console.log(countTimer, pomodoroCounter, pomodoro);
                return; // 早期終了で処理負荷軽減
            }

            else if (
                (pomodoroCounter === 4 || pomodoro === 4) &&
                countTimer >= theTerm_30min
            ) {
                _notice('doneSound');
                _initAllReset(theInterval);
                _ctrlPomodoroSignal();
                _endPomodoroImgEffect();
                setPomodoroDone(true);
            }

            else if (countTimer === theBreak) {
                _notice('doneSound');
                setFocus(false);
                setBreak(true);
                countTimer++;
            }

            else if (countTimer === theTerm_30min) {
                _notice('startSound');
                pomodoroCounter++; // ここで加算していないと currPomodoro に適切に反映されない
                setPomodoro((_prevPomodoro) => pomodoroCounter);
                _beginPomodoroImgEffect();
                _ctrlPomodoroSignal();
                countTimer = 1; // 秒数カウントリセット
            }

            else {
                const err: string = `countTimer:${countTimer}, pomodoroCounter:${pomodoroCounter}, pomodoro:${pomodoro}\nelse：どの条件にも該当しない処理考慮漏れです`;
                throw new Error(err);
            }
        }, 1000);

        setIntervalValue((_prevIntervalValue) => theInterval);
    }

    return { handlePomodoro, isBreak, isFocus, isPomodoroDone, pomodoro, isBtnActive, handlePause, isPause }
}