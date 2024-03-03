/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addShoppingCart } from "../../api/auth";
import { useAuth } from "../../contexts/AuthProvider";

const ProductDisplay = ({ item, addToCart }) => {
  const { id, img, price, name, quantity, seller } = item;
  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");
  const {user} = useAuth()

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object representing the product to be added to the cart
    const product = {
      id: id,
      img: img,
      name: name,
      price: price,
      quantity: quantity,
      size: size,
      color: color,
      coupon: coupon,
    };

    // Call the addToCart function provided by the parent component

    // Reset form fields
    setSize("Select Size");
    setColor("Select Color");
    setCoupon("");
  };

  const addShopping = async () => {
    if (size && color) {
      try {
        const Data = {
          idProduct: id,
          quantity: 1,
          size: size,
          color: color
        }
        const res = await addShoppingCart(Data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <div>
        <h4 style={{ color: "#fff" }}>{name}</h4>
        <p className="rating">
          <i className="icofont-star"></i>
          (3 reseñas)
        </p>
        <h4 style={{ color: "#f16126" }}>${price}</h4>
        <h6 style={{ color: "#fff" }}>{seller}</h6>
        <p>{item.description}</p>
      </div>
      {/* Componente de Carrito de Producto Individual aquí */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="select-product size">
            <select value={size} onChange={handleSizeChange}>
              <option>Seleccionar Tamaño</option>
              <option>SM</option>
              <option>MD</option>
              <option>LG</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="select-product color">
            <select value={color} onChange={handleColorChange}>
              <option>Seleccionar Color</option>
              <option>Rosado</option>
              <option>Ceniza</option>
              <option>Rojo</option>
              <option>Blanco</option>
              <option>Azul</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <button type="submit" onClick={addShopping} className="lab-btn">
            <span>Agregar al Carrito</span>
          </button>

          <Link to={`/cart-page/:${user.id}`} className="lab-btn bg-primary">
            <span>Revisar</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;
