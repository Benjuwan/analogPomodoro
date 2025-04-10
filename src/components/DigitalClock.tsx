export const DigitalClock = ({ currTime }: { currTime: string }) => {
    return <section className="digitalClock absolute m-auto inset-[0] transform-[translate(0%,6em)] w-fit h-fit text-[1rem] py-[.25em] px-[1em] text-[#818181] border-[3px] border-[#818181] rounded">{currTime}</section>;
}