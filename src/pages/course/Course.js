import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../styles/pages/Course/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlay } from "@fortawesome/free-solid-svg-icons";

const Course = () => {
  const [lessonsList, setLessonsList] = useState([]);

  const handleClick = () => {
    const socket = io("http://localhost:8085");
    // Connect to the Socket.IO server

    // Emit a custom event to the server
    socket.emit("client-message", "Hello from the client!");

    // Event listener for a custom event from the server
    socket.on("server-message", (message) => {
      console.log("Received message from server:", message);
    });
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Search triggered");
  };

  useEffect(() => {
    fetch("/data/lessons.json")
      .then((response) => response.json())
      .then((data) => {
        setLessonsList(data);
      })
      .catch((error) => console.log("Error loading cities data list :", error));
  }, []);

  return (
    <div id="course-section">
      <div className="course-search-bar">
        <select className="course-select">
          <option value="0">Tất cả</option>
          <option value="1">Lớp 1</option>
          <option value="2">Lớp 2</option>
          <option value="3">Lớp 3</option>
          <option value="4">Lớp 4</option>
        </select>
        <div className="courses-search-input-container">
          <input
            type="text"
            placeholder="Search..."
            className="course-search-input"
            onChange={handleSearch}
          />
          <button className="course-search-button" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} size={"xl"}></FontAwesomeIcon>
          </button>
        </div>
      </div>

      <div className="realtime-number-user">
        <span>
          Hiện tại đang có <b>41</b> người đang trực tuyến
        </span>
      </div>

      <div className="course-body">
        <div className="done-courses course-collection">
          <div className="course-title">Bài đã làm</div>
          <div className="course-slides">
            <Swiper
              navigation={true}
              pagination={{ clickable: true }}
              grabCursor={true}
              modules={[Navigation, Pagination]}
              className="course-swiper"
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
            >
              {lessonsList.map((result, index) => (
                <SwiperSlide key={index}>
                  <div className="lesson-item">
                    <div className="lesson-image">
                      <div className="image">
                        <img src=""></img>
                      </div>
                      <div className="lesson-title">{result.name}</div>
                    </div>
                    <div className="lesson-info-container">
                      <div className="lesson-info">
                        <div className="">
                          <span className="label">Duration</span>
                          <span className="value">{result.duration}</span>
                        </div>
                        <div className="">
                          <span className="label">Questions</span>
                          <span className="value">{result.questionCount}</span>
                        </div>
                        <div className="">
                          <span className="label">Level</span>
                          <span className="value">{result.difficulty}</span>
                        </div>
                      </div>
                      <div className="lesson-play-btn">
                        <FontAwesomeIcon
                          icon={faPlay}
                          size={"xl"}
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
