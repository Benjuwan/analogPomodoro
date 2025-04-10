export const DigitalClock = ({ currTime }: { currTime: string }) => {
    return <section className="digitalClock absolute m-auto inset-[0] transform-[translate(0%,6em)] w-fit h-fit text-[#818181] text-[clamp(0.75rem,calc(100vw/40),1rem)] py-[.25em] px-[1em] border-[3px] border-[#818181] rounded">{currTime}</section>;
}