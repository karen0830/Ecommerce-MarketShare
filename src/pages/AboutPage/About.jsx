import React from "react";
import PageHeader from "../../components/PageHeader";

const subTitle = "Quines somos";
const title = "";
const desc =
  "Somos un equipo comprometido con la creación de una experiencia única en el comercio electrónico. Nuestra plataforma combina la conveniencia de las compras en línea con la interacción social, conectando a usuarios, compradores y vendedores en un entorno colaborativo. Buscamos mejorar la experiencia del usuario y brindar oportunidades a pequeños vendedores para que prosperen en el mercado digital.";

const About = () => {
  return (
    <div>
      <PageHeader title={"Acerca De Nosotros"} />
      <div className="about-section style-3 padding-tb ">
        <div className="container">
          <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-center">
            <div className="col">
              <div className="about-right">
                <div className="section-header">
                  <span className="subtitle" style={{ color: "#1655e9" }}>
                    {subTitle}
                  </span>
                  <h2 className="title">{title}</h2>
                  <p>{desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;