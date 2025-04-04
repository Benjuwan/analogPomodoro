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
      <div ref={theClockRef} className="relative hidden overflow-hidden w-[calc(100vw/1.5)] h-[calc(100vw/1.5)] aspect-square rounded-full bg-[#dadada] mt-[0] mx-auto mb-[2.5em] z-0 before:content[''] before:w-[25px] before:h-[25px] before:rounded-full before:aspect-square before:bg-[#333] before:absolute before:inset-[0] before:m-auto before:z-[2] md:w-[400px] md:h-[400px] md:drop-shadow-[0px 0px 4px rgba(0, 0, 0, .25)]">
        <div className="rounded-[16px] origin-left absolute top-[50%] left-[50%] z-[1] w-[calc(100vw/3.4)] h-[2px] bg-[#333] transform-[translate(-100%,0%)] md:w-[180px] md:h-[3px]" id="long">&nbsp;</div>
        <div className="rounded-[16px] origin-left absolute top-[50%] left-[50%] z-[1] w-[calc(100vw/4)] h-[3px] bg-[#333] transform-[translate(-100%,0%)] md:w-[100px] md:h-[5px]" id="short">&nbsp;</div>
        <div className="rounded-[16px] origin-left absolute top-[50%] left-[50%] z-[1] w-[calc(100vw/3.2)] h-[1px] bg-[#333] transform-[translate(-100%,0%)] md:w-[190px]" id="sec">&nbsp;</div>
        <ClockHands />
        <div className="pomodoroImg absolute top-[50%] left-[50%] origin-top-left transform-[translate(0%,-50%)] transition-rotate duration-500 invisible -z-1 opacity-[.5] saturate-[3]"><ThePie /></div>
        <DigitalClock currTime={currTime} />
      </div>
    </>
  );
}