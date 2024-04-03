import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import { addShoppingCart, decrementProduct, deleteCart, getShoppingCart } from "../../api/auth";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Obtener los elementos del carrito del almacenamiento local
    async function obtenerCarrito() {
      const res = await getShoppingCart();
      setCartItems(res.data);
    }
    obtenerCarrito();
  }, []);

  // Calcular el precio total para cada artículo en el carrito
  const calcularPrecioTotal = (item) => {
    return item.price * item.quantity;
  };

  // Manejar el aumento de la cantidad
  const handleIncrease = async (item) => {
    try {
      const Data = {
        idProduct: item.idProduct,
        quantity: 1
      }
      const res = await addShoppingCart(Data);
      console.log(res);
      const response = await getShoppingCart();
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Manejar la disminución de la cantidad
  const handleDecrease = async (item) => {
    try {
      const Data = {
        cartItemId: item.idCartItem,
        quantityToRemove: 1
      }
      const res = await decrementProduct(Data);
      console.log(res);
      const response = await getShoppingCart();
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Manejar la eliminación de un artículo
  const handleRemoveItem = async (item) => {
    try {
      console.log("item", item);
      const Data = {
        cartId: item.idCartItem
      }
      const res = await deleteCart(Data);
      console.log(res);
      const response = await getShoppingCart();
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Calcular el subtotal del carrito
  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calcularPrecioTotal(item);
  }, 0);

  // Calcular el total de la orden
  const orderTotal = cartSubtotal;

  return (
    <div>
      <PageHeader title={"Carrito de Compras"} curPage={"Página del Carrito"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* Parte superior del carrito */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Producto</th>
                    <th className="cat-price">Precio</th>
                    <th className="cat-quantity">Cantidad</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(cartItems) ? (
                    cartItems.map((item, indx) => (
                      <tr key={indx}>
                        <td className="product-item cat-product">
                          <div className="p-thumb">
                            <Link to={`/shop/${item.id}`}>
                              <img src={`${item.img}`} alt="" />
                            </Link>
                          </div>
                          <div className="p-content">
                            <Link to={`/shop/${item.id}`}>{item.name}</Link>
                          </div>
                        </td>
                        <td className="cat-price">${item.price}</td>
                        <td className="cat-quantity">
                          <div className="cart-plus-minus">
                            <div
                              className="dec qtybutton"
                              onClick={() => handleDecrease(item)}
                            >
                              -
                            </div>
                            <input
                              className="cart-plus-minus-box"
                              type="text"
                              name="qtybutton"
                              value={item.quantity}
                            />
                            {item.stock > 0 ? (
                              <div
                                className="inc qtybutton"
                                onClick={() => handleIncrease(item)}
                              >
                                +
                              </div>
                            ) :
                              <p>Stock Agotado</p>
                            }
                          </div>
                        </td>
                        <td className="cat-toprice">
                          ${calcularPrecioTotal(item)}
                        </td>
                        <td className="cat-edit">
                          <button href="#" onClick={() => handleRemoveItem(item)}>
                            <img src="/images/shop/del.png" alt="" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : null}
                </tbody>
              </table>
            </div>

            {/* Parte inferior del carrito */}
            <div className="cart-bottom">
              {/* Cuadro de pago */}
              <div className="cart-checkout-box">
                <form className="coupon" action="/">
                  <input
                    type="text"
                    name="coupon"
                    placeholder="Código de Cupón..."
                    className="cart-page-input-text"
                  />
                  <input type="submit" value="Aplicar Cupón" />
                </form>
                <form className="cart-checkout" action="/">
                  <input type="submit" value="Actualizar Carrito" />
                  {/* <Link to="/check-out"><input type="submit" value="Proceed to Checkout" /></Link> */}
                  <div>
                  <CheckoutPage cartItems={cartItems} setCartItems={setCartItems}/>
                  </div>
                </form>
              </div>

              {/* Cuadro de envío */}
              <div className="shiping-box">
                <div className="row">
                  {/* Envío */}
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3>Calcular Envío</h3>
                      <div className="outline-select">
                        <select>
                          <option value="volvo">País</option>
                          <option value="saab">Colombia</option>
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div>
                      <div className="outline-select shipping-select">
                        <select>
                          <option value="volvo">Ciudad</option>
                          <option value="saab">Armenia</option>
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="coupon"
                        placeholder="Código Postal"
                        className="cart-page-input-text"
                      />
                      <button type="submit">Actualizar Total</button>
                    </div>
                  </div>

                  {/* Total del carrito */}
                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>Total del Carrito</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">Subtotal del Carrito</span>
                          <p className="pull-right">$ {cartSubtotal}</p>
                        </li>
                        <li>
                          <span className="pull-left">
                            Envío y Manipulación
                          </span>
                          <p className="pull-right">Envío Gratis</p>
                        </li>
                        <li>
                          <span className="pull-left">Total de la Orden</span>
                          <p className="pull-right">
                            $ {orderTotal.toFixed(2)}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
