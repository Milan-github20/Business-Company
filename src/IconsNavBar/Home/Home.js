import React from "react";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.div}>
      <h1>WELCOME TO BUSINESS COMPANY</h1>
      <div>
        <button>Workers</button>
        <button>Experts</button>
      </div>
    </div>
  );
};

export default Home;
