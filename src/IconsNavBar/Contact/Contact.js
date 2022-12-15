import React, { useRef } from "react";
import styles from "./contact.module.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qzup2lp",
        "template_iviwin5",
        form.current,
        "8yoJTAbI5xylbkmcY"
      )
      .then(
        () => {
          toast("You have successfully sent your email!");
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className={styles.div}>
      <div className={styles.div_main}>
        <div className={styles.directions}>
          <div>
            <div className={styles.leftSide_h2}>
              <h2>Directions</h2>
            </div>
            <div className={styles.leftSide}>
              <div>
                <iframe
                  className={styles.maps}
                  title="myFrame"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=London&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                ></iframe>
              </div>
              <p className={styles.p_maps}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
        </div>

        <div className={styles.get_in_touch}>
          <h2>Get in touch!</h2>

          <form ref={form} onSubmit={sendEmail}>
            <div className={styles.name_number}>
              <input
                required
                className={styles.name_name}
                placeholder="Enter your Name"
                type="text"
                name="user_name"
              />
              <input
                required
                className={styles.number_number}
                placeholder="Enter your Last Name"
                type="text"
                name="user_surname"
              />
            </div>
            <div className={styles.inputFields}>
              <input
                required
                className={styles.input}
                placeholder="Enter a valid email adress"
                type="email"
                name="user_email"
              />
              <textarea
                placeholder="Enter a message"
                type="text"
                required
                name="message"
              />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Business Company</p>
        <p>© 2022. Business Company. All rights reserved.</p>
        <p>Terms of use. Data privacy.</p>
      </div>
    </div>
  );
};

export default Contact;
