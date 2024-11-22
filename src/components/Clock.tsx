import styled from "styled-components";
import { useEffect, useRef } from "react";
import { SelectTerm } from "./utils/SelectTerm";
import { Pomodoro } from "./utils/Pomodoro";
import { ClockHands } from "./utils/ClockHands";
import { ThePie } from "./ThePie";
import { useCurrTimeCalc } from "./hooks/useCurrTimeCalc";

export const Clock = () => {
  const theClockRef = useRef<HTMLDivElement | null>(null);
  const { currTimeCalc } = useCurrTimeCalc();

  useEffect(() => {
    const theInterval: number = currTimeCalc(theClockRef);
    const theTimeout: number = setTimeout(() => theClockRef.current?.style.setProperty('display', 'block'), 1000);

    return () => {
      clearInterval(theInterval);
      clearTimeout(theTimeout);
    }
  }, []);

  return (
    <>
      <SelectTerm />
      <Pomodoro />
      <TheClock ref={theClockRef} className="clock">
        <div id="long">&nbsp;</div>
        <div id="short">&nbsp;</div>
        <div id="sec">&nbsp;</div>
        <ClockHands />
        <div className="pomodoroImg"><ThePie /></div>
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
    transform: translate(-50%, -50%);
    transition: rotate .5s;
    visibility: hidden;
    z-index: -1;

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
  
  & div {
    border-radius: 16px;
    transform-origin: center right;
    position: absolute;
    top: 50%;
    left: 0%;
    z-index: 1;
    
    &#long {
      width: calc(100vw/3.4);
      height: 2px;
      background-color: #333;
      translate: 1.3em 0%;
    }

    &#short {
      width: calc(100vw/4);
      height: 3px;
      background-color: #333;
      translate: 2.25em 0%;
    }

    &#sec {
      width: calc(100vw/3.2);
      height: 1px;
      background-color: #333;
      translate: .5em 0%;
    }
  }

  & .recharts-wrapper {
    left: 50%;
    transform: translate(-50%, 0%);
  }

@media screen and (min-width: 560px) {
width: 400px;
height: 400px;
filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, .25));

  & div {
    &#long {
      width: 180px;
      height: 3px;
      translate: 11% 0%;
    }

    &#short {
      width: 100px;
      height: 5px;
      translate: 101% 0%;
    }

    &#sec {
      width: 190px;
      translate: 5% 0%;
    }
  }
}
`;