import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LoadingScreen from "../common/loadingScreen/LoadingScreen";

import nfImage from "../../assets/images/NotFound/nf_image.png"; // Replace with the path to your GIF

const Missing = () => {
  const { t } = useTranslation();

  return (
    <>
      <section
        className="not-found-section"
        style={{
          position: "absolute",
          top: "0",
          padding: "30px 100px 100px",
          width: "100vw",
          height: "100vh",
          background: "var(--nightColor)",
          display: "flex",
          justifyItems: "center",
        }}
      >
        <div
          className="nf-section-left"
          style={{ width: "100%", height: "100%" }}
        >
          <Link to="/">
          <h1 style={{ color: "var(--thirdColor)", fontSize: "1.5rem" }}>
            MCode
          </h1>
          </Link>
          <h2
            style={{
              fontSize: "5rem",
              fontWeight: "bold",
              color: "var(--nightTextColor)",
              margin: "12vh 0px",
            }}
          >
            Oops!
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--textColor)",
              marginBottom: "10vh",
            }}
          >
            {t("not_found_description")}
          </p>
          <div className="flexGrow">
            <Link to="/" className="form-register-link">
              <button
                className="btn secondary-btn "
                style={{ backgroundColor: "var(--nightColor)", ':after' : {backgroundColor: "var(--nightTextColor)"} }}
              >
                {t("get_back_home")}
              </button>
            </Link>
          </div>
        </div>
        <div
          className="nf-section-right"
          style={{ width: "100%", height: "100%" }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <img style={{ width: "100%", height: "100%" }} src={nfImage}></img>
          </div>
        </div>
      </section>
    </>
  );
};

export default Missing;
