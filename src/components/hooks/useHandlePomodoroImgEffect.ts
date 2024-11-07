export const useHandlePomodoroImgEffect = () => {
    const _beginPomodoroImgEffect: () => void = () => {
        const pomodoroImg: HTMLElement | null = document.querySelector('.pomodoroImg');
        if (pomodoroImg !== null) {
            const currMinutes: number = new Date().getMinutes();
            const targetMinutesDeg: number = Math.floor(currMinutes * 6); // 360/60（6度ずつ進む）
            pomodoroImg.style.setProperty('visibility', 'visible');
            pomodoroImg.style.setProperty('rotate', `${targetMinutesDeg}deg`);
        }

        const clockLong: HTMLElement | null = document.querySelector('#long');
        if (clockLong) {
            clockLong.style.setProperty('background-color', '#ff2727');
        }
    }

    const _endPomodoroImgEffect: () => void = () => {
        const pomodoroImg: HTMLElement | null = document.querySelector('.pomodoroImg');
        if (pomodoroImg !== null) {
            pomodoroImg.style.setProperty('visibility', 'hidden');
        }

        const clockLong: HTMLElement | null = document.querySelector('#long');
        if (clockLong) {
            clockLong.style.setProperty('background-color', '#333');
        }
    }

    return { _beginPomodoroImgEffect, _endPomodoroImgEffect }
}