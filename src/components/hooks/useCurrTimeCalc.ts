export const useCurrTimeCalc = () => {
    const currTimeCalc: (theClock: React.MutableRefObject<HTMLDivElement | null>) => number = (theClock: React.MutableRefObject<HTMLDivElement | null>) => {
        const hours = theClock.current?.querySelector('#short');
        const minutes = theClock.current?.querySelector('#long');
        const seconds = theClock.current?.querySelector('#sec');

        const theInterval: number = setInterval(() => {
            const currHours = new Date().getHours();
            const currMinutes = new Date().getMinutes();
            const currSeconds = new Date().getSeconds();

            const targetHoursDeg = Math.floor((currHours * 30) + (currMinutes * 0.5)); // 360/12（30度ずつ進む）
            const targetMinutesDeg = Math.floor(currMinutes * 6); // 360/60（6度ずつ進む）
            const targetSecondsDeg = Math.floor(currSeconds * 6); // 360/60（6度ずつ進む）

            if (hours instanceof HTMLElement) {
                hours.style.setProperty('rotate', `${targetHoursDeg}deg`);
            }

            if (minutes instanceof HTMLElement) {
                minutes.style.setProperty('rotate', `${targetMinutesDeg}deg`);
            }

            if (seconds instanceof HTMLElement) {
                seconds.style.setProperty('rotate', `${targetSecondsDeg}deg`);
            }
        }, 1000);
        return theInterval;
    }

    return { currTimeCalc }
}