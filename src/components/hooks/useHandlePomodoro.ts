import { useCallback, useState } from "react";
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
    const pomodoroTerm: number = 4;

    const [isBreak, setBreak] = useState<boolean>(false);
    const [isFocus, setFocus] = useState<boolean>(false);
    const [isPomodoroDone, setPomodoroDone] = useState<boolean>(false);
    const [pomodoro, setPomodoro] = useState<number>(1);
    let pomodoroCounter: number = pomodoro > 1 ? pomodoro : 1;
    const [isBtnActive, setBtnActive] = useState<boolean>(false);
    const [isPause, setPause] = useState<boolean>(true);
    const [intervalValue, setIntervalValue] = useState<number | null>(null);

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
        setIntervalValue((_prevIntervalValue) => null);
        setBtnActive(false);
    }

    /* ポモドーロ開始及びモードチェンジ時におけるサウンドエフェクト */
    const _notice: (audioElmStr: string) => void = (audioElmStr: string) => {
        const audioElm: HTMLAudioElement | null = document.querySelector(`#${audioElmStr}`);
        if (audioElm) {
            audioElm.play();
        }
    }

    /* 分針の角度を取得 */
    const _generateTargetDeg: () => number = useCallback(() => {
        const theMinutes: number = new Date().getMinutes();
        return Math.floor(theMinutes * 6); // 360/60（6度ずつ進む）
    }, [pomodoro]);

    /* ポモドーロの一時停止及び当該ポモドーロの再スタートに関する処理 */
    const handlePause: () => void = () => {
        isFocus && setFocus(false);
        isBreak && setBreak(false);

        if (isPause) {
            setPomodoro((_prevPomodoro) => pomodoro);
            alert('ポモドーロが中断されました');
            if (intervalValue !== null) {
                clearInterval(intervalValue);
            }
        } else {
            handlePomodoro();
        }

        // セッター関数は再レンダリングのトリガーなので、初期表示時は（初期設定時の）true のフローに進み、次レンダリング時には false のフローへ進む
        setPause(!isPause);
    }

    /* ポモドーロ本体の機能に関する処理 */
    const _handlePomodoroFeatureCorePart: () => void = () => {
        const theBreak: number = 120;                  // 1500 == 25m
        const theTerm_30min: number = theBreak + 60;   // 300 == 5m

        const pomodoroStartTime: number = Date.now(); // 1970年1月1日0時0分0秒から現在までの経過時間をミリ秒単位で返却

        const startMinutesDeg: number = _generateTargetDeg();

        const theInterval: number = setInterval(() => {
            const elapsedTime: number = Math.floor((Date.now() - pomodoroStartTime) / 1000);

            if (elapsedTime % 60 === 0) {
                const targetMinutesDeg: number = _generateTargetDeg();
                const BreakDeg = startMinutesDeg + (180 - 30);
                const reStartDeg = startMinutesDeg + 180;
                console.warn(startMinutesDeg, BreakDeg, reStartDeg);
                console.warn(targetMinutesDeg, elapsedTime);
            }

            // if (
            //     (pomodoroCounter <= pomodoroTerm || pomodoro <= pomodoroTerm) &&
            //     elapsedTime <= theTerm_30min &&
            //     elapsedTime !== theTerm_30min &&
            //     elapsedTime !== theBreak
            // ) {
            //     console.log(elapsedTime, pomodoroCounter, pomodoro);
            //     return; // 早期終了で処理負荷軽減
            // }

            if (
                (pomodoroCounter === pomodoroTerm || pomodoro === pomodoroTerm) &&
                elapsedTime >= theTerm_30min
            ) {
                _notice('doneSound');
                _initAllReset(theInterval);
                _ctrlPomodoroSignal();
                _endPomodoroImgEffect();
                setPomodoroDone(true);
            }

            else if (elapsedTime === theBreak) {
                _notice('doneSound');
                setFocus(false);
                setBreak(true);
            }

            else if (elapsedTime === theTerm_30min) {
                _notice('startSound');
                pomodoroCounter++;
                setPomodoro((_prevPomodoro) => pomodoroCounter);
                _beginPomodoroImgEffect();
                _ctrlPomodoroSignal();
                if (intervalValue !== null) {
                    clearInterval(intervalValue);
                } else {
                    clearInterval(theInterval);
                }
                _handlePomodoroFeatureCorePart();
            }

            else {
                console.log(elapsedTime, pomodoroCounter, pomodoro);
                return;
                const err: string = `elapsedTime:${elapsedTime}, pomodoroCounter:${pomodoroCounter}, pomodoro:${pomodoro}\nelse：どの条件にも該当しない処理考慮漏れです`;
                throw new Error(err);
            }
        }, 1000);

        setIntervalValue((_prevIntervalValue) => theInterval);
    }

    const handlePomodoro: () => void = () => {
        _notice('startSound');
        _beginPomodoroImgEffect();

        setBtnActive(true);
        setFocus(true);

        if (isPomodoroDone) {
            setPomodoroDone(false);
        }

        _handlePomodoroFeatureCorePart();
    }

    return { handlePomodoro, isBreak, isFocus, isPomodoroDone, pomodoro, isBtnActive, handlePause, isPause }
}