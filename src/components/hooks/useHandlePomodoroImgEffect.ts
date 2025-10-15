import { useContext, useMemo } from "react";
import { PomodoroTimeContext } from "../../providers/PomodoroTimeContext";

export const useHandlePomodoroImgEffect = () => {
    const { pomodoroTime } = useContext(PomodoroTimeContext);

    const pomodoroTermTime: number = useMemo(() => pomodoroTime.focus_reStartTime + pomodoroTime.breakStartTime, [pomodoroTime]);

    const _beginPomodoroImgEffect: () => void = () => {
        const pomodoroImg: HTMLElement | null = document.querySelector('.pomodoroImg');

        const currMinutes: number = new Date().getMinutes();
        const targetMinutesDeg: number = Math.floor(currMinutes * 6); // 360/60（6度ずつ進む）
        const adjustTargetMinutesDeg: number = targetMinutesDeg + 90; // 12:00 の位置をスタート基準にするため 90deg を加算して表示角度を調整

        if (pomodoroImg !== null) {
            if (pomodoroTermTime < 180) {
                /* タスク集中時間と休憩時間の合算が「30分に満たない」場合は差分（30分：180 - 合算時間：pomodoroTermTime）を計算して視覚用画像の設置角度を調整する */
                pomodoroImg.style.setProperty('rotate', `${adjustTargetMinutesDeg - (180 - pomodoroTermTime)}deg`);
            } else {
                pomodoroImg.style.setProperty('rotate', `${adjustTargetMinutesDeg}deg`);
            }

            // 表示角度の調整が済み次第ポモドーロパイを可視化する
            pomodoroImg.style.setProperty('visibility', 'visible');
        }

        const clockLong: HTMLElement | null = document.querySelector('#long');
        if (clockLong !== null) {
            clockLong.style.setProperty('background-color', '#ff2727');
        }
    }

    // ポモドーロパイと分針カラーを初期化（非アクティブ化）
    const _endPomodoroImgEffect: () => void = () => {
        const pomodoroImg: HTMLElement | null = document.querySelector('.pomodoroImg');
        if (pomodoroImg !== null) {
            pomodoroImg.style.setProperty('visibility', 'hidden');
        }

        const clockLong: HTMLElement | null = document.querySelector('#long');
        if (clockLong !== null) {
            clockLong.style.setProperty('background-color', '#333');
        }
    }

    return { _beginPomodoroImgEffect, _endPomodoroImgEffect }
}