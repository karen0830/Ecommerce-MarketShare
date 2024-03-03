import React from "react";

const SelectCategory = (select) => {
  return (
    <select defaultValue={select}>
      <option value="all">Todas Las Categorias</option>
      <option value="electronics">Electronicos</option>
      <option value="computer">Computadoras</option>
      <option value="smart-home">Hogar Inteligente</option>
      <option value="baby">Bebes</option>
      <option value="beauty">Belleza</option>
      <option value="personal-care">Cuidado Personal</option>
      <option value="butcher-shop">Automoviles</option>
    </select>
  );
};

export default SelectCategory;