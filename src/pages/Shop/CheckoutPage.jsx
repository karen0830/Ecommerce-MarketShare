import React, { useState } from "react";
import "../../components/modal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { addPurchase, getShoppingCart } from "../../api/auth";
import "./CheckoutPage.css"

const ModalPurchase = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-review">
        <div className="modal-content-review">{children}</div>
      </div>
    </div>
  );
};

const CheckoutPage = (cartItems, setCartItems) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("visa"); // Initial active tab
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenP, setIsModalOpenP] = useState(false);
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // order confirmation and redirect to home page
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isModalOpenPurchase = () => {
    setIsModalOpenP(true);
  };

  const closeModalPurchase = () => {
    setIsModalOpenP(false);
    window.location.reload();
  };

  const handleOrderConfirm = async () => {
    alert("Your order placed successfully!")
    localStorage.removeItem("cart");
    navigate(from, { replace: true });
  }

  const confirmPurchase = async () => {
    console.log("UUU");
    console.log(cartItems);
    let info = cartItems.cartItems
    for (let i = 0; i < info.length; i++) {
      console.log(info[i]);
      const response = await addPurchase(info[i]);
      console.log(response);
    }
    async function obtenerCarrito() {
      const res = await getShoppingCart();
      setCartItems(res.data);
    }
    obtenerCarrito();
    closeModal();
    isModalOpenPurchase();
  }

  return (
    <div className="modalCard">
      <Button variant="primary" onClick={handleShow} className="py-2">
        Ir al pago
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-dialog">
          <h5 className="px-3 mb-3">Seleccione su método de pago</h5>
          <div className="modal-content">
            <div className="modal-body">
              <div className="tabs mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${activeTab === "visa" ? "active" : ""
                        }`}
                      id="visa-tab"
                      data-toggle="tab"
                      href="#visa"
                      role="tab"
                      aria-controls="visa"
                      aria-selected={activeTab === "visa"}
                      onClick={() => handleTabChange("visa")}
                    >
                      <img src="https://i.imgur.com/sB4jftM.png" width="80" />
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${activeTab === "paypal" ? "active" : ""
                        }`}
                      id="paypal-tab"
                      data-toggle="tab"
                      href="#paypal"
                      role="tab"
                      aria-controls="paypal"
                      aria-selected={activeTab === "paypal"}
                      onClick={() => handleTabChange("paypal")}
                    >
                      <img src="https://i.imgur.com/yK7EDD1.png" width="80" />
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  {/* Contenido de visa */}
                  <div
                    className={`tab-pane fade ${activeTab === "visa" ? "show active" : ""
                      }`}
                    id="visa"
                    role="tabpanel"
                    aria-labelledby="visa-tab"
                  >
                    {/* Contenido de la pestaña de Visa */}
                    <div className="mt-4 mx-4">
                      <div className="text-center">
                        <h5>Tarjeta de crédito</h5>
                      </div>
                      <div className="form mt-3">
                        <div className="inputbox">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            required="required"
                          />
                          <span>Nombre del titular de la tarjeta</span>
                        </div>
                        <div className="inputbox">
                          <input
                            type="text"
                            name="name"
                            min="1"
                            max="999"
                            className="form-control"
                            required="required"
                          />
                          <span>Número de tarjeta</span> <i className="fa fa-eye"></i>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="inputbox">
                            <input
                              type="text"
                              name="name"
                              min="1"
                              max="999"
                              className="form-control"
                              required="required"
                            />
                            <span>Fecha de expiración</span>
                          </div>
                          <div className="inputbox">
                            <input
                              type="text"
                              name="name"
                              min="1"
                              max="999"
                              className="form-control"
                              required="required"
                            />
                            <span>CVV</span>
                          </div>
                        </div>
                        <div className="px-5 pay">
                          <button className="btn btn-success btn-block" onClick={openModal}>
                            Agregar tarjeta
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Contenido de Paypal */}
                  <div
                    className={`tab-pane fade ${activeTab === "paypal" ? "show active" : ""
                      }`}
                    id="paypal"
                    role="tabpanel"
                    aria-labelledby="paypal-tab"
                  >
                    {/* Contenido de la pestaña de Paypal */}
                    <div className="mx-4 mt-4">
                      <div className="text-center">
                        <h5>Información de la cuenta de Paypal</h5>
                      </div>
                      <div className="form mt-3">
                        <div className="inputbox">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            required="required"
                          />
                          <span>Ingrese su correo electrónico</span>
                        </div>
                        <div className="inputbox">
                          <input
                            type="text"
                            name="name"
                            min="1"
                            max="999"
                            className="form-control"
                            required="required"
                          />
                          <span>Su nombre</span>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="inputbox">
                            <input
                              type="text"
                              name="name"
                              min="1"
                              max="999"
                              className="form-control"
                              required="required"
                            />
                            <span>Información adicional</span>
                          </div>
                          <div className="inputbox">
                            <input
                              type="text"
                              name="name"
                              min="1"
                              max="999"
                              className="form-control"
                              required="required"
                            />
                            <span></span>
                          </div>
                        </div>
                        <div className="pay px-5">
                          <button className="btn btn-primary btn-block" onClick={openModal}>
                            Agregar Paypal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ModalPurchase isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="Tile-Review">Confirmar Orden</h2>
                <p className="P-content-Review">¿Estás seguro de que deseas proceder con esta orden? Revisa cuidadosamente los detalles de tu pedido antes de confirmar. Una vez confirmado, no podrás deshacer esta acción.</p>
                <div className="modal-actions">
                  <button onClick={closeModal} className="btn-cancel">Cancelar</button>
                  <button onClick={()=>{
                    confirmPurchase()
                  }} className="btn-confirm">Confirmar Orden</button>
                </div>
              </ModalPurchase>
              <ModalPurchase isOpen={isModalOpenP} onClose={closeModalPurchase}>
                <h2 className="Tile-Review">Compra realizada con éxito</h2>
                <p className="P-content-Review">¡Tu orden se ha realizado correctamente! ¡Gracias por tu compra!</p>
                <div className="modal-actions">
                  <button onClick={closeModalPurchase} className="btn-cancel">Cerrar</button>
                </div>
              </ModalPurchase>

              {/* Aviso de pago */}
              <p className="mt-3 px-4 p-Disclaimer">
                <em>Descargo de responsabilidad de pago:</em> En ningún caso el pago o el pago parcial por parte del propietario por cualquier material o servicio
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;