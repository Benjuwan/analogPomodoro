import styled from "styled-components";
import { useHandlePomodoro } from "../hooks/useHandlePomodoro";

import startSound from "../../assets/start.mp3"; // [Level Up #3 | universfield](https://pixabay.com/ja/users/universfield-28281460/)
import doneSound from "../../assets/done.mp3"; // [Good! | Pixabay](https://pixabay.com/ja/users/pixabay-1/)

export const Pomodoro = () => {
    const { handlePomodoro, isPomodoroDone, pomodoro, isFocus, isBreak, isBtnActive, handlePause, isPause } = useHandlePomodoro();

    return (
        <ThePomodoro>
            {isPomodoroDone ?
                <p>お疲れ様でした。<br />ポモドーロ終了です。15〜30分ほど休憩してください。</p> :
                <>
                    <h2>Pomodoro<br />（{pomodoro}/4）</h2>
                    {isFocus && <p className="pomodoroFocus">ポモドーロ開始です。25分間タスクに集中してください。</p>}
                    {isBreak && <p className="pomodoroBreak">インターバルです。5分間休憩してください。</p>}
                </>
            }
            {isBtnActive ?
                <button className="pauseBtn" type="button" onClick={handlePause}>{isPause ? '中断' : '再開'}</button> :
                <button type="button" onClick={handlePomodoro}>ポモドーロ開始</button>
            }
            <audio id="startSound" src={startSound} hidden>&nbsp;</audio>
            <audio id="doneSound" src={doneSound} hidden>&nbsp;</audio>
        </ThePomodoro>
    );
}

const ThePomodoro = styled.section`
margin: 2em auto;
text-align: center;
padding: 0 2.5%;

& h2 {
    font-size: 2rem;
    letter-spacing: .25em;
    line-height: 1.5;
    margin-bottom: 2em;
}

& p {
    width: fit-content;
    font-size: 1.6rem;
    border-radius: .4rem;
    padding: 1em;
    margin: 0 auto 2em;
    background-color: #dadada;
    border: 3px solid #a8a8a8;

    &.pomodoroFocus {
        background-color: #acedff;
        border-color: #73e1ff;
    }
    
    &.pomodoroBreak {
        background-color: #e9ffbc;
        border-color: #cdff6c;
    }
}

& button {
    appearance: none;
    background-color: #333;
    border: 3px solid transparent;
    color: #fff;
    padding: 0 2.5em;
    font-size: 1.8rem;
    line-height: 4.4rem;
    border-radius: .4rem;

    &:disabled{
        color: #a8a8a8;
        background-color: #eaeaea;
        border-color: #a8a8a8;
    }

    &:not(:disabled){
        cursor: pointer;

        &:hover {
            border-color: #333;
            color: #333;
            background-color: #fff;
        }
    }
}

@media screen and (min-width:1025px) {
    & h2 {
        font-size: 20px;
    }

    & p {
        font-size: 16px;
        border-radius: 4px;
    }

    & button {
        font-size: 18px;
        line-height: 44px;
        border-radius: 4px;
    }
}
`;