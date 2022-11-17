import React, { useRef, useState } from "react";
import styles from "./addWorkers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalAdd = (props) => {
  const nameRefAdd = useRef();
  const surnameRefAdd = useRef();
  const countryRefAdd = useRef();
  const businessRefAdd = useRef();
  const salaryRefAdd = useRef();

  const [data, setData] = useState({
    Name: "",
    Surname: "",
    Country: "",
    Business: "",
    Salary: "",
  });

  const submit = (e) => {
    e.preventDefault();

    axios
      .post("https://6363cc428a3337d9a2e85694.mockapi.io/API", {
        Ime: nameRefAdd.current.value,
        Prezime: surnameRefAdd.current.value,
        Drzava: countryRefAdd.current.value,
        Posao: businessRefAdd.current.value,
        Plata: parseFloat(salaryRefAdd.current.value).toFixed(2),
      })
      .then((res) => {
        alert("daa");
        props.onClose(false);
        props.fetchUsersAdd();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleWorker = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={(e) => submit(e)}>
        <div className={styles.closeModal}>
          <span onClick={() => props.onClose(false)} className={styles.spanX}>
            X
          </span>
        </div>
        <div className={styles.h2}>
          <h2>Add Workers</h2>
        </div>
        <div className={styles.inputModals} name="myForm">
          <input
            name="fname"
            onChange={(e) => handleWorker(e)}
            type="text"
            ref={nameRefAdd}
            id="Name"
            value={data.Name}
            placeholder="Name"
            className={styles.name}
          />
          <input
            onChange={(e) => handleWorker(e)}
            type="text"
            ref={surnameRefAdd}
            id="Surname"
            value={data.Surname}
            placeholder="Surname"
            className={styles.surname}
          />
          <input
            onChange={(e) => handleWorker(e)}
            type="text"
            ref={countryRefAdd}
            id="Country"
            value={data.Country}
            placeholder="Country"
            className={styles.country}
          />
          <input
            onChange={(e) => handleWorker(e)}
            type="text"
            ref={businessRefAdd}
            id="Business"
            value={data.Business}
            placeholder="Business"
            className={styles.business}
          />
          <input
            onChange={(e) => handleWorker(e)}
            type="text"
            ref={salaryRefAdd}
            id="Salary"
            value={data.Salary}
            placeholder="Salary"
            className={styles.salary}
          />

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

const AddWorkers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalAdd
          onClose={props.onClose}
          fetchUsersAdd={props.fetchUsersEdit}
        ></ModalAdd>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default AddWorkers;
