import styled from "styled-components";

export const Footer = () => {
    const nowYear: number = new Date().getFullYear();

    return (
        <TheFooter>
            <p><small>Copyright &copy; {nowYear} benjuwan</small></p>
        </TheFooter>
    );
}

const TheFooter = styled.footer`
& p {
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 0;
    font-size: 12px;
    line-height: 2;
}
`;