import styled from "styled-components";
import { useState } from "react";

export const ClockHands = () => {
    const ClockHandsAry: string[] = [];
    for (let i = 1; i <= 12; i++) {
        ClockHandsAry.push(`rotate(${30 * i}deg)`);
    }
    const [theClockHandsAry] = useState<string[]>(ClockHandsAry);

    return (
        <>
            {
                theClockHandsAry.length > 0 &&
                <TheClockHands>
                    {theClockHandsAry.map(clockHandsElm => (
                        <li key={clockHandsElm} style={{ 'transform': `${clockHandsElm} translateX(250px)` }}>&nbsp;</li>
                    ))}
                </TheClockHands>
            }
        </>
    );
}

const TheClockHands = styled.ul`
list-style: none;

& li {
  width: 2.5em;
  height: 1px;
  position: absolute;
  margin: auto;
  inset: 0;
  background-color: #333;
}
`;