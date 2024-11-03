import styled from "styled-components";
import { useEffect } from "react";
import { ClockHands } from "./utils/ClockHands";

export const Clock = () => {
  useEffect(() => {
    const clock = document.querySelector('.clock');
    clock?.classList.add('hiddenClock');
    const theTimeout: number = setTimeout(() => clock?.classList.remove('hiddenClock'), 1000);

    const currTimeCalc: () => number = () => {
      const hours = clock?.querySelector('#short');
      const minutes = clock?.querySelector('#long');
      const seconds = clock?.querySelector('#sec');

      const theInterval: number = setInterval(() => {
        const currHours = new Date().getHours();
        const currMinutes = new Date().getMinutes();
        const currSeconds = new Date().getSeconds();

        const targetHoursDeg = Math.floor((currHours * 30) + (currMinutes * 0.5)); // 360/12（30度ずつ進む）
        const targetMinutesDeg = Math.floor(currMinutes * 6); // 360/60（6度ずつ進む）
        const targetSecondsDeg = Math.floor(currSeconds * 6); // 360/60（6度ずつ進む）

        if (hours instanceof HTMLElement) {
          hours.style.setProperty('rotate', `${targetHoursDeg}deg`);
        }

        if (minutes instanceof HTMLElement) {
          minutes.style.setProperty('rotate', `${targetMinutesDeg}deg`);
        }

        if (seconds instanceof HTMLElement) {
          seconds.style.setProperty('rotate', `${targetSecondsDeg}deg`);
        }
      }, 1000);

      return theInterval;
    }
    const theInterval: number = currTimeCalc();

    return () => {
      clearTimeout(theTimeout);
      clearInterval(theInterval);
    }
  }, []);

  return (
    <TheClock className="clock">
      <div id="long">&nbsp;</div>
      <div id="short">&nbsp;</div>
      <div id="sec">&nbsp;</div>
      <ClockHands />
    </TheClock>
  );
}

const TheClock = styled.div`
  overflow: hidden;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #dadada;
  margin: auto;
  position: relative;
  rotate: 90deg; /* 12:00 の位置をスタート基準にするため 90deg を指定して表示角度調整 */ 

  &.hiddenClock {
    display: none;
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