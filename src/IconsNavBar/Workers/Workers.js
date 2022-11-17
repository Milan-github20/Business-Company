import React, { useEffect, useState } from "react";
import SearchBar from "../../SearchBar/SearchBar";
import ModalEdit from "./EditWorkers/EditWorkers";
import styles from "./workers.module.css";

const Workers = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [edit, setEdit] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

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
        alert("You have successfully deleted the worker!");
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
        <SearchBar fetchUsers={fetchUsers} />
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
            {items.map((item) => {
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
