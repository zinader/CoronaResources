import "./footer.css";

const Footer = () => {
  return (
    <footer id="fh5co-footer" class="fh5co-bg" role="contentinfo">
      <div class="overlay"></div>
      <div class="container">
        <div class="row row-pb-md">
          <div class="col-md-4 fh5co-widget">
            <h3>CoviResource</h3>
            <p>
              A place where you can find all the help you need to fight this
              pandemic. We’re in this together. Share with your friends and
              family, your small step might save a life.
            </p>
          </div>
          <div class="col-md-8">
            <h3>Contact</h3>
            <div class="col-md-4 col-sm-4 col-xs-6">
              <ul class="fh5co-footer-links">
                <li>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSc-5W9FraLhHun3gHpsPuUuhOyLr58g0Fkc1fOxhGbjJK4MHw/viewform">
                    Google Form
                  </a>
                </li>
                <li>
                  <a href="#">Parth</a>
                </li>
                <li>
                  <a href="#">Aditya</a>
                </li>
                <li>
                  <a href="#">Ashutosh</a>
                </li>
                <li>
                  <a href="#">Pulkit</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row copyright" style={{ fontWeight: "700px" }}>
          <div class="col-md-12 text-center">
            <p>
              <small class="block">&copy; 2017 | All Rights Reserved.</small>
              <small class="block">Powered by siteName.com</small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
