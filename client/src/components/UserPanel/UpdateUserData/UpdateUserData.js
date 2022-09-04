import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, updateUserData } from "../../../Actions/index.js";
import UserPanel from "../UserPanel";
import styles from './UpdateUserData.module.css';
import loadingLogo from "../../../imagenes/loading.png"
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";

function validate(input) {
  const errors = {};

  if (!input.fullname) {
    errors.fullname = "El nombre es requerido";
  }

  if (!input.address) {
    errors.address = "La dirección es requerida";
  }
  if (!input.CP) {
    errors.CP = "El código postal es requerido";
  }
  if (!input.telephone) {
    errors.telephone = "El número de teléfono es requerido";
  }
  if (!input.city) {
    errors.city = "El nombre de la ciudad es requerido";
  }
  if (!input.country) {
    errors.country = "El nombre del país es requerido";
  }

  return errors;
}

function UpdateUserData() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true)
  const email = useSelector((state) => state.user.email);
  const info = useSelector((state) => state.userDetail.PersonalDatum);
  const { user } = useAuth0();
  console.log(info)

  useEffect(() => {
    if(user?.email.length > 0) dispatch(getUserDetail(user.email));
  }, [user]);

  const history = useHistory();

  const [input, setInput] = useState({
    fullname: info?.fullname,
    UserEmail: email,
    address: info?.address,
    CP: info?.CP,
    telephone: info?.telephone,
    city: info?.city,
    country: info?.country,
    department: info?.department
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const [errors, setErrors] = useState({});

  const handleClick = () => {
    setIsDisabled(!isDisabled)
  };

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserData(email, input));
    swal('Sus datos de perfil se actualizaron correctamente');
    setIsDisabled(true);
    setInput({
      fullname: info?.fullname,
      UserEmail: email,
      address: info?.address,
      CP: info?.CP,
      telephone: info?.telephone,
      city: info?.city,
      country: info?.country,
      department: info?.department
    });

    history.push("/home");
  };

  setTimeout((loading) => {
    setLoading(false)
  }, 1000);

  if (loading) {
    return (
      <div className={styles.contenedorLoading}>
        <div className={styles.loading}>
          <img className={styles.img} src={loadingLogo} />
        </div>
      </div>
    )
  } 
  else {
    return (
      <React.Fragment>
       
        <div className={styles.containerForm}>
          <form
            className={styles.productContainer}
            onSubmit={(e) => handleSubmit(e)}>
              <div className={styles.titleCont}>
            <h2 className={styles.titleForm}>Datos Personales</h2>
            </div>
            <div className={styles.contenedor}>
              <div className={styles.name}>
                <label className={styles.lab}>Nombre Completo:
                  <input
                    className={styles.formInput}
                    disabled={isDisabled}
                    required={true}
                    type="text"
                    name="fullname"
                    value={input.fullname}
                    placeholder="Por ej.: Juan Pérez"
                    onChange={(e) => handleInput(e)}
                  />
                  {errors.fullname && (
                    <label className={styles.textError}>{errors.fullname}</label>)}
                </label>
              </div>
              <div className={styles.name}>
                <label className={styles.lab}>Correo:
                  <input
                    className={styles.formInput}
                    disabled={isDisabled}
                    readOnly={true}
                    type="email"
                    name="UserEmail"
                    value={input.UserEmail}
                  />
                </label>
              </div>
              <div className={styles.name}>
                <label className={styles.lab}>Dirección:
                  <input
                    className={styles.formInput}
                    disabled={isDisabled}
                    required={true}
                    type="text"
                    name="address"
                    value={input.address}
                    placeholder="Calle y Número"
                    onChange={(e) => handleInput(e)}
                  />
                  {errors.address && <label className={styles.textError}>{errors.address}</label>}
                </label>
              </div>
              <div className={styles.name}>
                <label className={styles.lab}>Departamento:
                  <input
                    className={styles.formInput}
                    disabled={isDisabled}
                    required={true}
                    type="number"
                    name="department"
                    value={input.department}
                    placeholder="N° de Dpto - Si vives en casa -> 0"
                    onChange={(e) => handleInput(e)}
                  />
                  {errors.department &&
                    <label className={styles.textError}>{errors.department}</label>
                  }
                </label>
              </div>
              <div className={styles.name}>
                <label className={styles.lab}>Ciudad:
                  <input
                    className={styles.formInput}
                    disabled={isDisabled}
                    required={true}
                    type="text"
                    name="city"
                    value={input.city}
                    placeholder="Ciudad"
                    onChange={(e) => handleInput(e)}
                  />
                  {errors.city && <label className={styles.textError}>{errors.city}</label>}
                </label>
              </div>
              <div className={styles.name}>
                <label className={styles.lab}>C.P.:
                  <input
                    className={styles.formInput}
                    disabled={isDisabled}
                    required={true}
                    type="number"
                    name="CP"
                    value={input.CP}
                    placeholder="Código Postal"
                    onChange={(e) => handleInput(e)}
                  />
                  {errors.CP && <label className={styles.textError}>{errors.CP}</label>}
                </label>
              </div>
              <div className={styles.name1}>
                <label className={styles.lab}>País:
                  <input
                    className={styles.formInput}
                    disabled={isDisabled}
                    required={true}
                    type="text"
                    name="country"
                    value={input.country}
                    placeholder="País"
                    onChange={(e) => handleInput(e)}
                  />
                  {errors.country && <label className={styles.textError}>{errors.country}</label>}
                </label>
              </div>
              <div className={styles.name1}>
                <label className={styles.lab}>Teléfono:
                  <input
                    className={styles.formInput}
                    disabled={isDisabled}
                    required={true}
                    type="tel"
                    name="telephone"
                    value={input.telephone}
                    placeholder="Teléfono"
                    onChange={(e) => handleInput(e)}
                  />
                  {errors.telephone && (
                    <label className={styles.textError}>{errors.telephone}</label>
                  )}
                </label>
              </div>
              <br />
            </div>

            <div className={styles.containerBtn}>
              

              

              <NavLink to={"/home"}>
                <button className={styles.btnS}>Salir</button>
              </NavLink>
              <button className={styles.btn} disabled={!isDisabled} onClick={handleClick}>Editar</button>
              <button className={styles.btn} type='submit' disabled={isDisabled}>Guardar</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }

}

export default UpdateUserData;







