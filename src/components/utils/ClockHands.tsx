import styled from "styled-components";
import { useState } from "react";

const TimeBullet = ({ targetTimeAry }: { targetTimeAry: string[] }) => {
    return (
        <>
            {targetTimeAry.map(clockHand => (
                <li key={clockHand} style={{ 'rotate': `${clockHand}` }}>&nbsp;</li>
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
        <TheClockHands>
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
        </TheClockHands>
    );
}

const TheClockHands = styled.div`
width: 100%;
height: 100%;
overflow: hidden;

& ul {
    list-style: none;

    & li {
        width: 2.5em;
        height: 1px;
        position: absolute;
        margin: auto;
        inset: 0;
        background-color: #333;
        transform: translateX(calc(100vw/3));
    }
}

& .secClockHand {
    & li {
        transform: translateX(calc(100vw/2.8));
        background-color: #818181;
        mix-blend-mode: darken;
    }
}

@media screen and (min-width: 560px) {
    & ul {
        & li {
            transform: translateX(14em);
        }
    }

    & .secClockHand {
        & li {
            transform: translateX(15em);
        }
    }
}
`;