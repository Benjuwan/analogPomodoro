import { ChangeEvent, useContext } from "react";
import { setPomodoroTimeType } from "./types/ThePomodoroTypes";
import { PomodoroStartContext } from "../../providers/PomodoroStartContext";
import { PomodoroTimeContext } from "../../providers/PomodoroTimeContext";

export const SelectTerm = () => {
    const minTerms: number[] = [5, 10, 15, 20, 25];

    const { pomodoroStart } = useContext(PomodoroStartContext);
    const { pomodoroTime, setPomodoroTime } = useContext(PomodoroTimeContext);

    const handlePomodoroTime: (targetValue: string, timeStatus: 'focus' | 'break') => void = (targetValue: string, timeStatus: 'focus' | 'break') => {
        const newPomodoroTime: setPomodoroTimeType = {
            focus_reStartTime: timeStatus === 'focus' ? parseInt(targetValue) : pomodoroTime.focus_reStartTime,
            breakStartTime: timeStatus === 'break' ? parseInt(targetValue) : pomodoroTime.breakStartTime
        }
        setPomodoroTime(newPomodoroTime);
    }

    return (
        <>
            {pomodoroStart ||
                <section className="flex gap-[2em] w-fit my-[2em] mx-auto p-[2em] bg-[#dadada] rounded">
                    <div className="text-center">
                        <p className="font-bold">タスク時間</p>
                        <select name="focus" className="w-full border border-[#818181] rounded mt-1 bg-white" id="focus" onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePomodoroTime(e.target.value, 'focus')}>
                            {[...minTerms].reverse().map(term => (
                                <option key={term} value={term * 6}>{term}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>休憩時間</p>
                        <select name="break" className="w-full border border-[#818181] rounded mt-1 bg-white" id="break" onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePomodoroTime(e.target.value, 'break')}>
                            {minTerms.map(term => (
                                <option key={term} value={term * 6}>{term}</option>
                            ))}
                        </select>
                    </div>
                </section>
            }
        </>
    );
}