function Footer() {
  const d = new Date();
  let year = d.getFullYear(); 

  return (
    <footer className="footer">
      <p>
        &copy; {year} Developed by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/antonin686"
        >
          Md.Antonin Islam
        </a>{" "}
        with{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://reactjs.org/"
        >
          <i className="fab fa-react">React</i>
        </a>{" "}
        &amp;{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/antonin686/anven"
        >
          <i className="fas fa-at"></i>Anven
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
