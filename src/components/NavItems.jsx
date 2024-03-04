import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { NavDropdown } from "react-bootstrap";
import "./NavItems.css";
const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFiexd, setHeaderFiexd] = useState(false);

  // check if user is register
  const { user, logOut, isAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFiexd(true);
    } else {
      setHeaderFiexd(false);
    }
  });

  return (
    <header
      className={`header-section style-4  ${headerFiexd ? "header-fixed" : ""}`}
      style={{ borderBottom: "1px solid rgba(47, 51, 54, 255)" }}
    >
      {/* ------ header top: first div ----- */}
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <Link to="/signup" className="lab-btn me-3">
              <span>Crear Cuenta</span>
            </Link>
            <Link to="/login">Iniciar Sesion</Link>
          </div>
        </div>
      </div>

      {/* header top ends*/}

      {/* ---header botton starts */}
      <div className="header-bottom" style={{ background: "#242424" }}>
        <div className="container">
          <div className="header-wrapper ">
            {/* logo  */}
            <div className="logo-search-acte">
              <div className="logo">
                <Link to="/">
                  <img src="images/logo/Logo_MarketShare.png" alt="logo" />
                </Link>
              </div>
            </div>

            {/* menu area */}
            <div className="menu-area">
              {/* users when user available */}
              {user ? (
                <>
                  <div className="menu">
                    <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                      <li>
                        <Link to={`/:${user.id}`} style={{ color: "#fff" }}>
                          Inicio
                        </Link>
                      </li>
                      <li>
                        <Link to={`/shopping/:${user.id}`} style={{ color: "#fff" }}>
                          Tienda
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <NavLink to={`/about/:${user.id}`} style={{ color: "#fff" }}>
                          Nosotros
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={`/contact/:${user.id}`} style={{ color: "#fff" }}>
                          Contacto
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div>
                    {user.url ? (
                      <>
                        <img src={user.url} className="nav-profile" />
                      </>
                    ) : (
                      <img
                        src="/src/assets/images/author/01.jpg"
                        className="nav-profile"
                      />
                    )}
                  </div>
                  <NavDropdown id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1" onClick={handleLogout}>
                      Cerrar Sesion
                    </NavDropdown.Item>
                    <NavDropdown.Item href={`/cart-page/:${user.id}`}>
                      Carrito De Compras
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Perfil
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href={`/cart-page/:${user.id}`}>Order</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <div className="menu">
                    <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                      <li>
                        <Link to="/" style={{ color: "#fff" }}>
                          Inicio
                        </Link>
                      </li>
                      <li>
                        <Link to="shop" style={{ color: "#fff" }}>
                          Tienda
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <NavLink to="/about" style={{ color: "#fff" }}>
                          Nosotros
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact" style={{ color: "#fff" }}>
                          Contacto
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <Link
                    to="/sign-up"
                    className="lab-btn me-3 d-none d-md-block"
                    style={{ backgroundColor: "#287bff" }}
                  >
                    <span>Crear Cuenta</span>
                  </Link>
                  <Link
                    to="/login"
                    className="d-none d-md-block"
                    style={{ color: "#fff" }}
                  >
                    Iniciar Sesion
                  </Link>
                </>
              )}

              {/* menu toggle btn */}
              <div
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
                onClick={() => setMenuToggle(!menuToggle)}
              >
                <span style={{ background: "#105dff" }}></span>
                <span style={{ background: "#105dff" }}></span>
                <span style={{ background: "#105dff" }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header botton ends */}
    </header>
  );
};

export default NavItems;
