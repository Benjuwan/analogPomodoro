import styled from "styled-components";
import { useHandlePomodoro } from "../hooks/useHandlePomodoro";

export const Pomodoro = () => {
    const { handlePomodoro, isPomodoroDone, pomodoro, isFocus, isBreak, isBtnActive } = useHandlePomodoro();

    return (
        <ThePomodoro>
            {isPomodoroDone ?
                <p>ポモドーロ終了です。15〜30分ほど休憩してください。</p> :
                <>
                    <h2>pomodoro<br />（{pomodoro + 1}/4）</h2>
                    {isFocus && <p>ポモドーロ開始です。25分間タスクに集中してください。</p>}
                    {isBreak && <p>インターバルです。5分間休憩してください。</p>}
                </>
            }
            <button type="button" disabled={isBtnActive} onClick={handlePomodoro}>{isBtnActive ? 'ポモドーロ中' : 'ポモドーロ開始'}</button>
        </ThePomodoro>
    );
}

const ThePomodoro = styled.section`
margin: 2em auto;
text-align: center;

& h2 {
    font-size: 2rem;
    letter-spacing: .25em;
    line-height: 1.5;
    margin-bottom: 1em;
}

& p {
    font-size: 1.6rem;
    margin-bottom: .5em;
}

& button {
    appearance: none;
    background-color: #333;
    border: 1px solid transparent;
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
    }

    & button {
        font-size: 18px;
        line-height: 44px;
        border-radius: 4px;
    }
}
`;