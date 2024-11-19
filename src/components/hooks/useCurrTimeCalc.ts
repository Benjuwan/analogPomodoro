export const useCurrTimeCalc = () => {
    const currTimeCalc: (theClock: React.MutableRefObject<HTMLDivElement | null>) => number = (theClock: React.MutableRefObject<HTMLDivElement | null>) => {
        const hours: Element | null | undefined = theClock.current?.querySelector('#short');
        const minutes: Element | null | undefined = theClock.current?.querySelector('#long');
        const seconds: Element | null | undefined = theClock.current?.querySelector('#sec');

        const theInterval: number = setInterval(() => {
            const currHours: number = new Date().getHours();
            const currMinutes: number = new Date().getMinutes();
            const currSeconds: number = new Date().getSeconds();

            const targetHoursDeg: number = Math.floor((currHours * 30) + (currMinutes * 0.5)); // 360/12（30度ずつ進む）
            const targetMinutesDeg: number = Math.floor(currMinutes * 6); // 360/60（6度ずつ進む）
            const targetSecondsDeg: number = Math.floor(currSeconds * 6); // 360/60（6度ずつ進む）

            /* 12:00 の位置をスタート基準にするため各種 90deg を加算して表示角度を調整 */
            if (hours instanceof HTMLElement) {
                hours.style.setProperty('rotate', `${90 + targetHoursDeg}deg`);
            }

            if (minutes instanceof HTMLElement) {
                minutes.style.setProperty('rotate', `${90 + targetMinutesDeg}deg`);
            }

            if (seconds instanceof HTMLElement) {
                seconds.style.setProperty('rotate', `${90 + targetSecondsDeg}deg`);
            }
        }, 1000);

        return theInterval;
    }

    return { currTimeCalc }
}