/* useHandlePomodoro-xai ：分針の角度を用いたポモドーロタイマー（検証用） */

import { useCallback, useContext, useState } from "react";
import { PomodoroStartContext } from "../../providers/PomodoroStartContext";
import { PomodoroTimeContext } from "../../providers/PomodoroTimeContext";
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

export const useHandlePomodoroXai: handlePomodoroType = () => {
    const pomodoroTerm: number = 4;

    const { setPomodoroStart } = useContext(PomodoroStartContext);
    const { pomodoroTime } = useContext(PomodoroTimeContext);

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
        setPomodoroStart(false);
        clearInterval(theInterval);
        pomodoroCounter = 1;
        setPomodoro((_prevPomodoro) => 1);
        setIntervalValue((_prevIntervalValue) => null);
        setBtnActive(false);
        setPomodoroDone(true);
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
    const _generateMinDeg: () => number = useCallback(() => {
        const currMinutes = new Date().getMinutes();
        return Math.floor(currMinutes * 6); // 360/60（6度ずつ進む）
    }, [pomodoro]);

    /* 秒針の角度を取得 */
    const _generateSecDeg: () => number = useCallback(() => {
        const currSeconds = new Date().getSeconds();
        return Math.floor(currSeconds * 6); // 360/60（6度ずつ進む）
    }, [pomodoro]);

    /* ポモドーロ本体の機能に関する処理 */
    const _handlePomodoroFeatureCorePart: () => void = () => {
        const startMinutesDeg: number = _generateMinDeg();

        const theInterval: number = setInterval(() => {
            console.log(pomodoroTime);

            const secDeg: number = _generateSecDeg();
            const minDeg: number = _generateMinDeg();
            // 180deg == 30m（6deg * 30）, 30deg == 5m（6deg * 5）
            const BreakDeg = minDeg === 348 ? 360 - (startMinutesDeg + 6) : startMinutesDeg + pomodoroTime.breakStartTime; // (180 - 30)
            const reStartDeg = minDeg === 354 ? 360 - (startMinutesDeg + pomodoroTime.focus_reStartTime) : startMinutesDeg + pomodoroTime.focus_reStartTime; // 180
            console.warn(startMinutesDeg, minDeg, BreakDeg, reStartDeg);

            // 0分 から 1分 に切り替わるタイミングで実行したいので 6（deg）を指定
            if (secDeg !== 6) {
                console.log(secDeg);
                return;
            }

            // const minDeg: number = _generateMinDeg();
            // // 180deg == 30m（6deg * 30）, 30deg == 5m（6deg * 5）
            // const BreakDeg = (startMinutesDeg + 6) >= 360 ? 360 - (startMinutesDeg + 6) : startMinutesDeg + 6; // (180 - 30)
            // const reStartDeg = (startMinutesDeg + 12) >= 360 ? 360 - (startMinutesDeg + 12) : startMinutesDeg + 12; // 180
            // console.warn(startMinutesDeg, minDeg, BreakDeg, reStartDeg);

            /* ポモドーロ終了のシグナル */
            const isPomodoroOver: boolean = (pomodoroCounter === pomodoroTerm || pomodoro === pomodoroTerm) && minDeg >= reStartDeg;

            /* 休憩開始のシグナル */
            const isBreakTerm: boolean = minDeg === BreakDeg;

            /* タスク開始のシグナル */
            const isReStartTerm: boolean = minDeg === reStartDeg;

            if (isPomodoroOver) {
                _initAllReset(theInterval);
                _notice('doneSound');
                _ctrlPomodoroSignal();
                _endPomodoroImgEffect();
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
        }, 1000);

        setIntervalValue((_prevIntervalValue) => theInterval);
    }

    const handlePomodoro: () => void = () => {
        _notice('startSound');
        _beginPomodoroImgEffect();

        setBtnActive(true);
        setFocus(true);
        setPomodoroStart(true);

        if (isPomodoroDone) {
            setPomodoroDone(false);
        }

        _handlePomodoroFeatureCorePart();
    }

    return { handlePomodoro, isBreak, isFocus, isPomodoroDone, pomodoro, isBtnActive, handlePause, isPause }
}