import React, { useRef } from "react";
import styles from "./editWorkers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";

const BackDrop = () => {
  return <div className={styles.backdropEdit}></div>;
};

const ModalEdit = (props) => {
  const nameRefEdit = useRef();
  const surnameRefEdit = useRef();
  const countryRefEdit = useRef();
  const businessRefEdit = useRef();
  const salaryRefEdit = useRef();

  const submitEdit = (e) => {
    axios
      .put(`https://6363cc428a3337d9a2e85694.mockapi.io/API/${props.edit.id}`, {
        Ime: nameRefEdit.current.value,
        Prezime: surnameRefEdit.current.value,
        Drzava: countryRefEdit.current.value,
        Posao: businessRefEdit.current.value,
        Plata: parseFloat(salaryRefEdit.current.value).toFixed(2),
      })
      .then(
        alert("You have successfully edited the worker!"),
        props.onCloseEdit(false),
        props.fetchUsers()
      );
  };

  //   useEffect(() => {
  //     submitEdit();
  //   });

  return (
    <div className={styles.modalEdit}>
      <form onSubmit={submitEdit}>
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
            ref={nameRefEdit}
            defaultValue={props.edit.Ime}
          />
          <input
            type="text"
            placeholder="Surname"
            className={styles.surnameEdit}
            ref={surnameRefEdit}
            defaultValue={props.edit.Prezime}
          />
          <input
            type="text"
            placeholder="Country"
            className={styles.countryEdit}
            ref={countryRefEdit}
            defaultValue={props.edit.Drzava}
          />
          <input
            type="text"
            placeholder="Business"
            className={styles.businessEdit}
            ref={businessRefEdit}
            defaultValue={props.edit.Posao}
          />
          <input
            type="text"
            placeholder="Salary"
            className={styles.salaryEdit}
            ref={salaryRefEdit}
            defaultValue={props.edit.Plata}
          />

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
        <ModalEdit
          onCloseEdit={props.onCloseEdit}
          fetchUsers={props.fetchUsers}
          edit={props.edit}
        ></ModalEdit>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default AddWorkers;
