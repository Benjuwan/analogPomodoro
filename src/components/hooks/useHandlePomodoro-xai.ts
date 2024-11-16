/* useHandlePomodoro-xai ：分針の角度を用いたポモドーロタイマー（検証用） */

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
    type audioElmType = 'doneSound' | 'startSound';
    const _notice: (audioElmStr: audioElmType) => void = (audioElmStr: audioElmType) => {
        const audioElm: HTMLAudioElement | null = document.querySelector(`#${audioElmStr}`);
        audioElm?.play();
    }

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

    /* 分針の角度を取得 */
    const _generateTargetDeg: () => number = useCallback(() => {
        const theMinutes: number = new Date().getMinutes();
        return Math.floor(theMinutes * 6); // 360/60（6度ずつ進む）
    }, [pomodoro]);

    /* ポモドーロ本体の機能に関する処理 */
    const _handlePomodoroFeatureCorePart: () => void = () => {
        const startMinutesDeg: number = _generateTargetDeg();

        const theInterval: number = setInterval(() => {
            const targetMinutesDeg: number = _generateTargetDeg();
            // 180deg == 30m（6deg * 30）, 30deg == 5m（6deg * 5）
            const BreakDeg = startMinutesDeg + (180 - 30);
            const reStartDeg = startMinutesDeg + 180;
            console.warn(startMinutesDeg, BreakDeg, reStartDeg);

            /* ポモドーロ終了のシグナル */
            const isPomodoroOver: boolean = (pomodoroCounter === pomodoroTerm || pomodoro === pomodoroTerm) && targetMinutesDeg >= reStartDeg;

            /* 休憩開始のシグナル */
            const isBreakTerm: boolean = targetMinutesDeg === BreakDeg;

            /* タスク開始のシグナル */
            const isReStartTerm: boolean = targetMinutesDeg === reStartDeg;

            if (!isPomodoroOver && !isBreakTerm && !isReStartTerm) {
                console.log(targetMinutesDeg, pomodoroCounter, pomodoro);
                return; // 早期終了
            }

            if (isPomodoroOver) {
                _initAllReset(theInterval);
                _notice('doneSound');
                _ctrlPomodoroSignal();
                _endPomodoroImgEffect();
                setPomodoroDone(true);
            }

            else if (isBreakTerm) {
                _notice('doneSound');
                setFocus(false);
                setBreak(true);
            }

            else if (isReStartTerm) {
                _notice('startSound');
                pomodoroCounter++;
                setPomodoro((_prevPomodoro) => pomodoroCounter);
                _beginPomodoroImgEffect();
                _ctrlPomodoroSignal();
                clearInterval(theInterval);
                if (intervalValue !== null) {
                    clearInterval(intervalValue);
                }
                _handlePomodoroFeatureCorePart();
            }
        }, 60000);

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