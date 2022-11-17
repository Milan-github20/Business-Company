import React, { useState } from "react";
import AddWorkers from "../IconsNavBar/Workers/AddWorkers/AddWorkers";
import styles from "./searchbar.module.css";

const SearchBar = (props) => {
  const [workers, setWorkers] = useState(false);

  return (
    <div className={styles.searchBarPocetna}>
      <div className={styles.searchBarLijevaStrana}>
        <input
          placeholder="Search..."
          // onChange={props.handleSearchWorkers}
          // value={props.items}
        />
        <button src="./images/search.png" alt="" onClick={props.search}>
          Search
        </button>
      </div>
      <div className={styles.p}>
        <p>- WORKERS -</p>
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
          <AddWorkers onClose={setWorkers} fetchUsersEdit={props.fetchUsers} />
        )}
      </>
    </div>
  );
};

export default SearchBar;
