import React, { useState, useEffect } from "react";
import Rating from "./Sidebar/rating";
import "./Review.css";

const reviwtitle = "Add a Review";
let ReviewList = [
  {
    imgUrl: "/src/assets/images/instructor/01.jpg",
    imgAlt: "Client thumb",
    name: "Ganelon Boileau",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/02.jpg",
    imgAlt: "Client thumb",
    name: "Morgana Cailot",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/03.jpg",
    imgAlt: "Client thumb",
    name: "Telford Bois",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/src/assets/images/instructor/04.jpg",
    imgAlt: "Client thumb",
    name: "Cher Daviau",
    date: "Posted on Jun 10, 2022 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
];

const Review = () => {
  const [reviewShow, setReviewShow] = useState(true);
  const [descriptionContent, setDescriptionContent] = useState("");
  const [improvedDescription, setImprovedDescription] = useState("");

  useEffect(() => {
    const descriptionElement = document.querySelector(".description");
    console.log(descriptionElement);
    if (descriptionElement) {
      setDescriptionContent(descriptionElement.innerHTML);
    }
  }, []);

  const improveDescription = () => {
    // Ensure descriptionContent is not empty before sending it to the API
    if (descriptionContent.trim() !== "") {
      const apiUrl =
        "https://creative-description.onrender.com/api/creativeDescription/generateDescription";
      fetch(apiUrl, {
        method: "POST",
        body: descriptionContent,
        headers: {
          "Content-Type": "text/plain",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log(descriptionContent);
          return response.text();
        })
        .then((data) => {
          // Convertir la respuesta de la API en un documento HTML
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(data, "text/html");
          console.log(htmlDoc);

          // Obtener los elementos de la descripción original
          const originalDescriptionElement =
            document.querySelector(".description");

          // Obtener los párrafos originales y mejorados
          const originalPTags =
            originalDescriptionElement.querySelectorAll("p");
          const improvedPTags = htmlDoc.querySelectorAll("p");

          // Ajustar la cantidad de párrafos en el contenido original
          for (let i = 0; i < improvedPTags.length; i++) {
            if (!originalPTags[i]) {
              // Si no existe un párrafo original para el párrafo mejorado actual, se agrega uno
              const newPTag = document.createElement("p");
              originalDescriptionElement.appendChild(newPTag);
              originalPTags[i] = newPTag;
            }
            // Se actualiza el contenido del párrafo original con el contenido mejorado
            originalPTags[i].innerHTML = improvedPTags[i].innerHTML;
          }

          // Eliminar párrafos sobrantes en el contenido original
          for (let i = improvedPTags.length; i < originalPTags.length; i++) {
            originalPTags[i].remove();
          }

          // Obtener las listas originales y mejoradas
          const originalLiTags =
            originalDescriptionElement.querySelectorAll("li");
          const improvedLiTags = htmlDoc.querySelectorAll("li");

          // Ajustar la cantidad de listas en el contenido original
          for (let i = 0; i < improvedLiTags.length; i++) {
            if (!originalLiTags[i]) {
              // Si no existe una lista original para la lista mejorada actual, se agrega una
              const newLiTag = document.createElement("li");
              originalDescriptionElement.appendChild(newLiTag);
              originalLiTags[i] = newLiTag;
            }
            // Se actualiza el contenido de la lista original con el contenido mejorado
            originalLiTags[i].innerHTML = improvedLiTags[i].innerHTML;
          }

          // Eliminar listas sobrantes en el contenido original
          for (let i = improvedLiTags.length; i < originalLiTags.length; i++) {
            originalLiTags[i].remove();
          }
        })
        .catch((error) => {
          console.error(
            "Error al solicitar la mejora de la descripción:",
            error
          );
        });
    } else {
      console.error("Description content is empty.");
    }
  };

  return (
    <>
      <ul
        className={`review-nav lab-ul ${
          reviewShow ? "RevActive" : "DescActive"
        }`}
      >
        <li onClick={() => setReviewShow(!reviewShow)} className="desc">
          Description
        </li>
        <li onClick={() => setReviewShow(!reviewShow)} className="rev">
          Reviews 4
        </li>
      </ul>
      <div
        className={`review-content ${
          reviewShow ? "review-content-show" : "description-show"
        }`}
      >
        <div className="review-showing">
          <ul className="content lab-ul">
            {ReviewList.map((review, i) => (
              <li key={i}>
                <div className="post-thumb">
                  <img src={`${review.imgUrl}`} alt={`${review.imgAlt}`} />
                </div>
                <div className="post-content">
                  <div className="entry-meta">
                    <div className="posted-on">
                      <a href="#">{review.name}</a>
                      <p>{review.date}</p>
                    </div>
                    <Rating />
                  </div>
                  <div className="entry-content">
                    <p>{review.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="client-review">
            <div className="review-form">
              <div className="review-title">
                <h5>{reviwtitle}</h5>
              </div>
              <form action="action" className="row">
                <div className="col-md-4 col-12">
                  <input type="text" name="name" placeholder="Full Name *" />
                </div>
                <div className="col-md-4 col-12">
                  <input type="text" name="email" placeholder="Your Email *" />
                </div>
                <div className="col-md-4 col-12">
                  <div className="rating">
                    <span className="rating-title">Your Rating : </span>
                    <Rating />
                  </div>
                </div>
                <div className="col-md-12 col-12">
                  <textarea
                    rows="8"
                    type="text"
                    name="message"
                    placeholder="Type Here Message"
                  ></textarea>
                </div>
                <div className="col-12">
                  <button className="default-button" type="submit">
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="description">
          <button onClick={improveDescription}>Mejorar Descripcion</button>
          <p>
            Descubre el nuevo Samsung S24, el smartphone que redefine la
            innovación con su pantalla Infinity-O de 6.8 pulgadas, ofreciendo
            una experiencia visual sin precedentes. Diseñado para capturar la
            esencia de la modernidad, este dispositivo no solo es un teléfono,
            sino una extensión de tu estilo de vida digital.
          </p>
          <div className="post-item">
            <div className="post-thumb">
              <img
                src="/src/assets/images/shop/01.jpg"
                alt="shop"
                style={{ borderRadius: "1.13rem" }}
              />
            </div>

            <div className="post-content">
              <ul className="lab-ul">
                <li>
                  Cámara cuádruple revolucionaria de 108MP para fotos
                  profesionales bajo cualquier condición de luz.
                </li>
                <li>
                  Batería de larga duración de 5000mAh, acompañada de carga
                  rápida inalámbrica para mantenerse activo todo el día.
                </li>
                <li>
                  Procesador Exynos 990, brindando un rendimiento excepcional
                  para gaming y multitarea.
                </li>
                <li>
                  Resistencia al agua y al polvo IP68, asegurando durabilidad en
                  cualquier aventura.
                </li>
                <li>
                  Conectividad 5G para velocidades de descarga ultrarrápidas y
                  una experiencia en línea sin interrupciones.
                </li>
                <li>
                  Interfaz One UI 3.1, que ofrece una experiencia de usuario
                  intuitiva y personalizable.
                </li>
                <li>
                  Seguridad de grado defensa con el Knox, manteniendo tus datos
                  protegidos contra amenazas.
                </li>
              </ul>
            </div>
          </div>
          <p>
            El Samsung S24 no es solo un paso adelante en tecnología; es un
            salto hacia el futuro. Con su diseño elegante, capacidades de cámara
            avanzadas y rendimiento de vanguardia, este smartphone está aquí
            para establecer nuevos estándares. Vive la experiencia de la próxima
            generación de móviles ahora.
          </p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: improvedDescription }} />
      </div>
    </>
  );
};

export default Review;