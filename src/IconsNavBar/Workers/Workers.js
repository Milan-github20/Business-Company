import React, { useEffect, useState } from "react";
import ModalEdit from "./EditWorkers/EditWorkers";
import styles from "./workers.module.css";
import AddWorkers from "./AddWorkers/AddWorkers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Workers = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [edit, setEdit] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [workers, setWorkers] = useState(false);
  const [searchWorker, setSearchWorker] = useState("");

  const fetchUsers = () => {
    fetch("https://6363cc428a3337d9a2e85694.mockapi.io/API")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const editWorkers = (Ime, Prezime, Drzava, Posao, Plata, id) => {
    const data = {
      Ime: Ime,
      Prezime: Prezime,
      Drzava: Drzava,
      Posao: Posao,
      Plata: Plata,
      id: id,
    };

    setEdit(data);
    setIsEditing(true);
  };

  const deleteRow = (id, e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete the worker?")) {
      e.target.parentElement.parentElement.remove();
      fetch(`https://6363cc428a3337d9a2e85694.mockapi.io/API/${id}`, {
        method: "DELETE",
      }).then(() => {
        toast.success("You have successfully deleted the worker!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return;
  } else {
    return (
      <>
        <div className={styles.searchBarPocetna}>
          <div className={styles.searchBarLijevaStrana}>
            <input
              placeholder="Search..."
              onChange={(e) => setSearchWorker(e.target.value)}
            />
          </div>
          <div className={styles.p}>
            <p>WORKERS</p>
          </div>
          <div className={styles.searchBarDesnaStrana}>
            <img
              src="./images/user-add.png"
              alt=""
              className={styles.searchBarIcon}
              onClick={() => {
                setWorkers(true);
              }}
            />
          </div>
          <>
            {workers && (
              <AddWorkers onClose={setWorkers} fetchUsersEdit={fetchUsers} />
            )}
          </>
        </div>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Country</th>
              <th className={styles.posao}>Business</th>
              <th>Salary</th>
              <th className={styles.slika_prazno}></th>
              <th className={styles.slika_prazno}></th>
            </tr>
          </thead>
          <hr className={styles.horizontalna_linija} />
          <tbody className={styles.tijelo}>
            {items
              .filter((value) => {
                if (searchWorker === "") {
                  return value;
                } else if (
                  value.Ime.toLowerCase().includes(
                    searchWorker.trim().toLowerCase()
                  ) ||
                  value.Prezime.toLowerCase().includes(
                    searchWorker.trim().toLowerCase()
                  ) ||
                  value.Drzava.trim()
                    .toLowerCase()
                    .includes(searchWorker.trim().toLowerCase()) ||
                  value.Posao.trim()
                    .toLowerCase()
                    .includes(searchWorker.trim().toLowerCase())
                ) {
                  return value;
                }
              })
              .map((item) => {
                return (
                  <div key={item.id}>
                    <tr>
                      <th>{item.Ime}</th>
                      <th>{item.Prezime}</th>
                      <th>{item.Drzava}</th>
                      <th className={styles.posao}>{item.Posao}</th>
                      <th>$ {item.Plata}</th>
                      <th className={styles.slika_edit}>
                        <img
                          src="./images/edit.png"
                          alt=""
                          onClick={() => {
                            editWorkers(
                              item.Ime,
                              item.Prezime,
                              item.Drzava,
                              item.Posao,
                              item.Plata,
                              item.id
                            );
                            setOpenEdit(true);
                          }}
                        />
                        <img
                          src="./images/delete-user.png"
                          alt=""
                          onClick={(e) => {
                            deleteRow(item.id, e);
                          }}
                        />
                      </th>
                    </tr>
                  </div>
                );
              })}
          </tbody>
        </table>

        {openEdit && isEditing && (
          <ModalEdit
            onCloseEdit={setOpenEdit}
            fetchUsers={fetchUsers}
            items={items}
            edit={edit}
          />
        )}
      </>
    );
  }
};

export default Workers;
