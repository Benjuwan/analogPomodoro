import { useState } from "react";

export const ClockHands = () => {
    const ClockHandsAry: string[] = [];
    for (let i = 1; i <= 12; i++) {
        ClockHandsAry.push(`rotate(${30 * i}deg)`);
    }
    const [theClockHandsAry] = useState<string[]>(ClockHandsAry);

    return (
        <>
            {theClockHandsAry.length > 0 &&
                <ul>
                    {theClockHandsAry.map(clockHandsElm => (
                        <li key={clockHandsElm} style={{ 'transform': `${clockHandsElm} translateX(250px)` }}>&nbsp;</li>
                    ))}
                </ul>
            }
        </>
    );
}