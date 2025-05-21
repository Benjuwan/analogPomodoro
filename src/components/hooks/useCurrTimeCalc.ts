import { useState } from "react";

export const useCurrTimeCalc = () => {
    type japDay = "日" | "月" | "火" | "水" | "木" | "金" | "土" | undefined;
    const _getJapDay: (currDay: number) => japDay = (currDay: number) => {
        switch (currDay) {
            case 0:
                return '日';
            case 1:
                return '月';
            case 2:
                return '火';
            case 3:
                return '水';
            case 4:
                return '木';
            case 5:
                return '金';
            case 6:
                return '土';
            default:
                return undefined;
        }
    }

    const [currTime, setCurrTime] = useState<string>('');
    const _checkCurrTime: (theDate: Date) => void = (theDate: Date) => {
        const currMonth: number = theDate.getMonth() + 1;
        const currDayDate: number = theDate.getDate();
        const currDay: number = theDate.getDay();
        const adjustCurrDay: japDay | null = typeof _getJapDay(currDay) !== 'undefined' ? _getJapDay(currDay) : null;

        const currHours: string = theDate.getHours().toString().padStart(2, '0');
        const currMinutes: string = theDate.getMinutes().toString().padStart(2, '0');
        const currSeconds: string = theDate.getSeconds().toString().padStart(2, '0');

        // mm月dd日（d）hh：mm：ss
        const thePresent: string = `${currMonth}月${currDayDate}日（${adjustCurrDay}）${currHours}：${currMinutes}：${currSeconds}`;

        setCurrTime(thePresent);
    }

    const currTimeCalc: (theClock: React.RefObject<HTMLDivElement | null>) => number = (theClock: React.RefObject<HTMLDivElement | null>) => {
        const hours: Element | null | undefined = theClock.current?.querySelector('#short');
        const minutes: Element | null | undefined = theClock.current?.querySelector('#long');
        const seconds: Element | null | undefined = theClock.current?.querySelector('#sec');

        const theInterval: number = setInterval(() => {
            const theDate: Date = new Date();
            _checkCurrTime(theDate);

            const currHours: number = theDate.getHours();
            const currMinutes: number = theDate.getMinutes();
            const currSeconds: number = theDate.getSeconds();

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

    return { currTimeCalc, currTime }
}