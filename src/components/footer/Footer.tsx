export const Footer = () => {
    const nowYear: number = new Date().getFullYear();

    return (
        <footer>
            <p className="text-center w-full text-[12px] leading-[2]"><small>Copyright &copy; {nowYear} <a href="https://github.com/benjuwan" target="_blank">benjuwan</a></small></p>
        </footer>
    );
}