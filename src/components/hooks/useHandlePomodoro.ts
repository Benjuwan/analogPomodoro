import { useContext, useState } from "react";
import { PomodoroStartContext } from "../../providers/PomodoroStartContext";
import { PomodoroTimeContext } from "../../providers/PomodoroTimeContext";
import { useHandlePomodoroImgEffect } from "./useHandlePomodoroImgEffect";

type handlePomodoroType = (doneSoundRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    handlePomodoro: () => void;
    isBreak: boolean;
    isFocus: boolean;
    isPomodoroDone: boolean;
    pomodoro: number;
    isBtnActive: boolean;
    handlePause: () => void;
    isPause: boolean;
}

export const useHandlePomodoro: handlePomodoroType = (doneSoundRef) => {
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
        if (doneSoundRef.current?.classList.contains('done')) {
            doneSoundRef.current?.classList.remove('done');
        }
        setIntervalValue((_prevIntervalValue) => null);
        setBtnActive(false);
    }

    /* ポモドーロ開始及びモードチェンジ時におけるサウンドエフェクト */
    type audioElmType = 'doneSound' | 'startSound';
    const _notice: (audioElmStr: audioElmType) => void = (audioElmStr: audioElmType) => {
        const audioElm: HTMLAudioElement | null = document.querySelector(`#${audioElmStr}`);

        if (audioElmStr === 'doneSound') {
            if (doneSoundRef.current?.classList.contains('done')) {
                return;
            }

            doneSoundRef.current?.classList.add('done');
            audioElm?.play();
        } else {
            if (doneSoundRef.current?.classList.contains('done')) {
                doneSoundRef.current?.classList.remove('done'); // 初期化
            }

            audioElm?.play();
        }
    }

    /* ポモドーロの一時停止及び当該ポモドーロの再スタートに関する処理 */
    const handlePause: () => void = () => {
        isFocus && setFocus(false);
        isBreak && setBreak(false);

        if (doneSoundRef.current?.classList.contains('done')) {
            doneSoundRef.current?.classList.remove('done'); // 初期化
        }

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
        const theBreak: number = pomodoroTime.focus_reStartTime * 10; // 1500 == 25m
        const theTerm_30min: number = theBreak + (pomodoroTime.breakStartTime * 10); // 300 == 5m
        console.log(theBreak, theTerm_30min);

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
                console.log(elapsedTime, pomodoroCounter, pomodoro);
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
        }, 1000);

        setIntervalValue((_prevIntervalValue) => theInterval);
    }

    const handlePomodoro: () => void = () => {
        const pomodoroTermTime: number = pomodoroTime.focus_reStartTime + pomodoroTime.breakStartTime;
        if (pomodoroTermTime > 180) {
            alert('ポモドーロのタームは30分以内で指定してください');
            return;
        }

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