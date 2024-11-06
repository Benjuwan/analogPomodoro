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
width: 500px;
height: 500px;
aspect-ratio: 1/1;
border-radius: 50%;
background-color: #dadada;
margin: auto;
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
    background-color: #333;
    position: absolute;
    inset: 0;
    margin: auto;
  }
  
  & div {
    border-radius: 16px;
    transform-origin: center right;
    position: absolute;
    top: 50%;
    left: 0%;
    /* transform: translate(0%, -50%); */
    
    &#long {
      width: 230px;
      height: 3px;
      background-color: #333;
      translate: 9% 0%;
    }

    &#short {
      width: 125px;
      height: 5px;
      background-color: #333;
      translate: 99% 0%;
    }

    &#sec {
      width: 245px;
      height: 1px;
      background-color: #333;
      translate: 3% 0%;
      /* animation: sec infinite 60s linear; */
    }
  }

 @keyframes sec {
  0%{transform: rotate(90deg) translate(0%, -50%) }
  100%{transform: rotate(450deg) translate(0%, -50%) }
 }
`;