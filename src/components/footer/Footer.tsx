import styled from "styled-components";

export const Footer = () => {
    const nowYear: number = new Date().getFullYear();

    return (
        <TheFooter>
            <p><small>Copyright &copy; {nowYear} <a href="https://github.com/benjuwan" target="_blank">benjuwan</a></small></p>
        </TheFooter>
    );
}

const TheFooter = styled.footer`
& p {
    text-align: center;
    width: 100%;
    font-size: 12px;
    line-height: 2;
}
`;