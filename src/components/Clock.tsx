import styled from "styled-components";
import { useEffect, useRef } from "react";
import { SelectTerm } from "./utils/SelectTerm";
import { Pomodoro } from "./utils/Pomodoro";
import { ClockHands } from "./utils/ClockHands";
import { ThePie } from "./utils/ThePie";
import { DigitalClock } from "./DigitalClock";
import { useCurrTimeCalc } from "./hooks/useCurrTimeCalc";

export const Clock = () => {
  const theClockRef = useRef<HTMLDivElement | null>(null);
  const { currTimeCalc, currTime } = useCurrTimeCalc();

  useEffect(() => {
    const theInterval: number = currTimeCalc(theClockRef);
    const theTimeout: number = setTimeout(() => theClockRef.current?.style.setProperty('display', 'block'), 1000);

    return () => {
      clearInterval(theInterval);
      clearTimeout(theTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SelectTerm />
      <Pomodoro />
      <TheClock ref={theClockRef} className="clock">
        <div className="theClockPart" id="long">&nbsp;</div>
        <div className="theClockPart" id="short">&nbsp;</div>
        <div className="theClockPart" id="sec">&nbsp;</div>
        <ClockHands />
        <div className="pomodoroImg"><ThePie /></div>
        <DigitalClock currTime={currTime} />
      </TheClock>
    </>
  );
}

const TheClock = styled.div`
position: relative;
display: none;
overflow: hidden;
width: calc(100vw/1.5);
height: calc(100vw/1.5);
aspect-ratio: 1/1;
border-radius: 50%;
background-color: #dadada;
margin: 0 auto 2.5em;
z-index: 0;

  & .pomodoroImg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    transform: translate(0%, -50%);
    transition: rotate .5s;
    visibility: hidden;
    z-index: -1; // iOSでのチラつき対策：時計周囲の分針（z-index: -2）より前面に配置
    opacity: .5; // 透過させて時計周囲の分針を視認できるようにする
    filter: saturate(3); // 透過させた分の色味調整

    & svg {
      transform: scale(4);
    }
  }

  &::before {
    content: "";
    width: 25px;
    height: 25px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    background-color: #333;
    position: absolute;
    inset: 0;
    margin: auto;
    z-index: 2;
  }
  
  & .theClockPart {
    border-radius: 16px;
    transform-origin: center left;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    
    &#long {
      width: calc(100vw/3.4);
      height: 2px;
      background-color: #333;
      transform: translate(-100%, 0%);
    }

    &#short {
      width: calc(100vw/4);
      height: 3px;
      background-color: #333;
      transform: translate(-100%, 0%);
    }

    &#sec {
      width: calc(100vw/3.2);
      height: 1px;
      background-color: #333;
      transform: translate(-100%, 0%);
    }
  }

  & .recharts-wrapper {
    transform: translate(-50%, 0%);
  }

@media screen and (min-width: 560px) {
width: 400px;
height: 400px;
filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, .25));

  & .theClockPart {
    &#long {
      width: 180px;
      height: 3px;
    }

    &#short {
      width: 100px;
      height: 5px;
    }

    &#sec {
      width: 190px;
    }
  }
}
`;