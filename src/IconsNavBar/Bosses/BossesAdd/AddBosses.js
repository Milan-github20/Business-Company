import React, { useState, useRef } from "react";
import styles from "./addBosses.module.css";
import ReactDOM from "react-dom";
import axios from "axios";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalAddBosses = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState(false);

  const nameRefAddBosses = useRef();
  const surnameRefAddBosses = useRef();
  const countryRefAddBosses = useRef();
  const salaryRefAddBosses = useRef();

  const submitAddBosses = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      name.trim() === null ||
      surname.trim() === "" ||
      surname.trim() === null ||
      country.trim() === "" ||
      country.trim() === null ||
      salary.trim() === "" ||
      salary.trim() === null
    ) {
      return setError(true);
    }

    if (
      name.trim().length <= 2 ||
      surname.trim().length <= 2 ||
      country.trim().length <= 2
    ) {
      return setError(true);
    }

    axios
      .post("https://6363cc428a3337d9a2e85694.mockapi.io/Bosses", {
        Ime: nameRefAddBosses.current.value,
        Prezime: surnameRefAddBosses.current.value,
        Drzava: countryRefAddBosses.current.value,
        Plata: parseFloat(salaryRefAddBosses.current.value).toFixed(2),
      })
      .then(() => {
        alert("Daa");
        props.onClose(false);
        props.fetchBossesRefreshAdd();
      });
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={(e) => submitAddBosses(e)}>
        <div className={styles.closeModal}>
          <span onClick={() => props.onClose(false)} className={styles.spanX}>
            X
          </span>
        </div>
        <div className={styles.h2}>
          <h2>Add Workers</h2>
        </div>
        <div className={styles.inputModals}>
          <input
            type="text"
            id="Name"
            ref={nameRefAddBosses}
            placeholder="Name"
            className={styles.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className={styles.errorLabel}>
            {error && name.length === 0 ? (
              <label>Field Name can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {error && name.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>

          <input
            type="text"
            id="Surname"
            placeholder="Surname"
            ref={surnameRefAddBosses}
            className={styles.surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <div className={styles.errorLabel}>
            {error && surname.length === 0 ? (
              <label>Field Surname can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {error && surname.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            id="Country"
            placeholder="Country"
            ref={countryRefAddBosses}
            className={styles.country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <div className={styles.errorLabel}>
            {error && country.length === 0 ? (
              <label>Field Country can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {error && country.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>
          <input
            type="number"
            id="Salary"
            placeholder="Salary"
            ref={salaryRefAddBosses}
            className={styles.salary}
            onChange={(e) => {
              setSalary(e.target.value);
            }}
          />
          <div className={styles.errorLabel}>
            {error && salary.length === 0 ? (
              <label>Field Salary can't be Empty</label>
            ) : (
              ""
            )}
          </div>

          <div className={styles.buttons}>
            <button className={styles.add}>ADD WORKER</button>
            <button
              className={styles.close}
              onClick={() => {
                props.onClose(false);
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

const AddBosses = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalAddBosses
          onClose={props.onClose}
          fetchBossesRefreshAdd={props.fetchBossesRefresh}
        ></ModalAddBosses>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default AddBosses;
