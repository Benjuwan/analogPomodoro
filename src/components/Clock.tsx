import styled from "styled-components";
import { useEffect, useRef } from "react";
import { ClockHands } from "./utils/ClockHands";
import { useCurrTimeCalc } from "./hooks/useCurrTimeCalc";

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
    <TheClock ref={theClockRef} className="clock">
      <div id="long">&nbsp;</div>
      <div id="short">&nbsp;</div>
      <div id="sec">&nbsp;</div>
      <ClockHands />
    </TheClock>
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
  rotate: 90deg; /* 12:00 の位置をスタート基準にするため 90deg を指定して表示角度調整 */ 

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