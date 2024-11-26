import styled from "styled-components";

export const DigitalClock = ({ currTime }: { currTime: string }) => {
    return <TheDigitalClock>{currTime}</TheDigitalClock>;
}

const TheDigitalClock = styled.section`
position: absolute;
margin: auto;
inset: 0;
transform: translate(0%, 6em);
width: fit-content;
height: fit-content;
padding: .25em 1em;
color: #818181;
border: 3px solid #818181;
border-radius: .4rem;
font-size: calc(100vw/40);
font-feature-settings: "palt";

@media screen and (min-width: 560px) {
    font-size: 16px;
    border-radius: 4px;
}
`;