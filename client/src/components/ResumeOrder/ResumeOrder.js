import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./ResumeOrder.module.css";
import ResumeOrderCard from "./ResumeOrderCard";
import { createCont } from "../contexto/contextProvider";

function ResumeOrder() {
  const { stringLocalStorage } = useContext(createCont);

  let y = JSON.parse(localStorage.getItem(stringLocalStorage));
  let productsFromLocalStorage = Array.from(y);

  const total = productsFromLocalStorage.reduce((acc, o) => {
    let cant = o.quantity ? o.quantity : 1;
    acc += o.price * cant;
    return acc;
  }, 0);

  return (
    <div className={style.containerCart}>

      <div clasName={style.superior}>
      <div className={style.containerButtons}>
        <Link to="/shoppingCar">
          <button className={style.button}>Volver al carrito</button>
        </Link>

        <Link to="/orderInfo">
          <button className={style.button}>Continuar</button>
        </Link>
        </div>

      <div className={style.containerInfo}>

        <div className={style.containerPrice}>
            <span>Mi orden</span>
          </div>

       <div className={style.containerPrice}>
            <span>Precio total: ${total}</span>
          </div>
      </div>
      </div>
      <div className={style.cards}>
       

        {productsFromLocalStorage &&
          productsFromLocalStorage.map((e) => (
            <ResumeOrderCard key={e.idProduct} obj={e} />
          ))}
      </div>


    </div>
  );
}

export default ResumeOrder;
