import React, { useState } from "react";
import styles from "./navbarcomponent.module.css";
import Contact from "../IconsNavBar/Contact/Contact";
import Experts from "../IconsNavBar/Experts/Experts";
import Home from "../IconsNavBar/Home/Home";
import Info from "../IconsNavBar/Info/Info";
import Location from "../IconsNavBar/Location/Location";
import Workers from "../IconsNavBar/Workers/Workers";
import ButtonMenuNav from "../ButtonMenuNav/ButtonMenuNav";

const NavbarComponent = () => {
  const [items, setItems] = useState("HOME");

  const handleItems = (item) => {
    setItems(item);
  };

  return (
    <div className={styles.navBarGlavni}>
      <div className={styles.divOdvajanje}>
        <div className={styles.lijeva_strana_icon}>
          <img src="./images/list.png" alt="" className={styles.hamburger} />
          <ButtonMenuNav
            name={"HOME"}
            active={items}
            select={handleItems}
            className={styles.home_main}
          >
            <div className={styles.homeMain}>
              <img src="./images/team.png" alt="" className={styles.home} />
              <p className={styles.home_p}>Business Company</p>
            </div>
          </ButtonMenuNav>
        </div>
        <div className={styles.desna_strana_icon}>
          <ButtonMenuNav name={"Workers"} active={items} select={handleItems}>
            <img src="./images/users.png" alt="" />
            <p>Workers</p>
          </ButtonMenuNav>
          <ButtonMenuNav name={"Experts"} active={items} select={handleItems}>
            <img src="./images/diploma.png" alt="" />
            <p>Experts</p>
          </ButtonMenuNav>
          <ButtonMenuNav name={"Location"} active={items} select={handleItems}>
            <img src="./images/map-marker.png" alt="" />
            <p>Location</p>
          </ButtonMenuNav>
          <ButtonMenuNav name={"Contact"} active={items} select={handleItems}>
            <img src="./images/form.png" alt="" />
            <p>Contact</p>
          </ButtonMenuNav>
          <ButtonMenuNav name={"About us"} active={items} select={handleItems}>
            <img src="./images/info.png" alt="" />
            <p>About us</p>
          </ButtonMenuNav>
        </div>
      </div>
      <hr className={styles.horizontalna_linija} />
      <div>
        {items === "HOME" && <Home />}
        {items === "Workers" && <Workers />}
        {items === "Experts" && <Experts />}
        {items === "Location" && <Location />}
        {items === "Contact" && <Contact />}
        {items === "About us" && <Info />}
      </div>
    </div>
  );
};

export default NavbarComponent;
