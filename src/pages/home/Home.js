import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Modal from "../../components/common/modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

import "../../styles/pages/Home/style.css";

import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/common/languageSwitcher/LanguageSwitcher";

import pic1 from "../../assets/images/App/Theme/p1_homepage.png";

const Home = () => {
  const { t } = useTranslation();
  const { auth, setAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const clickLogOut = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    logout();
    navigate("/");
  };

  return (
    <section id="home-section">
      <div id="home-section-header">
        {/* {auth.username ? (
          <>
            {" "}
            <h1>{t("hello")}</h1>{" "}
            <p>
              {t("welcome_back")}, <b>{auth.username}</b>
            </p>{" "}
          </>
        ) : (
          <p>{t("welcome_to_app")}</p>
        )} */}
        {/* <Modal /> */}
        <div></div>
        <LanguageSwitcher></LanguageSwitcher>
      </div>
      <div id="home-section-body">
        <div className="hs-body-left">
          <div className="hsb-content">
            <div className="hsb-title">{t("home_title")}!</div>
            <div className="hsb-description">{t("home_description")}.</div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "20px",
                marginTop: "30px",
              }}
            >
              <div className="btn">{t("start_now")}</div>
              <a href="https://youtu.be/mWjHgX2SPbU" target="_blank">
                <div
                  style={{
                    marginTop: "10px",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                   color: "var(--grayColor)"
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCirclePlay}
                    size={"lg"}
                    style={{ marginRight: "10px",color: "var(--grayColor)" }}
                    
                  />
                  <span>{t("watch_video")}</span>
                </div>
              </a>
            </div>
          </div>
          <div className="hsb-image">
            <img src={pic1}></img>
          </div>
        </div>
        <div className="hs-body-right"></div>
      </div>
    </section>
  );
};

export default Home;
