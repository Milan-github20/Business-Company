import React from "react";
import styles from "./info.module.css";

const Info = () => {
  return (
    <div className={styles.div}>
      <div className={styles.div_div}>
        <div className={styles.div_div_div}>
          <div className={styles.page}>
            <h1>
              About <span className={styles.span}>Business</span> Company
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
              tempore accusamus quis magnam doloremque itaque ad modi, pariatur
              iste labore similique officiis impedit aspernatur aperiam facere
              architecto. Eligendi, repellendus inventore!
            </p>
            <ul className={styles.workersAndBoss}>
              <div className={styles.workers}>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Natus tempore accusamus quis magnam doloremque itaque ad modi,
                  pariatur iste labore
                </p>
              </div>
              <div className={styles.bosses}>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Natus tempore accusamus quis magnam doloremque itaque ad modi,
                  pariatur iste labore
                </p>
              </div>
            </ul>
            <div className={styles.network}>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src="./images/facebook.png" alt="" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src="./images/linkedin.png" alt="" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                <img src="./images/github.png" alt="" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                <img src="./images/instagram.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
