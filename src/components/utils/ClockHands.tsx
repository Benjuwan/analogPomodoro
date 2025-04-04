import { useState } from "react";

const TimeBullet = ({ targetTimeAry }: { targetTimeAry: string[] }) => {
    return (
        <>
            {targetTimeAry.map(clockHand => (
                <li className="w-[2.5em] h-[1px] absolute m-auto inset-[0] bg-[#333] transform-[translateX(calc(100vw/3))] -z-2 md:transform-[translateX(12.5em)]" key={clockHand} style={{ 'rotate': `${clockHand}` }}>&nbsp;</li>
            ))}
        </>
    )
}

export const ClockHands = () => {
    /* 分の時針 */
    const ClockHandsMinAry: string[] = [];
    for (let i = 1; i <= 12; i++) {
        ClockHandsMinAry.push(`${30 * i}deg`);
    }
    const [theClockHandsMinAry] = useState<string[]>(ClockHandsMinAry);

    /* 秒の時針 */
    const ClockHandsSecAry: string[] = [];
    for (let i = 1; i <= 60; i++) {
        ClockHandsSecAry.push(`${6 * i}deg`);
    }
    const [theClockHandsSecAry] = useState<string[]>(ClockHandsSecAry);

    return (
        <div>
            {theClockHandsMinAry.length > 0 &&
                <ul>
                    <TimeBullet targetTimeAry={theClockHandsMinAry} />
                </ul>
            }
            {theClockHandsSecAry.length > 0 &&
                <ul className="secClockHand">
                    <TimeBullet targetTimeAry={theClockHandsSecAry} />
                </ul>
            }
        </div>
    );
}