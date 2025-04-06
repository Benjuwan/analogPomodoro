import { useContext, useEffect, useRef } from "react";
import { PomodoroTimeContext } from "../../providers/PomodoroTimeContext";
import { useHandlePomodoro } from "../hooks/useHandlePomodoro";

import startSound from "../../assets/start.mp3"; // [Level Up #3 | universfield](https://pixabay.com/ja/users/universfield-28281460/)
import doneSound from "../../assets/done.mp3"; // [Good! | Pixabay](https://pixabay.com/ja/users/pixabay-1/)

export const Pomodoro = () => {
    const startSoundRef: React.MutableRefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement | null>(null);
    const doneSoundRef: React.MutableRefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement | null>(null);

    const { pomodoroTime } = useContext(PomodoroTimeContext);

    const { handlePomodoro, isPomodoroDone, pomodoro, isFocus, isBreak, isBtnActive, handlePause, isPause } = useHandlePomodoro();

    useEffect(() => {
        if (isBreak || isPomodoroDone) {
            doneSoundRef.current?.play();
            return;
        }

        if (isFocus && !isPomodoroDone) {
            startSoundRef.current?.play();
            return;
        }
    }, [isFocus, isBreak, isPomodoroDone]);

    /* iOS対策：音声の自動再生はユーザーのアクションをトリガーにする必要があるため、以下処理をポモドーロ開始ボタンのクリックイベントハンドラーに仕込む */
    const initSoundFiles: () => void = () => {
        if (startSoundRef.current !== null && doneSoundRef.current !== null) {
            startSoundRef.current.play();
            doneSoundRef.current.play();
        }
    }

    const pomodoroStart: () => void = () => {
        const pomodoroTermTime: number = pomodoroTime.focus_reStartTime + pomodoroTime.breakStartTime;
        if (pomodoroTermTime > 180) {
            alert('ポモドーロのタームは30分以内で指定してください');
            return;
        }

        initSoundFiles();
        handlePomodoro();
    }

    return (
        <section className="my-[2em] mx-auto text-center px-[2.5%]">
            {isPomodoroDone ?
                <p className="mb-[1em]">お疲れ様でした。<br />ポモドーロ終了です。15〜30分ほど休憩してください。</p> :
                <>
                    <h2 className="text-[1.5rem] tracking-[.25em] leading-[1.5] mb-[2em] lg:text-[20px]">Pomodoro<br />（{pomodoro}/4）</h2>
                    {isFocus && <p className="w-fit text-[1rem] rounded p-[1em] mx-auto mb-[2em] bg-[#acedff] border-[3px] border-[#73e1ff] lg:text-[16px]">ポモドーロ開始です。{pomodoroTime.focus_reStartTime / 6}分間タスクに集中してください。</p>}
                    {isBreak && <p className="w-fit text-[1rem] rounded p-[1em] mx-auto mb-[2em] bg-[#e9ffbc] border-[3px] border-[#cdff6c] lg:text-[16px]">インターバルです。{pomodoroTime.breakStartTime / 6}分間休憩してください。</p>}
                </>
            }
            {isBtnActive ?
                <button className="appearance-none bg-[#333] border-[3px] rounded border-transparent text-[#fff] px-[2.5em] text-[1.125rem] leading-[2.75rem] disabled:text-[#a8a8a8] disabled:bg-[#eaeaea] disabled:border-[#a8a8a8] not-disabled:cursor-pointer not-disabled:hover:border-[#333] not-disabled:hover:text-[#333] not-disabled:hover:bg-[#fff] lg:text-[18px] lg:leading-[44px]" type="button" onClick={handlePause}>{isPause ? '中断' : '再開'}</button> :
                <button className="appearance-none bg-[#333] border-[3px] rounded border-transparent text-[#fff] px-[2.5em] text-[1.125rem] leading-[2.75rem] disabled:text-[#a8a8a8] disabled:bg-[#eaeaea] disabled:border-[#a8a8a8] not-disabled:cursor-pointer not-disabled:hover:border-[#333] not-disabled:hover:text-[#333] not-disabled:hover:bg-[#fff] lg:text-[18px] lg:leading-[44px]" type="button" onClick={pomodoroStart}>ポモドーロ開始</button>
            }
            <audio id="startSound" ref={startSoundRef} src={startSound} hidden>&nbsp;</audio>
            <audio id="doneSound" ref={doneSoundRef} src={doneSound} hidden>&nbsp;</audio>
        </section>
    );
}