import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import styles from "../../styles/components/Register/style.css";

// images
import bgInside from "../../assets/images/Register/background_inside.png";
// import bg from "../../assets/images/Register/background.png";
import rcImage from "../../assets/images/Register/monkey_congratulation.png";
import Checkbox from "../common/checkbox/CheckBox";

const NAME_REGEX = /^[\p{L} ]+(?:[\p{L} ]+){1,}$/u;
const BIRTH_REGEX =
  /^(19\d\d|20\d\d|2100)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
// birth regex allow valid date from 1900 to 2100
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  // name
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  // birthday
  const [birth, setBirth] = useState("");
  const [validBirth, setValidBirth] = useState(false);
  const [birthFocus, setBirthFocus] = useState(false);

  // gender
  const [gender, setGender] = useState(0);
  const [validGender, setValidGender] = useState(false);
  const [genderFocus, setGenderFocus] = useState(false);

  // username
  const [username, setUser] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // password
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // confirm password
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // register timeline
  const steps = ["Thông tin cơ bản", "Tạo tài khoản", "Hoàn Thành"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    const validGenders = [0,1,2];
    setValidGender(validGenders.includes(gender));
  }, [gender]);

  useEffect(() => {
    if (BIRTH_REGEX.test(birth)) {
      const inputBirth = new Date(birth);
      const currentDate = new Date();
      if (inputBirth < currentDate) {
        setValidBirth(true);
      }
    } else {
      setValidBirth(false);
    }
  }, [birth]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, birth, gender, username, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setCurrentStep((prev) => prev + 1);
      if (currentStep === steps.length - 1) {
        setComplete(true);
      }
      setSuccess(true);
      //clear state and controlled inputs
      setName("");
      setBirth("");
      setGender(0);
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
        setValidUsername(false);
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section id="register-section">
        <div className="register-section-header">
          <div className="timeline-container">
            {steps?.map((step, i) => (
              <div
                key={i}
                className={`step-item ${currentStep === i + 1 && "active"} ${
                  (i + 1 < currentStep || complete) && "complete"
                } `}
              >
                <div className="step-container">
                  {i + 1 < currentStep || complete ? (
                    <>
                      <div className="step-progress">
                        <div className="step">
                          {complete ? (
                            <FontAwesomeIcon icon={faCheck} size="lg" />
                          ) : (
                            <FontAwesomeIcon icon={faCheck} size="sm" />
                          )}
                        </div>
                        {i < steps.length - 1 && (
                          <div className="progressBar bar-active"></div>
                        )}
                      </div>
                      {/* <span
                    className={
                      i == currentStep - 1
                        ? "underlineBar bar-active"
                        : "underlineBar"
                    }
                  ></span> */}
                    </>
                  ) : (
                    <>
                      <div className="step-progress">
                        <div className="step">{i + 1}</div>
                        {i < steps.length - 1 && (
                          <div className="progressBar"></div>
                        )}
                      </div>
                      {/* <span
                    className={
                      i == currentStep - 1
                        ? "underlineBar bar-active"
                        : "underlineBar"
                    }
                  ></span> */}
                    </>
                  )}
                  <p className="text-gray-500">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {success ? (
          <div className="register-section-body fade-appear-animation ">
            <div className="register-congratulation">
              <div className="rc-image move-down-appear-animation" style={{position: 'absolute',top: '-100px',left: '0px'}}>
                <img src={rcImage}></img>
              </div>
              <div></div>
              <div className="rc-content">
                <h2>CHÚC MỪNG BẠN ĐÃ TẠO TÀI KHOẢN THÀNH CÔNG !</h2>
                <small>
                  Cùng nhau tiến vào thế giới toán học sinh động nào !
                </small>
                <Link to="/login" className="form-register-link">
                  <button className="btn">ĐĂNG NHẬP NGAY</button>
                </Link>{" "}
                <Link to="/register" className="form-register-link">
                  {" "}
                  <button
                    className="btn secondary-btn "
                    onClick={()=>{setSuccess(false)}}
                    style={{ marginLeft: "30px" }}
                  >
                    QUAY LẠI ĐĂNG KÝ
                  </button>
                </Link>{" "}
              </div>
            </div>
          </div>
        ) : (
          <div className="register-section-body">
            <div className="poster">
              <div className="poster-title">
                <h1>Chào mừng đến với Mcode</h1>
                <small>
                  Đăng ký và cùng tham gia thế giới toán học kỳ thú nào
                </small>
              </div>
              <div className="poster-image">
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={bgInside}
                ></img>
              </div>
            </div>
            <div className="register-form">
              <form className="form-step" onSubmit={handleSubmit}>
                {/* form 1 */}
                <div
                  className={
                    currentStep == 1 ? "form-step1" : "form-step-hidden"
                  }
                >
                  <label htmlFor="name">
                    Họ và tên:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validName ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validName || !name ? "hide" : "invalid"}
                    />
                  </label>
                  <input
                    type="text"
                    id="name"
                    ref={userRef}
                    placeholder="Họ và tên của bạn"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="nameNote"
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                  />
                  <p
                    id="nameNote"
                    className={
                      nameFocus && name && !validName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter a real name.
                    <br />
                    A name should begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>

                  <label htmlFor="birth">
                    Ngày sinh:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validBirth ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validBirth || !birth ? "hide" : "invalid"}
                    />
                  </label>
                  <input
                    type="date"
                    id="birth"
                    ref={userRef}
                    placeholder="Ngày sinh của bạn"
                    autoComplete="off"
                    onChange={(e) => setBirth(e.target.value)}
                    value={birth}
                    required
                    aria-invalid={validBirth ? "false" : "true"}
                    aria-describedby="birthNote"
                    onFocus={() => setBirthFocus(true)}
                    onBlur={() => setBirthFocus(false)}
                  />
                  <p
                    id="birthNote"
                    className={
                      birthFocus && birth && !validBirth
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Is it a valid birth date ?
                    <br />
                    Birth date shouldn't a date in future
                  </p>

                  <label htmlFor="gender">
                    Giới tính:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validGender ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validGender || !gender ? "hide" : "invalid"}
                    />
                  </label>
                  <select
                    id="gender"
                    ref={userRef}
                    value={gender}
                    onChange={(e) => setGender(parseInt(e.target.value))}
                    required
                    aria-invalid={validGender ? "false" : "true"}
                    aria-describedby="genderNote"
                    onFocus={() => setGenderFocus(true)}
                    onBlur={() => setGenderFocus(false)}
                  >
                    <option value="" disabled hidden>
                      Chọn giới tính
                    </option>
                    <option value={0}>Nam</option>
                    <option value={1}>Nữ</option>
                    <option value={2}>Khác</option>
                  </select>
                  <p
                    id="genderNote"
                    className={
                      genderFocus && gender && !validGender
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    {/* Your instructions or error message */}
                  </p>
                </div>

                {/* form 2 */}
                <div
                  className={
                    currentStep == 2 ? "form-step2" : "form-step-hidden"
                  }
                >
                  <label htmlFor="username">
                    Tên tài khoản:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validUsername ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={
                        validUsername || !username ? "hide" : "invalid"
                      }
                    />
                  </label>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    placeholder="Tên tài khoản của bạn"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    required
                    aria-invalid={validUsername ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={
                      userFocus && username && !validUsername
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>

                  <label htmlFor="password">
                    Mật khẩu:
                    <div
                      style={{flexGrow: '1',marginLeft: '10px'}}
                      className="checkBox-container"
                      onClick={togglePassword}
                    >
                      <Checkbox
                        checked={passwordShown}
                        onChange={togglePassword}
                        label="Hiện mật khẩu"
                      ></Checkbox>
                    </div>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validPwd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validPwd || !pwd ? "hide" : "invalid"}
                    />
                  </label>
                  <div className="register-password-input-container">
                    <input
                      type={passwordShown ? "text" : "password"}
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      placeholder="Hãy ghi nhớ mật khẩu nha"
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                    />
                  </div>
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>

                  <label htmlFor="confirm_pwd">
                    Nhập lại mật khẩu:
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validMatch && matchPwd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validMatch || !matchPwd ? "hide" : "invalid"}
                    />
                  </label>


                  <input
                    type={passwordShown ? "text" : "password"}
                    id="confirm_pwd"
                    placeholder="Xác nhận lại mật khẩu"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>

                  {/* <div
                    style={{
                      width: "var(--inputWidth)",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      className="btn"
                      disabled={
                        !validName ||
                        !validBirth ||
                        !validGender ||
                        !validUsername ||
                        !validPwd ||
                        !validMatch
                          ? true
                          : false
                      }
                    >
                      Đăng ký
                    </button>
                  </div> */}
                </div>
              </form>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              <div className="step-buttons">
                {!complete && (
                  <button
                    disabled={currentStep <= 1}
                    className="btn danger-btn"
                    onClick={() => {
                      setCurrentStep((prev) => prev - 1);
                    }}
                  >
                    Quay lại
                  </button>
                )}

                {!complete && currentStep <= steps.length - 2 ? (
                  <button
                    disabled={currentStep == steps.length - 1}
                    className="btn success-btn"
                    onClick={() => {
                      setCurrentStep((prev) => prev + 1);
                      if (currentStep === steps.length - 1) {
                        setComplete(true);
                      }
                    }}
                  >
                    Tiếp tục
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn"
                    disabled={
                      !validName ||
                      !validBirth ||
                      !validGender ||
                      !validUsername ||
                      !validPwd ||
                      !validMatch
                        ? true
                        : false
                    }
                  >
                    Đăng ký
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p> */}
      </section>
    </>
  );
};

export default Register;
