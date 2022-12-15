import React, { useState, useEffect } from "react";
import styles from "./bosses.module.css";
import AddBosses from "./BossesAdd/AddBosses";
import ModalEditBoss from "./BossesEdit/EditBosses";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bosses = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bosses, setBosses] = useState(false);
  const [editBoss, setEditBoss] = useState([]);
  const [isEditingBoss, setIsEditingBoss] = useState(false);
  const [openEditBoss, setOpenEditBoss] = useState(false);
  const [searchBoss, setSearchBoss] = useState("");

  const fetchBosses = () => {
    fetch("https://6363cc428a3337d9a2e85694.mockapi.io/Bosses")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    fetchBosses();
  }, []);

  const editBosses = (Ime, Prezime, Drzava, Plata, id) => {
    const data = {
      Ime: Ime,
      Prezime: Prezime,
      Drzava: Drzava,
      Plata: Plata,
      id: id,
    };

    setEditBoss(data);
    setIsEditingBoss(true);
  };

  const deleteRowBosses = (id, e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete the Boss?")) {
      e.target.parentElement.parentElement.remove();
      fetch(`https://6363cc428a3337d9a2e85694.mockapi.io/Bosses/${id}`, {
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
              onChange={(e) => {
                setSearchBoss(e.target.value);
              }}
            />
          </div>
          <div className={styles.p}>
            <p>BOSSES</p>
          </div>
          <div className={styles.searchBarDesnaStrana}>
            <img
              src="./images/user-add.png"
              alt=""
              className={styles.searchBarIcon}
              onClick={() => {
                setBosses(true);
              }}
            />
          </div>
          <>
            {bosses && (
              <AddBosses onClose={setBosses} fetchBossesRefresh={fetchBosses} />
            )}
          </>
        </div>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Country</th>
              <th>Salary</th>
              <th className={styles.slika_prazno}></th>
            </tr>
            <hr className={styles.horizontalna_linija} />
          </thead>
          <tbody className={styles.tijelo}>
            {items
              .filter((value) => {
                if (searchBoss === "") {
                  return value;
                } else if (
                  value.Ime.toLowerCase().includes(
                    searchBoss.trim().toLowerCase()
                  ) ||
                  value.Prezime.toLowerCase().includes(
                    searchBoss.trim().toLowerCase()
                  ) ||
                  value.Drzava.toLowerCase().includes(
                    searchBoss.trim().toLowerCase()
                  )
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
                      <th>$ {item.Plata}</th>
                      <th className={styles.slika_edit}>
                        <img
                          src="./images/edit.png"
                          alt=""
                          onClick={() => {
                            editBosses(
                              item.Ime,
                              item.Prezime,
                              item.Drzava,
                              item.Plata,
                              item.id
                            );
                            setOpenEditBoss(true);
                          }}
                        />
                        <img
                          src="./images/delete-user.png"
                          alt=""
                          onClick={(e) => {
                            deleteRowBosses(item.id, e);
                          }}
                        />
                      </th>
                    </tr>
                  </div>
                );
              })}
          </tbody>
        </table>

        {openEditBoss && isEditingBoss && (
          <ModalEditBoss
            onCloseEdit={setOpenEditBoss}
            editBoss={editBoss}
            fetchBosses={fetchBosses}
          />
        )}
      </>
    );
  }
};

export default Bosses;
