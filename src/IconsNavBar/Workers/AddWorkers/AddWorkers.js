import React, { useRef, useState } from "react";
import styles from "./addWorkers.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BackDrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalAdd = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [business, setBusiness] = useState("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState(false);

  const nameRefAdd = useRef();
  const surnameRefAdd = useRef();
  const countryRefAdd = useRef();
  const businessRefAdd = useRef();
  const salaryRefAdd = useRef();

  //NE TREBA
  //   const [data, setData] = useState({
  //     Name: "",
  //     Surname: "",
  //     Country: "",
  //     Business: "",
  //     Salary: "",
  //   });

  const submit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      name.trim() === null ||
      surname.trim() === "" ||
      surname.trim() === null ||
      country.trim() === "" ||
      country.trim() === null ||
      business.trim() === "" ||
      business.trim() === null ||
      salary.trim() === "" ||
      salary.trim() === null
    ) {
      return setError(true);
    }

    if (
      name.trim().length <= 2 ||
      surname.trim().length <= 2 ||
      country.trim().length <= 2 ||
      business.trim().length <= 2
    ) {
      return setError(true);
    }
    axios
      .post("https://6363cc428a3337d9a2e85694.mockapi.io/API", {
        Ime: nameRefAdd.current.value,
        Prezime: surnameRefAdd.current.value,
        Drzava: countryRefAdd.current.value,
        Posao: businessRefAdd.current.value,
        Plata: parseFloat(salaryRefAdd.current.value).toFixed(2),
      })
      .then((res) => {
        toast.success("You have successfully added a worker!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        props.onClose(false);
        props.fetchUsersAdd();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //NE TREBA
  //   const handleWorker = (e) => {
  //     const newdata = { ...data };
  //     newdata[e.target.id] = e.target.value;
  //     setData(newdata);
  //   };

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
        <div className={styles.inputModals}>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            ref={nameRefAdd}
            id="Name"
            // value={data.Name}
            placeholder="Name"
            className={styles.name}
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
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            ref={surnameRefAdd}
            id="Surname"
            // value={data.Surname}
            placeholder="Surname"
            className={styles.surname}
          />
          <div className={styles.errorLabel}>
            {error && surname.length <= 0 ? (
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
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            ref={countryRefAdd}
            id="Country"
            // value={data.Country}
            placeholder="Country"
            className={styles.country}
          />
          <div className={styles.errorLabel}>
            {error && country.length <= 0 ? (
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
            onChange={(e) => setBusiness(e.target.value)}
            type="text"
            ref={businessRefAdd}
            id="Business"
            // value={data.Business}
            placeholder="Business"
            className={styles.business}
          />
          <div className={styles.errorLabel}>
            {error && business.length <= 0 ? (
              <label>Field Business can't be Empty</label>
            ) : (
              ""
            )}
          </div>
          <div className={styles.errorLabel}>
            {error && business.length <= 2 ? (
              <label>Enter more than 2 characters</label>
            ) : (
              ""
            )}
          </div>
          <input
            onChange={(e) => setSalary(e.target.value)}
            type="number"
            ref={salaryRefAdd}
            id="Salary"
            // value={data.Salary}
            placeholder="Salary"
            className={styles.salary}
          />
          <div className={styles.errorLabel}>
            {error && salary.length <= 0 ? (
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
