function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="absolute flex bottom-0 gap-x-2 [word-spacing:3px]">
      &copy; Copyright {year},
      <a
        href="https://grifonekio.site/"
        target="_blank"
        className="hover:underline"
      >
        Max Demel
      </a>
    </div>
  );
}

export default Footer;
