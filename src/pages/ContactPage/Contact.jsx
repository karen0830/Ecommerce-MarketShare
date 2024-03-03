import React from "react";

const btnText = "Envianos Un Mensaje";

const Contact = () => {
  return (
    <div className="contact-section padding-tb">
      <div className="container">
        <div className="section-wrapper padding-tb">
          <form className="contact-form">
            <div className="form-group">
              <input type="text" name="name" placeholder="Nombre *" />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="Corre electronico *"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="number"
                placeholder="Numero de telefono *"
              />
            </div>
            <div className="form-group">
              <input type="text" name="subject" placeholder="Asunto *" />
            </div>
            <div className="form-group w-100">
              <textarea
                rows="8"
                type="text"
                placeholder="Tu mensaje"
              ></textarea>
            </div>
            <div className="form-group w-100 text-center">
              <button className="lab-btn" style={{ background: "#287bff" }}>
                <span>{btnText}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;