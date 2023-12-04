import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import loadingGif from "../../../assets/images/App/Theme/loading_logo.gif"; // Replace with the path to your GIF

import "../../../styles/components/common/loadingScreen/style.css";

const LoadingScreen = ({ isLoading }) => {
  const { t } = useTranslation();
  const [randomFact, setRandomFact] = useState("");

  useEffect(() => {
    // Load facts.json and set a random fact
    fetch("/data/facts.json")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomFact(data[randomIndex]);
      })
      .catch((error) => console.error("Error loading facts.json:", error));
  }, []);

  return (
    <div className={`loading-screen ${isLoading ? "visible" : ""}`}>
      <img src={loadingGif} alt="Loading" className="spin" />
      <div className="bouncing-text">
        <div className="bounceT bounceT-1">L</div>
        <div className="bounceT bounceT-2">O</div>
        <div className="bounceT bounceT-3">A</div>
        <div className="bounceT bounceT-4">D</div>
        <div className="bounceT bounceT-5">I</div>
        <div className="bounceT bounceT-6">N</div>
        <div className="bounceT bounceT-7">G</div>
        <div className="bounceT bounceT-8">.</div>
        <div className="bounceT bounceT-9">.</div>
        <div className="bounceT bounceT-10">.</div>
      </div>

      <div className="loading-hint"><b>{t('did_you_know')}: </b>{randomFact} </div>
    </div>
  );
};

export default LoadingScreen;
