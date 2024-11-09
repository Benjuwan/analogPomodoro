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

    console.log(isBreak ? '休憩' : '開始');
    /* 時刻が変わったタイミングの時（分針が頂点を過ぎた場合）は再処理する */
    const _changeClock_reHandlePomodoro: (mutableMinDeg: number, immutableMinDeg: number) => void = useCallback((mutableMinDeg: number, immutableMinDeg: number) => {
        console.log(mutableMinDeg, immutableMinDeg);
        if (mutableMinDeg - immutableMinDeg < 0) {
            console.log(pomodoro);
            setFocus(!isFocus);
            setBreak(!isBreak);
            setPomodoro((_prevPomodoro) => pomodoroCounter);
            clearInterval(intervalValue);
            _pomodoroCoreFeaturePart(immutableMinDeg);
        }
    }, [isBreak]);

    /* ポモドーロ本体のコア部分 */
    const _pomodoroCoreFeaturePart: (immutableMinDeg: number) => void = (immutableMinDeg: number) => {
        const focusTime: number = 6; // 150 == 25m
        const breakTime: number = 6; // 30 == 5m 
        let theFocus: number = immutableMinDeg + focusTime;
        let theTerm_30min: number = theFocus + breakTime;

        const theInterval: number = setInterval(() => {
            const realDOM_MinDeg: HTMLDivElement | null = document.querySelector('#long');
            if (realDOM_MinDeg !== null) {
                const compStyles: CSSStyleDeclaration = window.getComputedStyle(realDOM_MinDeg);
                const mutableMinDeg = parseInt(compStyles.getPropertyValue('rotate').replace('deg', ''));

                _changeClock_reHandlePomodoro(mutableMinDeg, immutableMinDeg);

                console.log(mutableMinDeg, mutableMinDeg, theFocus, theTerm_30min);
                console.log(pomodoroCounter, pomodoro);

                if (
                    (pomodoroCounter === pomodoroTerm || pomodoro === pomodoroTerm) &&
                    mutableMinDeg >= theTerm_30min
                ) {
                    _notice('doneSound');
                    _initAllReset(theInterval);
                    _ctrlPomodoroSignal();
                    _endPomodoroImgEffect();
                    setPomodoroDone(true);
                }

                else if (mutableMinDeg === theFocus) {
                    _notice('doneSound');
                    setFocus(false);
                    setBreak(true);
                }

                else if (mutableMinDeg === theTerm_30min) {
                    theFocus = mutableMinDeg + focusTime;
                    theTerm_30min = theFocus + breakTime;
                    console.log(theFocus, theTerm_30min);
                    _notice('startSound');
                    pomodoroCounter++; // ここで加算していないと currPomodoro に適切に反映されない
                    setPomodoro((_prevPomodoro) => pomodoroCounter);
                    _beginPomodoroImgEffect();
                    _ctrlPomodoroSignal();
                }

                else return;
            }
        }, 60000);

        setIntervalValue((_prevIntervalValue) => theInterval);
    }

    /* ポモドーロ本体の機能に関する処理 */
    const handlePomodoro: () => void = () => {
        const currMinutes: number = new Date().getMinutes();
        const immutableMinDeg: number = Math.floor(currMinutes * 6) + 90; // 12:00 の位置をスタート基準にするため各種 90deg を加算して表示角度を調整

        _notice('startSound');
        _beginPomodoroImgEffect();

        setBtnActive(true);
        setFocus(true);

        if (isPomodoroDone) {
            setPomodoroDone(false);
        }

        console.log(immutableMinDeg);
        _pomodoroCoreFeaturePart(immutableMinDeg);
    }

    return { handlePomodoro, isBreak, isFocus, isPomodoroDone, pomodoro, isBtnActive, handlePause, isPause }
}