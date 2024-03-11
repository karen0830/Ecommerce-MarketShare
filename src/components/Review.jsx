import React, { useState, useEffect } from "react";
import Rating from "./Sidebar/Rating.jsx";
import "./Review.css";
import { addReviews, deleteReviw_, getReviews } from "../api/auth.js";
import { useAuth } from "../contexts/AuthProvider.jsx";
import { NavDropdown } from "react-bootstrap";
const reviwtitle = "Agregar una reseña";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-review">
        <div className="modal-content-review">{children}</div>
      </div>
    </div>
  );
};


// comment, start, idProduct

const Review = ({ id }) => {
  const [reviewShow, setReviewShow] = useState(true);
  const [descriptionContent, setDescriptionContent] = useState("");
  const [ratingNum, setRatingNum] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenComment, setIsModalOpenComment] = useState(false);
  const [isModalOpenStart, setIsModalOpenStart] = useState(false);
  const [isModalOpenDeleteComment, setIsModalOpenDeleteComment] = useState(false);
  const [idDelete, setIdDelete] = useState(null)

  const { user } = useAuth();

  const closeModalComment = () => {
    setIsModalOpenComment(false);
  };

  const OpenModalComment = () => {
    setIsModalOpenComment(true);
  };

  const openModalStart = () => {
    setIsModalOpenStart(true);
  };

  const closeModalStart = () => {
    setIsModalOpenStart(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalDeleteComment = () => {
    setIsModalOpenDeleteComment(false);
  };

  const OpenModalDeleteComment = () => {
    setIsModalOpenDeleteComment(true);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const descriptionElement = document.querySelector(".description");
    console.log(descriptionElement);
    if (descriptionElement) {
      setDescriptionContent(descriptionElement.innerHTML);
    }
  }, []);

  const addReview = async () => {
    if (message && ratingNum) {
      const data = {
        comment: message,
        start: ratingNum,
        idProduct: id
      }
      const result = await addReviews(data)
      if (result.data) {
        OpenModalComment()
        getReview();
      } else if (result.response.data) {
        openModal()
      }
    } else {
      openModalStart()
    }
  }

  async function getReview() {
    const data = {
      idProduct: id
    }
    const result = await getReviews(data);
    console.log(result);
    setReviewList(result.data.reverse())
  }

  useEffect(() => {
    getReview();
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita la acción predeterminada del formulario
    addReview();
  };

  useEffect(() => {
    console.log(ratingNum, " Nummm");
  }, [ratingNum])

  const AlertDeleteComment = () => {
    OpenModalDeleteComment();
  }

  const deleteComment = async () => {
    if (idDelete) {
      const data = {
        idReview: idDelete
      }
      const response = await deleteReviw_(data)
      console.log(response);
      getReview()
      closeModalDeleteComment()
      console.log(idDelete);
    }
  }
  return (
    <>
      <ul
        className={`review-nav lab-ul ${reviewShow ? "RevActive" : "DescActive"
          }`}
      >
        <li onClick={() => setReviewShow(!reviewShow)} className="rev">
          Reseñas {reviewList.length}
        </li>
      </ul>
      <div
        className={`review-content ${reviewShow ? "review-content-show" : "description-show"
          }`}
      >
        <div className="review-showing">
          <ul className="content lab-ul">
            {reviewList.map((review, i) => (
              <li key={i}>
                {review.name == user.username ? (
                  <>
                    <div>
                      <img src={review.imgUrl} className="nav-profile" />
                    </div>
                    <NavDropdown id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={() => {
                        AlertDeleteComment();
                        setIdDelete(review.idReviews);
                      }}>
                        Eliminar
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) :
                  <div>
                    <img src={review.imgUrl} className="nav-profile" />
                  </div>
                }
                <div className="post-content">
                  <div className="entry-meta">
                    <div className="posted-on">
                      <a href="#">{review.name}</a>
                      <p>{review.comment}</p>
                    </div>
                    <div className="rating">
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <span
                            key={index}
                            className={starValue <= review.stars ? "star selected" : "star"}
                          // onClick={() => handleStarClick(starValue)}
                          >
                            &#9733;
                          </span>
                        );
                      })}
                    </div>
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
              <form action={handleSubmit} className="row">
                <div className="col-md-4 col-12">
                  <div className="rating">
                    <span className="rating-title">Tu calificación : </span>
                    <Rating setRatingNum={setRatingNum} />
                  </div>
                </div>
                <div className="col-md-12 col-12">
                  <textarea
                    rows="8"
                    type="text"
                    name="message"
                    placeholder="Escribe aquí tu mensaje"
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </form>
              <div className="col-12">
                <button className="default-button" onClick={addReview}>
                  <span>Enviar reseña</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpenComment} onClose={closeModalComment}>
          <h2 className="Tile-Review">Comentario Subido</h2>
          <p className="P-content-Review">Tu comentario ha sido subido exitosamente. Gracias por tu aporte.</p>
          <button onClick={closeModalComment}>Cerrar</button>
        </Modal>
        <Modal isOpen={isModalOpenDeleteComment} onClose={closeModalDeleteComment}>
          <h2 className="Tile-Review">Eliminar Comentario</h2>
          <p className="P-content-Review">¿Estás seguro de que quieres eliminar este comentario?</p>
          <div className="options-delete">
            <button onClick={closeModalDeleteComment}>Cancelar</button>
            <button onClick={deleteComment}>Eliminar</button>
          </div>
        </Modal>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="Tile-Review">Contenido Inadecuado</h2>
          <p className="P-content-Review">Lo siento, pero tu comentario no parece estar relacionado con el tema en discusión o puede ser inadecuado. Por favor, asegúrate de que tus comentarios sean relevantes y respetuosos. Gracias por tu comprensión.</p>
          <button onClick={closeModal}>Cerrar</button>
        </Modal>
        <Modal isOpen={isModalOpenStart} onRequestClose={closeModalStart}>
          <h2 className="Tile-Review">Calificación Obligatoria</h2>
          <p className="P-content-Review">Por favor, asegúrate de seleccionar una calificación y añadir un comentario antes de enviar. Ambos campos son obligatorios para poder procesar tu comentario correctamente.</p>
          <button onClick={closeModalStart}>Cerrar</button>
        </Modal>

      </div>
    </>
  );
};

export default Review;