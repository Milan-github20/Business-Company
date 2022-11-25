import React from "react";
import styles from "./home.module.css";

const Home = (props) => {
  return (
    <div className={styles.div}>
      <div className={styles.div_div}>
        <div className={styles.div_div_div}>
          <h1>
            Welcome to <span className={styles.span}>BUSINESS</span> COMPANY
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
            tempore accusamus quis magnam doloremque itaque ad modi, pariatur
            iste labore similique officiis impedit aspernatur aperiam facere
            architecto. Eligendi, repellendus inventore!
          </p>
          <div className={styles.workersAndBoss}>
            <div className={styles.workers}>
              <img src="./images/people.png" alt="" />
              <p>More than 50 Workers</p>
            </div>
            <div className={styles.bosses}>
              <img src="./images/diplomaHome.png" alt="" />
              <p>More than 20 Bosses</p>
            </div>
            <a>
              <button className={styles.btn}>About us</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
