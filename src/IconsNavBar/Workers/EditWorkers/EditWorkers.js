import React, { useRef, useState } from "react";
import styles from "./editWorkers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BackDrop = () => {
  return <div className={styles.backdropEdit}></div>;
};

const ModalEdit = (props) => {
  const [errorName, setErrorName] = useState(false);
  const [errorSurname, setErrorSurname] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorBusiness, setErrorBusiness] = useState(false);
  const [errorSalary, setErrorSalary] = useState(false);

  const nameRefEdit = useRef();
  const surnameRefEdit = useRef();
  const countryRefEdit = useRef();
  const businessRefEdit = useRef();
  const salaryRefEdit = useRef();

  const submitEdit = (e) => {
    e.preventDefault();

    if (
      nameRefEdit.current.value.trim() === "" ||
      nameRefEdit.current.value.trim() === null ||
      nameRefEdit.current.value.trim().length <= 2
    ) {
      return setErrorName(true);
    }

    if (
      surnameRefEdit.current.value.trim() === "" ||
      surnameRefEdit.current.value.trim() === null ||
      surnameRefEdit.current.value.trim().length <= 2
    ) {
      return setErrorSurname(true);
    }

    if (
      countryRefEdit.current.value.trim() === "" ||
      countryRefEdit.current.value.trim() === null ||
      countryRefEdit.current.value.trim().length <= 2
    ) {
      return setErrorCountry(true);
    }
    if (
      businessRefEdit.current.value.trim() === "" ||
      businessRefEdit.current.value.trim() === null ||
      businessRefEdit.current.value.trim().length <= 2
    ) {
      return setErrorBusiness(true);
    }

    if (
      salaryRefEdit.current.value.trim() === "" ||
      salaryRefEdit.current.value.trim() === null
    ) {
      return setErrorSalary(true);
    }

    axios
      .put(`https://6363cc428a3337d9a2e85694.mockapi.io/API/${props.edit.id}`, {
        Ime: nameRefEdit.current.value,
        Prezime: surnameRefEdit.current.value,
        Drzava: countryRefEdit.current.value,
        Posao: businessRefEdit.current.value,
        Plata: parseFloat(salaryRefEdit.current.value).toFixed(2),
      })
      .then(
        props.onCloseEdit(false),
        props.fetchUsers(),
        toast.success("You have successfully edited the worker!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

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
          <div className={styles.errorLabel}>
            {errorName && nameRefEdit.current.value.length === 0 ? (
              <label>Field Name can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {errorName && nameRefEdit.current.value.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            placeholder="Surname"
            className={styles.surnameEdit}
            ref={surnameRefEdit}
            defaultValue={props.edit.Prezime}
          />
          <div className={styles.errorLabel}>
            {errorSurname && surnameRefEdit.current.value.length <= 0 ? (
              <label>Field Surname can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {errorSurname && surnameRefEdit.current.value.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            placeholder="Country"
            className={styles.countryEdit}
            ref={countryRefEdit}
            defaultValue={props.edit.Drzava}
          />
          <div className={styles.errorLabel}>
            {errorCountry && countryRefEdit.current.value.length <= 0 ? (
              <label>Field Country can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {errorCountry && countryRefEdit.current.value.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            placeholder="Business"
            className={styles.businessEdit}
            ref={businessRefEdit}
            defaultValue={props.edit.Posao}
          />
          <div className={styles.errorLabel}>
            {errorBusiness && businessRefEdit.current.value.length <= 0 ? (
              <label>Field Business can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {errorBusiness && businessRefEdit.current.value.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            placeholder="Salary"
            className={styles.salaryEdit}
            ref={salaryRefEdit}
            defaultValue={props.edit.Plata}
          />
          <div className={styles.errorLabel}>
            {errorSalary && salaryRefEdit.current.value.length <= 0 ? (
              <label>Field Salary can't be Empty</label>
            ) : (
              ""
            )}
          </div>

          <div className={styles.buttonsEdit}>
            <button className={styles.addEdit} onClick={submitEdit}>
              EDIT WORKER
            </button>

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
