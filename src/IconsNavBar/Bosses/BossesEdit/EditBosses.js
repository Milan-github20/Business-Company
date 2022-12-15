import React, { useRef, useState } from "react";
import styles from "./editBosses.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BackDrop = () => {
  return <div className={styles.backdropEdit}></div>;
};

const ModalEditBoss = (props) => {
  const [errorName, setErrorName] = useState(false);
  const [errorSurname, setErrorSurname] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorSalary, setErrorSalary] = useState(false);

  const nameRefEditBoss = useRef();
  const surnameRefEditBoss = useRef();
  const countryRefEditBoss = useRef();
  const salaryRefEditBoss = useRef();

  const submitEditBoss = (e) => {
    e.preventDefault();

    if (
      nameRefEditBoss.current.value.trim() === "" ||
      nameRefEditBoss.current.value.trim() === null ||
      nameRefEditBoss.current.value.trim().length <= 2
    ) {
      return setErrorName(true);
    }

    if (
      surnameRefEditBoss.current.value.trim() === "" ||
      surnameRefEditBoss.current.value.trim() === null ||
      surnameRefEditBoss.current.value.trim().length <= 2
    ) {
      return setErrorSurname(true);
    }

    if (
      countryRefEditBoss.current.value.trim() === "" ||
      countryRefEditBoss.current.value.trim() === null ||
      countryRefEditBoss.current.value.trim().length <= 2
    ) {
      return setErrorCountry(true);
    }

    if (
      salaryRefEditBoss.current.value.trim() === "" ||
      salaryRefEditBoss.current.value.trim() === null
    ) {
      return setErrorSalary(true);
    }

    axios
      .put(
        `https://6363cc428a3337d9a2e85694.mockapi.io/Bosses/${props.editBoss.id}`,
        {
          Ime: nameRefEditBoss.current.value,
          Prezime: surnameRefEditBoss.current.value,
          Drzava: countryRefEditBoss.current.value,
          Plata: parseFloat(salaryRefEditBoss.current.value).toFixed(2),
        }
      )
      .then(
        toast.success("You have successfully edited the Boss!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }),
        props.onCloseEdit(false),
        props.fetchBosses()
      );
  };

  return (
    <div className={styles.modalEdit}>
      <form onSubmit={submitEditBoss}>
        <div className={styles.closeModalEdit}>
          <span
            onClick={() => props.onCloseEdit(false)}
            className={styles.spanXEdit}
          >
            X
          </span>
        </div>
        <div className={styles.h2Edit}>
          <h2>Edit Workers</h2>
        </div>
        <div className={styles.inputModalsEdit}>
          <input
            type="text"
            placeholder="Name"
            className={styles.nameEdit}
            ref={nameRefEditBoss}
            defaultValue={props.editBoss.Ime}
          />
          <div className={styles.errorLabel}>
            {errorName && nameRefEditBoss.current.value.length === 0 ? (
              <label>Field Name can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {errorName && nameRefEditBoss.current.value.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            placeholder="Surname"
            className={styles.surnameEdit}
            ref={surnameRefEditBoss}
            defaultValue={props.editBoss.Prezime}
          />
          <div className={styles.errorLabel}>
            {errorSurname && surnameRefEditBoss.current.value.length <= 0 ? (
              <label>Field Surname can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {errorSurname && surnameRefEditBoss.current.value.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>

          <input
            type="text"
            placeholder="Country"
            className={styles.countryEdit}
            ref={countryRefEditBoss}
            defaultValue={props.editBoss.Drzava}
          />
          <div className={styles.errorLabel}>
            {errorCountry && countryRefEditBoss.current.value.length <= 0 ? (
              <label>Field Country can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {errorCountry && countryRefEditBoss.current.value.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>

          <input
            type="text"
            placeholder="Salary"
            className={styles.salaryEdit}
            ref={salaryRefEditBoss}
            defaultValue={props.editBoss.Plata}
          />
          <div className={styles.errorLabel}>
            {errorSalary && salaryRefEditBoss.current.value.length <= 0 ? (
              <label>Field Salary can't be Empty</label>
            ) : (
              ""
            )}
          </div>

          <div className={styles.buttonsEdit}>
            <button className={styles.addEdit}>EDIT WORKER</button>

            <button
              className={styles.closeEdit}
              onClick={() => {
                props.onCloseEdit(false);
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const AddWorkers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalEditBoss
          onCloseEdit={props.onCloseEdit}
          editBoss={props.editBoss}
          fetchBosses={props.fetchBosses}
        ></ModalEditBoss>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default AddWorkers;
