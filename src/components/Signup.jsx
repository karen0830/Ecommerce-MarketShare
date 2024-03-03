import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import "./SignUp.css";

const title = "Registrate ahora";
const socialTitle = "Registrarse Con Una Red Social";
const btnText = "Empieza Ahora";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { signUpWithGmail, createUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  // login with email password
  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value; // Get the confirm password field

    if (password !== confirmPassword) {
      // Passwords do not match, set an error message
      setErrorMessage(
        "Las Contraseñas No Coinciden Porfavor Escribelas Nuevamente"
      );
    } else {
      // Passwords match, proceed with signup logic
      setErrorMessage(""); // Clear the error message
      createUser(email, password)
        .then((userCredential) => {
          // Signed in successfully
          const user = userCredential.user;
          alert("Cuenta Creada Exitosamente!");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          alert(`${errorMessage}`);
        });
    }
  };
  return (
    <div>
      <div
        className="login-section padding-tb section-bg"
        style={{ backgroundColor: "#2e2e2e" }}
      >
        <div className="container">
          <div
            className="account-wrapper"
            style={{ backgroundColor: "#1c1c1c" }}
          >
            <h3 className="title" style={{ color: "#fff" }}>
              {title}
            </h3>
            <form className="account-form" onSubmit={handleSignup}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre De Usuario"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electronico"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                />
              </div>
              {/* showing error message */}
              <div>
                {errorMessage && (
                  <div className="error-message text-danger">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="form-group">
                <button className="lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Eres Miembro? <Link to="/login">Ingresar</Link>
              </span>
              <span className="or">
                <span>o</span>
              </span>

              <h5 className="subtitle" style={{ color: "#fff" }}>
                {socialTitle}
              </h5>
              <ul className="lab-ul social-icons justify-content-center">
                <li>
                  <button onClick={handleRegister} className="github">
                    <i className="icofont-github"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;