/* eslint-disable react/jsx-no-target-blank */
import "./Footer.css";
import { Link } from "react-router-dom";

const title = "Acerca del Sena";
const desc =
  "El sena es un establecimiento público del orden nacional, con personería jurídica, patrimonio propio e independiente y autonomía administrativa, adscrito al Ministerio de Trabajo y Seguridad Social de la República de Colombia.";
const ItemTitle = "Categories";

const addressList = [
  {
    iconName: "icofont-google-map",
    text: "Quindio, Colombia.",
  },
];

const ItemList = [
  {
    text: "Todos Los Productos",
    link: "/shop",
  },
  {
    text: "Tenda",
    link: "/shop",
  },
  {
    text: "Acerca De",
    link: "/about",
  },
  {
    text: "Policy",
    link: "#",
  },
  {
    text: "FAQs",
    link: "/about",
  },
];

const footerbottomList = [
  {
    text: "Sena",
    link: "#",
  },
  {
    text: "Equipo",
    link: "#",
  },
  {
    text: "Ideas",
    link: "#",
  },
];

const Footer = () => {
  return (
    <footer className="style-2">
      <div className="footer-top dark padding-tb">
        <div className="container">
          <div className="row g-4 row-cols-xl-4 row-cols-sm-2 row-cols-1 justify-content-center">
            <div className="col">
              <div className="footer-item">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div>
                      <h4 className="white">{ItemTitle}</h4>
                    </div>
                    <div className="content-li">
                      <ul className="lab-ul">
                        {ItemList.map((val, i) => (
                          <li key={i}>
                            <a href={val.link}>{val.text}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div>
                      <h4 className="white">{title}</h4>
                    </div>
                    <div className="content">
                      <p className="">{desc}</p>
                      <ul className="lab-ubication office-address">
                        {addressList.map((val, i) => (
                          <li key={i} className="address-li">
                            <i
                              className={val.iconName}
                              style={{ color: "rgb(40, 123, 255)" }}
                            ></i>
                            {val.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="footer-bottom"
        style={{
          backgroundColor: "#1c1c1c",
          borderTop: "1px solid rgba(47, 51, 54, 255)",
        }}
      >
        <div className="container">
          <div className="section-wrapper">
            <p style={{ color: "#fff" }}>
              2023 <Link to="/">Carrito de compras</Link>
            </p>
            <div className="footer-bottom-list">
              {footerbottomList.map((val, i) => (
                <a href={val.link} key={i}>
                  {val.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;