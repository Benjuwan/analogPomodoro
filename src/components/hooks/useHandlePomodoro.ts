import { useContext, useState } from "react";
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
};

export const useHandlePomodoro: handlePomodoroType = () => {
    const pomodoroTerm: number = 4;

    const { setPomodoroStart } = useContext(PomodoroStartContext);
    const { pomodoroTime } = useContext(PomodoroTimeContext);

    const [isBreak, setBreak] = useState<boolean>(false);
    const [isFocus, setFocus] = useState<boolean>(false);
    const [isPomodoroDone, setPomodoroDone] = useState<boolean>(false);
    const [pomodoro, setPomodoro] = useState<number>(1); // ポモドーロ（ターム）回数
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
        setPomodoro(1);
        setIntervalValue(null);
        setBtnActive(false);
    }

    /* ポモドーロの一時停止及び当該ポモドーロの再スタートに関する処理 */
    const handlePause: () => void = () => {
        if (isFocus) {
            setFocus(false);
        }

        if (isBreak) {
            setBreak(false);
        }

        if (isPause) {
            setPomodoro(pomodoro);
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
        const theBreak: number = pomodoroTime.focus_reStartTime * 10; // 1500 == 25m
        const theTerm_30min: number = theBreak + (pomodoroTime.breakStartTime * 10); // 300 == 5m

        const pomodoroStartTime: number = Date.now(); // 1970年1月1日0時0分0秒から現在までの経過時間をミリ秒単位で返却

        const theInterval: number = setInterval(() => {
            const elapsedTime: number = Math.floor((Date.now() - pomodoroStartTime) / 1000);

            /* ポモドーロ終了のシグナル */
            const isPomodoroOver: boolean = (pomodoroCounter === pomodoroTerm || pomodoro === pomodoroTerm) && elapsedTime >= theTerm_30min;

            /* 休憩開始のシグナル */
            const isBreakTerm: boolean = elapsedTime >= theBreak && elapsedTime < theTerm_30min;

            /* タスク開始のシグナル */
            const isReStartTerm: boolean = elapsedTime >= theTerm_30min;

            if (!isPomodoroOver && !isBreakTerm && !isReStartTerm) {
                // console.log(elapsedTime, pomodoroCounter, pomodoro);
                return; // 早期終了
            }

            if (isPomodoroOver) {
                _initAllReset(theInterval);
                _ctrlPomodoroSignal();
                _endPomodoroImgEffect();
                setPomodoroDone(true);
            }

            else if (isBreakTerm) {
                setFocus(false);
                setBreak(true);
            }

            else if (isReStartTerm) {
                pomodoroCounter++;
                setPomodoro(pomodoroCounter);
                _beginPomodoroImgEffect();
                _ctrlPomodoroSignal();
                clearInterval(theInterval);
                if (intervalValue !== null) {
                    clearInterval(intervalValue);
                }
                _handlePomodoroFeatureCorePart();
            }
        }, 1000);

        setIntervalValue(theInterval);
    }

    const handlePomodoro: () => void = () => {
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