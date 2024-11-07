import styled from "styled-components";
import { useEffect, useRef } from "react";
import { Pomodoro } from "./utils/Pomodoro";
import { ClockHands } from "./utils/ClockHands";
import { useCurrTimeCalc } from "./hooks/useCurrTimeCalc";

import pomodoroImg from "../assets/pomodoro.svg";

export const Clock = () => {
  const theClockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { currTimeCalc } = useCurrTimeCalc();
    const theInterval: number = currTimeCalc(theClockRef);
    const theTimeout: number = setTimeout(() => theClockRef.current?.style.setProperty('display', 'block'), 1000);

    return () => {
      clearInterval(theInterval);
      clearTimeout(theTimeout);
    }
  }, []);

  return (
    <>
      <Pomodoro />
      <TheClock ref={theClockRef} className="clock">
        <div id="long">&nbsp;</div>
        <div id="short">&nbsp;</div>
        <div id="sec">&nbsp;</div>
        <ClockHands />
        <figure className="pomodoroImg"><img src={pomodoroImg} alt="ポモドーロ期間を表す半月形式の視覚的画像" /></figure>
      </TheClock>
    </>
  );
}

const TheClock = styled.div`
display: none;
overflow: hidden;
width: calc(100vw/1.5);
height: calc(100vw/1.5);
aspect-ratio: 1/1;
border-radius: 50%;
background-color: #dadada;
filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, .25));
margin: 0 auto 2.5em;
position: relative;

  & .pomodoroImg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    transform: translate(0%, -50%);
    mix-blend-mode: color;
    transition: rotate .5s;
    visibility: hidden;
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
      width: calc(100vw/3.5);
      height: 2px;
      background-color: #333;
      translate: 1.5em 0%;
    }

    &#short {
      width: calc(100vw/4);
      height: 3px;
      background-color: #333;
      translate: 3em 0%;
    }

    &#sec {
      width: calc(100vw/3.2);
      height: 1px;
      background-color: #333;
      translate: .5em 0%;
    }
  }

@media screen and (min-width: 700px) {
width: 500px;
height: 500px;

  & div {
    &#long {
      width: 230px;
      height: 3px;
      translate: 9% 0%;
    }

    &#short {
      width: 125px;
      height: 5px;
      translate: 99% 0%;
    }

    &#sec {
      width: 245px;
      translate: 3% 0%;
    }
  }
}

@keyframes sec {
  0%{transform: rotate(90deg) translate(0%, -50%) }
  100%{transform: rotate(450deg) translate(0%, -50%) }
}
`;