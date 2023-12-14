import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPaperPlane,
  faGear,
  faFileLines,
  faPause,
  faPlay,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
  Category,
} from "../../components/BlocklyComponent";
import Modal from "../../components/common/modal/Modal";

import "../../styles/pages/Exam/style.css";

const Exam = () => {
  const navigate = useNavigate();
  const exitModalContent = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      Bạn có muốn thoát trong khi làm bài, bài làm vẫn tiếp tục tính thời gian
      và kết quả sẽ vẫn lưu đấy.
    </div>
  );

  const questionsList = [
    {
      index: 0,
      id: 1,
      question:
        "An có 1 số búp bê. Số búp bê của AN nhiều gấp 3 lần búp bê của Bình. Bình có 5 búp bê. Hỏi cả hai bạn có bao nhiêu búp bê?",
    },
    {
      index: 1,
      id: 2,
      question:
        "Nếu có 5 quả táo và bạn lấy đi 2 quả, bạn còn lại bao nhiêu quả?",
    },
    { index: 2, id: 3, question: "Gấp 6 lần 8 bằng bao nhiêu?" },
    {
      index: 3,
      id: 4,
      question:
        "Nếu bạn có 3/4 cái bánh và bạn ăn mất 1/2, bạn còn lại bao nhiêu?",
    },
    {
      index: 4,
      id: 5,
      question:
        "Tính diện tích của hình chữ nhật có chiều dài là 7 và chiều rộng là 9.",
    },
    {
      index: 5,
      id: 6,
      question:
        "Nếu có 10 viên bi và bạn chia đều cho 2 người bạn, mỗi người sẽ nhận được bao nhiêu viên?",
    },
    { index: 6, id: 7, question: "Gấp 9 lần 3 bằng bao nhiêu?" },
    {
      index: 7,
      id: 8,
      question:
        "Nếu bạn có 15 viên kẹo và bạn chia đều cho 3 bạn, mỗi bạn sẽ nhận được bao nhiêu viên kẹo?",
    },
    { index: 8, id: 9, question: "Tính tổng 8 + 6 là bao nhiêu?" },
    {
      index: 9,
      id: 10,
      question:
        "Nếu có 12 quả cam và bạn cho đi 3 quả, bạn còn lại bao nhiêu quả?",
    },
    { index: 10, id: 11, question: "Gấp 5 lần 7 bằng bao nhiêu?" },
    {
      index: 11,
      id: 12,
      question:
        "Nếu bạn có 2/3 cái bánh và bạn ăn mất 1/3, bạn còn lại bao nhiêu?",
    },
    {
      index: 12,
      id: 13,
      question:
        "Tính diện tích của hình chữ nhật có chiều dài là 10 và chiều rộng là 4.",
    },
    {
      index: 13,
      id: 14,
      question:
        "Nếu có 8 viên bi và bạn chia đều cho 4 người bạn, mỗi người sẽ nhận được bao nhiêu viên?",
    },
    { index: 14, id: 15, question: "Gấp 4 lần 9 bằng bao nhiêu?" },
    {
      index: 15,
      id: 16,
      question:
        "Nếu bạn có 20 viên kẹo và bạn chia đều cho 5 bạn, mỗi bạn sẽ nhận được bao nhiêu viên kẹo?",
    },
    { index: 16, id: 17, question: "Tính tổng 7 + 5 là bao nhiêu?" },
    {
      index: 17,
      id: 18,
      question:
        "Nếu có 9 quả táo và bạn cho đi 4 quả, bạn còn lại bao nhiêu quả?",
    },
    { index: 18, id: 19, question: "Gấp 8 lần 2 bằng bao nhiêu?" },
    {
      index: 19,
      id: 20,
      question:
        "Nếu bạn có 1/2 cái bánh và bạn ăn mất 1/4, bạn còn lại bao nhiêu?",
    },
    {
      index: 20,
      id: 21,
      question:
        "Tính diện tích của hình chữ nhật có chiều dài là 6 và chiều rộng là 8.",
    },
    {
      index: 21,
      id: 22,
      question:
        "Nếu có 15 viên bi và bạn chia đều cho 3 người bạn, mỗi người sẽ nhận được bao nhiêu viên?",
    },
    { index: 22, id: 23, question: "Gấp 7 lần 4 bằng bao nhiêu?" },
    {
      index: 23,
      id: 24,
      question:
        "Nếu bạn có 25 viên kẹo và bạn chia đều cho 5 bạn, mỗi bạn sẽ nhận được bao nhiêu viên kẹo?",
    },
    { index: 24, id: 25, question: "Tính tổng 6 + 9 là bao nhiêu?" },
    {
      index: 25,
      id: 26,
      question:
        "Nếu có 7 quả cam và bạn cho đi 2 quả, bạn còn lại bao nhiêu quả?",
    },
    { index: 26, id: 27, question: "Gấp 6 lần 5 bằng bao nhiêu?" },
    {
      index: 27,
      id: 28,
      question:
        "Nếu bạn có 1/3 cái bánh và bạn ăn mất 1/6, bạn còn lại bao nhiêu?",
    },
    {
      index: 28,
      id: 29,
      question:
        "Tính diện tích của hình chữ nhật có chiều dài là 9 và chiều rộng là 3.",
    },
    {
      index: 29,
      id: 30,
      question:
        "Nếu có 20 viên bi và bạn chia đều cho 4 người bạn, mỗi người sẽ nhận được bao nhiêu viên?",
    },
    { index: 30, id: 31, question: "Gấp 3 lần 8 bằng bao nhiêu?" },
    {
      index: 31,
      id: 32,
      question:
        "Nếu bạn có 30 viên kẹo và bạn chia đều cho 6 bạn, mỗi bạn sẽ nhận được bao nhiêu viên kẹo?",
    },
    { index: 32, id: 33, question: "Tính tổng 4 + 7 là bao nhiêu?" },
    {
      index: 33,
      id: 34,
      question:
        "Nếu có 10 quả táo và bạn cho đi 5 quả, bạn còn lại bao nhiêu quả?",
    },
    { index: 34, id: 35, question: "Gấp 9 lần 2 bằng bao nhiêu?" },
    {
      index: 35,
      id: 36,
      question:
        "Nếu bạn có 2/5 cái bánh và bạn ăn mất 1/5, bạn còn lại bao nhiêu?",
    },
    {
      index: 36,
      id: 37,
      question:
        "Tính diện tích của hình chữ nhật có chiều dài là 5 và chiều rộng là 7.",
    },
    {
      index: 37,
      id: 38,
      question:
        "Nếu có 12 viên bi và bạn chia đều cho 6 người bạn, mỗi người sẽ nhận được bao nhiêu viên?",
    },
    { index: 38, id: 39, question: "Gấp 4 lần 6 bằng bao nhiêu?" },
    {
      index: 39,
      id: 40,
      question:
        "Nếu bạn có 18 viên kẹo và bạn chia đều cho 3 bạn, mỗi bạn sẽ nhận được bao nhiêu viên kẹo?",
    },
  ];

  const [showExitModal, setShowExitModal] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questionsList[0]);
  const timestamp = 1791847648569;

  const getTimeRemaining = (targetTime) => {
    const now = new Date().getTime();
    const difference = targetTime - now;
    if (difference <= 0) {
      // Timer has expired
      return { hours: "00", minutes: "00", seconds: "00" };
    }

    const hours = (
      "0" + Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ).slice(-2);
    const minutes = (
      "0" + Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    ).slice(-2);
    const seconds = ("0" + Math.floor((difference % (1000 * 60)) / 1000)).slice(
      -2
    );

    return { hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(timestamp));

  const toggleTab = (tabName) => {
    if (tabName === "question") {
      setShowQuestions(true);
      setShowCode(false);
    } else if (tabName === "code") {
      setShowQuestions(false);
      setShowCode(true);
    }
    // Add more conditions if you have additional tabs
  };

  const onClickQuestionItem = (index) => {
    setCurrentQuestion(questionsList[index]);
  };

  const onConfirmExit = () => {
    navigate("/courses");
  };

  // vấn đề ở đây là nó re-render cái này mà sao cái blockly nó cũng bị render lại --> fix gấp :>
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTimeLeft(getTimeRemaining(timestamp));
  //   }, 1000);

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(intervalId);
  // });

  const blocklyWorkSpace = (
    <>
      <BlocklyComponent
        readOnly={false}
        trashcan={true}
        // media={"media/"}
        move={{
          scrollbars: true,
          drag: true,
          wheel: true,
        }}
        //         initialXml={`
        // <xml xmlns="http://www.w3.org/1999/xhtml">
        // <block type="controls_ifelse" x="0" y="0"></block>
        // </xml>
        //       `}
      >
        {/* <Block type="test_react_field" />
        <Block type="test_react_date_field" /> */}
        <Category name="Logic" colour="%{BKY_LOGIC_HUE}">
          <Block type="controls_ifelse" />
          <Block type="logic_compare" />
          <Block type="logic_operation" />
          <Block type="logic_negate" />
        </Category>
        <Category name="Loops" colour="%{BKY_LOOPS_HUE}">
          <Block type="controls_repeat_ext">
            <Value name="TIMES">
              <Shadow type="math_number">
                <Field name="NUM">10</Field>
              </Shadow>
            </Value>
          </Block>
        </Category>
        <Block type="text_charAt">
          <Value name="VALUE">
            <Block type="variables_get">
              <Field name="VAR">text</Field>
            </Block>
          </Value>
        </Block>
      </BlocklyComponent>
      ;
    </>
  );

  return (
    <>
      <div id="exam-section-header">
        <div style={{ display: "flex", gap: "15px", width: "100%" }}>
          <div>
            <span style={{ marginRight: "8px" }}>
              <FontAwesomeIcon icon={faFileLines} />
            </span>
            <span>Tệp</span>
          </div>
          <div>
            <span style={{ marginRight: "8px" }}>
              <FontAwesomeIcon icon={faGear} />
            </span>
            <span>Cài đặt</span>
          </div>
        </div>
        <div style={{ flexGrown: "1", width: "100%" }}></div>
        <div>
          <button
            onClick={() => {
              setShowExitModal(true);
            }}
            className="circle-close-btn"
          ></button>
        </div>
      </div>
      <div id="exam-section-body">
        <div id="exam-s-b-header">
          <div>
            <button className="btn success-btn">
              <span style={{ marginRight: "8px" }}>
                {" "}
                <FontAwesomeIcon icon={faPaperPlane} />
              </span>
              Nộp Bài
            </button>
          </div>
          <div className="time-remain-container">
            <div>
              <span style={{ marginRight: "8px" }}>
                {" "}
                <FontAwesomeIcon icon={faClock} />
              </span>
              <span>Thời gian còn lại</span>
            </div>
            <div>
              <div className="time-box-container">
                <div className="time-box">
                  <span className="tb-number">{timeLeft.hours}</span>
                  <span className="tb-text">Giờ</span>
                </div>
                <div className="time-box">
                  <span className="tb-number">{timeLeft.minutes}</span>
                  <span className="tb-text">Phút</span>
                </div>
                <div className="time-box">
                  <span className="tb-number">{timeLeft.seconds}</span>
                  <span className="tb-text">Giây</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="exam-s-b-body">
          {/* left part */}
          <div id="exam-s-b-b-left">
            <div id="question-container">
              <div className="question-box">
                <span>
                  <b>Câu {currentQuestion.index + 1}: </b>
                  {currentQuestion.question}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "6px",
                  paddingTop: "8px",
                }}
              >
                <div id="answer-box">Your Answer: </div>
                <button className="btn" style={{ marginRight: "6px" }}>
                  <span style={{ marginRight: "8px" }}>
                    <FontAwesomeIcon
                      icon={faPause}
                      size={"xl"}
                    ></FontAwesomeIcon>
                  </span>
                  <span>Tạm dừng</span>
                </button>
                <button className="btn">
                  <FontAwesomeIcon
                    icon={faLeftLong}
                    size={"xl"}
                  ></FontAwesomeIcon>
                </button>
                <button className="btn">
                  <FontAwesomeIcon
                    icon={faRightLong}
                    size={"xl"}
                  ></FontAwesomeIcon>
                </button>
              </div>
            </div>
            <div id="control-panel-container">
              <div className="tabs-container">
                <div
                  className={`tab ${showQuestions ? "tab-active" : ""}`}
                  id="question-tab"
                  onClick={() => {
                    toggleTab("question");
                  }}
                >
                  Câu hỏi
                </div>
                <div
                  className={`tab ${showCode ? "tab-active" : ""}`}
                  id="code-tab"
                  onClick={() => {
                    toggleTab("code");
                  }}
                >
                  Code
                </div>
              </div>
              <div className="panels-container">
                {showQuestions && (
                  <div id="question-panel">
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
                    >
                      {questionsList.map((q) => (
                        <div
                          onClick={() => {
                            onClickQuestionItem(q.index);
                          }}
                          key={q.id}
                          className={`question-item ${
                            currentQuestion.index === q.index ? "selected" : ""
                          }`}
                        >
                          <b>{q.id}.</b>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {showCode && <div id="code-panel">Code Panel</div>}
              </div>
            </div>
          </div>
          {/* right part */}
          <div id="exam-s-b-b-right">
            <div id="blockly-workspace">
              <div style={{ position: "relative", height: "100%" }}>
                {blocklyWorkSpace}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isVisible={showExitModal}
        setIsVisible={setShowExitModal}
        title={"Exit confirm"}
        onYes={onConfirmExit}
      >
        {exitModalContent}
      </Modal>
    </>
  );
};

// {/* <BlocklyComponent
//   readOnly={false}
//   trashcan={true}
//   // media={"media/"}
//   move={{
//     scrollbars: true,
//     drag: true,
//     wheel: true,
//   }}
//   //         initialXml={`
//   // <xml xmlns="http://www.w3.org/1999/xhtml">
//   // <block type="controls_ifelse" x="0" y="0"></block>
//   // </xml>
//   //       `}
// >
//   {/* <Block type="test_react_field" />
//         <Block type="test_react_date_field" /> */}
//   <Category name="Logic" colour="%{BKY_LOGIC_HUE}">
//     <Block type="controls_ifelse" />
//     <Block type="logic_compare" />
//     <Block type="logic_operation" />
//     <Block type="logic_negate" />
//   </Category>
//   <Category name="Loops" colour="%{BKY_LOOPS_HUE}">
//     <Block type="controls_repeat_ext">
//       <Value name="TIMES">
//         <Shadow type="math_number">
//           <Field name="NUM">10</Field>
//         </Shadow>
//       </Value>
//     </Block>
//   </Category>
//   <Block type="text_charAt">
//     <Value name="VALUE">
//       <Block type="variables_get">
//         <Field name="VAR">text</Field>
//       </Block>
//     </Value>
//   </Block>
// </BlocklyComponent>; */}

export default Exam;
