import styled from "styled-components";
import { ChangeEvent, useContext } from "react";
import { setPomodoroTimeType } from "./types/ThePomodoroTypes";
import { PomodoroStartContext } from "../../providers/PomodoroStartContext";
import { PomodoroTimeContext } from "../../providers/PomodoroTimeContext";

export const SelectTerm = () => {
    const minTerms: number[] = [5, 10, 15, 20, 25];

    const { pomodoroStart } = useContext(PomodoroStartContext);
    const { pomodoroTime, setPomodoroTime } = useContext(PomodoroTimeContext);

    const handlePomodoroTime: (targetValue: string, type: string) => void = (targetValue: string, type: string) => {
        const newPomodoroTime: setPomodoroTimeType = {
            focus_reStartTime: type === 'focus' ? parseInt(targetValue) : pomodoroTime.focus_reStartTime,
            breakStartTime: type === 'break' ? parseInt(targetValue) : pomodoroTime.breakStartTime
        }
        setPomodoroTime(newPomodoroTime);
    }

    return (
        <>
            {pomodoroStart ||
                <SelectTermSec>
                    <div>
                        <p>タスク時間</p>
                        <select name="focus" id="focus" onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePomodoroTime(e.target.value, 'focus')}>
                            {[...minTerms].reverse().map(term => (
                                <option key={term} value={term * 6}>{term}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>休憩時間</p>
                        <select name="break" id="break" onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePomodoroTime(e.target.value, 'break')}>
                            {minTerms.map(term => (
                                <option key={term} value={term * 6}>{term}</option>
                            ))}
                        </select>
                    </div>
                </SelectTermSec>
            }
        </>
    );
}

const SelectTermSec = styled.section`
display: flex;
gap: 2em;
width: fit-content;
margin: 2em auto;
padding: 2em;
background-color: #dadada;
border-radius: 4px;

& div {
    text-align: center;
    & p {
        font-weight: bold;
    }

    & select {
        width: 100%;
    }
}
`;