import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/modal/Modal";
import LoadingScreen from "../../components/common/loadingScreen/LoadingScreen";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTimes,
  faCheck,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/pages/Account/style.css";
import { axiosPrivate } from "../../api/axios";

const NAME_REGEX = /^[\p{L} ]+(?:[\p{L} ]+){1,}$/u;
const BIRTH_REGEX =
  /^(19\d\d|20\d\d|2100)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
// birth regex allow valid date from 1900 to 2100
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PROFILE_URL = "/user/profile";
const SECURITY_URL = "/user/security";
const PASS_URL = "/user/changePassword";

const Account = () => {
  const { logout } = useContext(AuthContext);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

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

  // city
  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);
  const [citiesList, setCitiesList] = useState([]);

  // district
  const [district, setDistrict] = useState("");
  const [validDistrict, setValidDistrict] = useState(false);
  const [districtFocus, setDistrictFocus] = useState(false);

  // address
  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);

  // school
  const [school, setSchool] = useState("");
  const [validSchool, setValidSchool] = useState(false);
  const [schoolFocus, setSchoolFocus] = useState(false);

  // grade
  const [grade, setGrade] = useState("");
  const [validGrade, setValidGrade] = useState(false);
  const [gradeFocus, setGradeFocus] = useState(false);

  // email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // phone
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  // current_password
  const [cPwd, setCPwd] = useState("");
  const [validCPwd, setValidCPwd] = useState(false);
  const [CPwdFocus, setCPwdFocus] = useState(false);

  // new_password
  const [newPwd, setNewPwd] = useState("");
  const [validNewPwd, setValidNewPwd] = useState(false);
  const [newPwdFocus, setNewPwdFocus] = useState(false);

  // confirm
  const [confirm, setConfirm] = useState("");
  const [validConfirm, setValidConfirm] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  // security question
  const [sQuest, setSQuest] = useState("");
  const [validSQuest, setValidSQuest] = useState(false);
  const [sQuestFocus, setSQuestFocus] = useState(false);

  // toggle tabs
  const [showProfile, setShowProfile] = useState(true);
  const [showSecurity, setShowSecurity] = useState(false);

  // security show
  const [emailShown, setEmailShown] = useState(false);
  const [phoneShown, setPhoneShown] = useState(false);
  const [sQuestShown, setSQuestShown] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [nPasswordShown, setNPasswordShown] = useState(false);
  const [confirmShown, setConfirmShown] = useState(false);

  // avatar
  const [image, setImage] = useState("images/default_avatar.png");

  // allow edition handle
  const [allowEditProfile, setAllowEditProfile] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const pullData = (data) => {
    // profile tabs
    setName(data.full_name || "Unknown name");
    console.log("data.full_name: ", data.full_name);
    setBirth(data.birthday || "unknown birthday");
    setGender(parseInt(data.gender) || 0);
    setCity(parseInt(data.city) || 0);
    setAddress(data.address || "Unknown address");
    setSchool(parseInt(data.school) || 0);
    setGrade(parseInt(data.grade) || 0);

    // security tab:
    setEmail(data.email || "");
    setPhone(data.phone || "");
    setSQuest(data.sQuest || "");
  };

  useEffect(() => {
    // Load facts.json and set a random fact
    fetch("/data/cities.json")
      .then((response) => response.json())
      .then((data) => {
        setCitiesList(data);
      })
      .catch((error) => console.error("Error loading cities.json:", error));
  }, []);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("mcode_user_data");
    if (storedUserData && storedUserData != "") {
      setUserData(JSON.parse(storedUserData));
      setLoading(false);
      console.log("Stored data: ");
      console.log(storedUserData);
      pullData(JSON.parse(storedUserData));
    } else {
      const fetchData = async () => {
        try {
          const response = await axiosPrivate.get(PROFILE_URL);
          const data = response.data;
          setUserData(data);
          pullData(data);
          sessionStorage.setItem("mcode_user_data", JSON.stringify(data));
          console.log(data);
          console.log("-----------------");
        } catch (err) {
          console.log("Error fetching user data: ", err);
          setErrMsg(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    const validGenders = [0, 1, 2];
    setValidGender(validGenders.includes(gender));
  }, [gender]);

  useEffect(() => {
    setValidCity(citiesList.some((c) => c.id === city));
  }, [city]);

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
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    const validGenders = [0, 1, 2];
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
    setErrMsg("");
  }, [
    name,
    birth,
    gender,
    city,
    district,
    school,
    grade,
    email,
    phone,
    cPwd,
    newPwd,
    confirm,
    sQuest,
  ]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleNPassword = () => {
    setNPasswordShown(!nPasswordShown);
  };

  const toggleConfirm = () => {
    setConfirmShown(!confirmShown);
  };

  const toggleEmail = () => {
    setEmailShown(!emailShown);
  };

  const togglePhone = () => {
    setPhoneShown(!phoneShown);
  };

  const toggleSQuest = () => {
    setSQuestShown(!sQuestShown);
  };

  function handleImageChange(e) {
    console.log("Image: ", e.target.files);
    if (e.target.files[0]) setImage(URL.createObjectURL(e.target.files[0]));
  }

  const clickLogOut = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    logout();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(PROFILE_URL);
        const data = response.data;
        setUserData(data);
        pullData(data);
        sessionStorage.setItem("mcode_user_data", JSON.stringify(data));
        console.log(data);
        console.log("-----------------");
      } catch (err) {
        console.log("Error fetching user data: ", err);
        setErrMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const handleSubmitSecurity = async (e) => {
    e.preventDefault();
  };

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/auth/refresh");
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.log("Error during fetching user data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, [axios]);

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <>
      <section id="account-page-section">
        <div className="account-page-container">
          <div className="accPage-header">
            <h2>THÔNG TIN TÀI KHOẢN</h2>
          </div>
          <div className="accPage-body">
            <div className="accPage-b-left">
              <div
                className={`apb-profile ${showProfile ? "tab-active" : ""}`}
                onClick={() => {
                  setShowSecurity(false);
                  setShowProfile(true);
                }}
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Hồ sơ của tôi</span>
              </div>
              <div
                className={`apb-security ${showSecurity ? "tab-active" : ""}`}
                onClick={() => {
                  setShowProfile(false);
                  setShowSecurity(true);
                }}
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Bảo mật</span>
              </div>
            </div>
            <div className="accPage-b-right">
              <div className="accPage-br-header">
                <div className="circle-avatar">
                  <label style={{ cursor: "pointer" }} htmlFor="image_picker">
                    <img src={image} alt="user_avatar"></img>
                  </label>
                </div>
                <div>
                  <strong>Xin chào Đức Trọng</strong>
                  <input
                    id="image_picker"
                    type="file"
                    style={{
                      textDecoration: "underline",
                      color: "var(--cancelColor)",
                      display: "none",
                    }}
                    onClick={handleImageChange}
                  />
                  <div
                    style={{
                      marginTop: "10px",
                      textDecoration: "underline",
                      color: "var(--grayColor)",
                    }}
                  >
                    <label style={{ cursor: "pointer" }} htmlFor="image_picker">
                      Chỉnh sửa ảnh đại diện
                    </label>
                  </div>
                </div>
              </div>

              {/* profile tab */}
              {showProfile && (
                <div
                  className="accPage-br-body profile-part"
                  style={{ padding: "20px 30px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <h3
                      style={{
                        color: "var(--mainColor)",
                        marginBottom: "20px",
                      }}
                    >
                      Thông tin cá nhân
                    </h3>
                    {
                      <button
                        className={`btn success-btn ${
                          allowEditProfile ? "hidden" : ""
                        }`}
                        style={{ marginTop: "0px" }}
                        onClick={() => {
                          setAllowEditProfile(true);
                        }}
                      >
                        Chỉnh sửa
                      </button>
                    }
                  </div>
                  <div>
                    <form
                      className="form-update-profile"
                      onSubmit={handleSubmit}
                    >
                      {/* form 1 */}
                      <div className="f-u-p-header">
                        <div className="f-update-ph-left">
                          <label htmlFor="name">
                            Họ và tên:
                            {allowEditProfile && (
                              <>
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={validName ? "valid" : "hide"}
                                />
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className={
                                    validName || !name ? "hide" : "invalid"
                                  }
                                />
                              </>
                            )}
                          </label>
                          {allowEditProfile ? (
                            <input
                              type="text"
                              id="name"
                              // ref={userRef}
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
                          ) : (
                            <div className="uneditable-input">{name}</div>
                          )}

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
                            {allowEditProfile && (
                              <>
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={validBirth ? "valid" : "hide"}
                                />
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className={
                                    validBirth || !birth ? "hide" : "invalid"
                                  }
                                />
                              </>
                            )}
                          </label>
                          {allowEditProfile ? (
                            <input
                              type="date"
                              id="birth"
                              // ref={userRef}
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
                          ) : (
                            <div className="uneditable-input">{birth}</div>
                          )}

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
                            {allowEditProfile && (
                              <>
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={validGender ? "valid" : "hide"}
                                />
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className={
                                    validGender || !gender ? "hide" : "invalid"
                                  }
                                />
                              </>
                            )}
                          </label>
                          {allowEditProfile ? (
                            <select
                              id="gender"
                              // ref={userRef}
                              value={gender}
                              onChange={(e) =>
                                setGender(parseInt(e.target.value))
                              }
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
                          ) : (
                            <div className="uneditable-input">
                              {gender === 0
                                ? "Nam"
                                : gender === 1
                                ? "Nữ"
                                : "Khác"}
                            </div>
                          )}

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
                        <div className="f-update-ph-right">
                          <label htmlFor="city">
                            Thành phố/Tỉnh:
                            {allowEditProfile && (
                              <>
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={validCity ? "valid" : "hide"}
                                />
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className={
                                    validCity || !city ? "hide" : "invalid"
                                  }
                                />
                              </>
                            )}
                          </label>
                          {allowEditProfile ? (
                            <select
                              id="city"
                              // ref={userRef}
                              value={city}
                              onChange={(e) =>
                                setCity(parseInt(e.target.value))
                              }
                              required
                              aria-invalid={validCity ? "false" : "true"}
                              aria-describedby="cityNote"
                              onFocus={() => setCityFocus(true)}
                              onBlur={() => setCityFocus(false)}
                            >
                              <option value="" disabled hidden>
                                Chọn thành phố
                              </option>
                              {citiesList.map((city) => (
                                <option key={city.id} value={city.id}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="uneditable-input">{city}</div>
                          )}
                          <p
                            id="cityNote"
                            className={
                              cityFocus && city && !validCity
                                ? "instructions"
                                : "offscreen"
                            }
                          ></p>
                          <label htmlFor="address">
                            Địa chỉ:
                            {allowEditProfile && (
                              <>
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={validName ? "valid" : "hide"}
                                />
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className={
                                    validName || !name ? "hide" : "invalid"
                                  }
                                />
                              </>
                            )}
                          </label>
                          {allowEditProfile ? (
                            <input
                              type="text"
                              id="address"
                              // ref={userRef}
                              placeholder="Địa chỉ của bạn"
                              autoComplete="off"
                              onChange={(e) => setAddress(e.target.value)}
                              value={address}
                              required
                              aria-invalid={validName ? "false" : "true"}
                              aria-describedby="addressNote"
                              onFocus={() => setAddressFocus(true)}
                              onBlur={() => setAddressFocus(false)}
                            />
                          ) : (
                            <div className="uneditable-input">{address}</div>
                          )}
                          <p
                            id="addressNote"
                            className={
                              addressFocus && address && !validAddress
                                ? "instructions"
                                : "offscreen"
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter a real address.
                            <br />
                            A address should begin with a letter or numbers.
                            <br />
                            Letters, numbers, underscores, hyphens allowed.
                          </p>
                        </div>
                      </div>
                      <hr></hr>
                      <h3
                        style={{
                          color: "var(--mainColor)",
                          marginBottom: "20px",
                        }}
                      >
                        Thông tin trường học
                      </h3>
                      <div className="f-update-p-bottom">
                        <div>
                          <label htmlFor="school">
                            Trường học:
                            {allowEditProfile && (
                              <>
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={validSchool ? "valid" : "hide"}
                                />
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className={
                                    validSchool || !school ? "hide" : "invalid"
                                  }
                                />
                              </>
                            )}
                          </label>
                          {allowEditProfile ? (
                            <input
                              type="text"
                              id="school"
                              // ref={userRef}
                              placeholder="Trường học của bạn"
                              autoComplete="off"
                              onChange={(e) => setSchool(e.target.value)}
                              value={school}
                              required
                              aria-invalid={validSchool ? "false" : "true"}
                              aria-describedby="schoolNote"
                              onFocus={() => setSchoolFocus(true)}
                              onBlur={() => setSchoolFocus(false)}
                            />
                          ) : (
                            <div className="uneditable-input">{school}</div>
                          )}
                          <p
                            id="schoolNote"
                            className={
                              schoolFocus && school && !validSchool
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
                        </div>

                        <div>
                          <label htmlFor="grade">
                            Lớp:
                            {allowEditProfile && (
                              <>
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={validGrade ? "valid" : "hide"}
                                />
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className={
                                    validGrade || !grade ? "hide" : "invalid"
                                  }
                                />
                              </>
                            )}
                          </label>
                          {allowEditProfile ? (
                            <select
                              id="grade"
                              // ref={userRef}
                              value={grade}
                              onChange={(e) =>
                                setGrade(parseInt(e.target.value))
                              }
                              required
                              aria-invalid={validGrade ? "false" : "true"}
                              aria-describedby="gradeNote"
                              onFocus={() => setGradeFocus(true)}
                              onBlur={() => setGradeFocus(false)}
                            >
                              <option value="" disabled hidden>
                                Chọn lớp
                              </option>
                              <option value={0}>1</option>
                              <option value={1}>2</option>
                              <option value={2}>3</option>
                            </select>
                          ) : (
                            <div className="uneditable-input">{grade}</div>
                          )}
                          <p
                            id="gradeNote"
                            className={
                              gradeFocus && grade && !validGrade
                                ? "instructions"
                                : "offscreen"
                            }
                          >
                            {/* Your instructions or error message */}
                          </p>
                        </div>
                      </div>
                    </form>
                    <p
                      // ref={errRef}
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                  </div>
                  {
                    <div
                      className={allowEditProfile ? "" : "hidden"}
                      style={{
                        display: "flex",
                        gap: "10px",
                        width: "100%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        className="btn danger-btn"
                        onClick={() => {
                          setAllowEditProfile(false);
                        }}
                      >
                        Hủy bỏ
                      </button>
                      <button className="btn success-btn">Lưu lại</button>
                    </div>
                  }
                </div>
              )}

              {/* security tab */}
              {showSecurity && (
                <div
                  className="accPage-br-body security-part"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "22px",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="container">
                    <h3
                      style={{
                        color: "var(--mainColor)",
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      Thông tin bảo mật
                    </h3>
                    <div>
                      <form
                        className="form-update-profile"
                        onSubmit={handleSubmitSecurity}
                      >
                        {/* form 1 */}
                        <div className="f-u-p-header">
                          <div className="f-update-ph-left">
                            <label htmlFor="email">
                              Email:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validEmail ? "valid" : "hide"}
                              />
                              <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                  validEmail || !email ? "hide" : "invalid"
                                }
                              />
                            </label>
                            <div className="login-password-input-container">
                              <input
                                type={emailShown ? "text" : "password"}
                                id="email"
                                // ref={userRef}
                                placeholder="Email của bạn"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailNote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                              />
                              <div
                                className="password-toggle-icon"
                                onClick={toggleEmail}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "1rem",
                                  transform: "translateY(-50%)",
                                  cursor: "pointer",
                                  color: "var(--cancelColor)",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={emailShown ? faEye : faEyeSlash}
                                />
                              </div>
                            </div>
                            <p
                              id="emailNote"
                              className={
                                emailFocus && email && !validEmail
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              Please enter a correct email.
                              <br />
                              A email should contain @.
                              <br />
                              Letters, numbers, underscores, hyphens allowed.
                            </p>
                            <label htmlFor="phone">
                              Phone:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validPhone ? "valid" : "hide"}
                              />
                              <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                  validPhone || !phone ? "hide" : "invalid"
                                }
                              />
                            </label>
                            <div className="login-password-input-container">
                              <input
                                type={phoneShown ? "text" : "password"}
                                placeholder="Số điện thoại của bạn"
                                autoComplete="off"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                id="phone"
                                required
                                aria-invalid={validPhone ? "false" : "true"}
                                aria-describedby="phoneNote"
                                onFocus={() => setPhoneFocus(true)}
                                onBlur={() => setPhoneFocus(false)}
                              />
                              <div
                                className="password-toggle-icon"
                                onClick={togglePhone}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "1rem",
                                  transform: "translateY(-50%)",
                                  cursor: "pointer",
                                  color: "var(--cancelColor)",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={phoneShown ? faEye : faEyeSlash}
                                />
                              </div>
                            </div>
                            <p
                              id="phoneNote"
                              className={
                                phoneFocus && phone && !validPhone
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              Please enter a correct phone.
                              <br />
                              Only numbers allowed.
                            </p>
                            <label htmlFor="sQuest">
                              Security Quest:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validSQuest ? "valid" : "hide"}
                              />
                              <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                  validSQuest || !sQuest ? "hide" : "invalid"
                                }
                              />
                            </label>
                            <div className="login-password-input-container">
                              <input
                                placeholder="Câu hỏi bí mật"
                                type={sQuestShown ? "text" : "password"}
                                id="sQuest"
                                onChange={(e) => setSQuest(e.target.value)}
                                value={sQuest}
                                autoComplete="off"
                                required
                                aria-invalid={validSQuest ? "false" : "true"}
                                aria-describedby="sQuestNote"
                                onFocus={() => setSQuestFocus(true)}
                                onBlur={() => setSQuestFocus(false)}
                              />
                              <div
                                className="password-toggle-icon"
                                onClick={toggleSQuest}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "1rem",
                                  transform: "translateY(-50%)",
                                  cursor: "pointer",
                                  color: "var(--cancelColor)",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={sQuestShown ? faEye : faEyeSlash}
                                />
                              </div>
                            </div>
                            {/* <p
                              id="sQuestNote"
                              className={
                                squestFocus && squest && !validSquest
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              Please enter a correct email.
                              <br />
                              A email should contain @.
                              <br />
                              Letters, numbers, underscores, hyphens allowed.
                            </p> */}
                          </div>
                        </div>
                      </form>
                      <p
                        // ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </p>
                    </div>
                  </div>
                  <div className="container">
                    <h3
                      style={{
                        color: "var(--mainColor)",
                        marginBottom: "20px",
                        display: "flex",
                        flexGrow: "1",
                        alignItems: "flex-end",
                      }}
                    >
                      <div>Đổi mật khẩu</div>
                    </h3>
                    <div>
                      <form
                        className="form-update-profile"
                        onSubmit={handleSubmitResetPassword}
                      >
                        {/* form 1 */}
                        <div className="f-u-p-header">
                          <div className="f-update-ph-left">
                            <label htmlFor="password">
                              Mật khẩu hiện tại:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validCPwd ? "valid" : "hide"}
                              />
                              <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                  validCPwd || !cPwd ? "hide" : "invalid"
                                }
                              />
                            </label>
                            <div className="login-password-input-container">
                              <input
                                placeholder="Mật khẩu hiện tại"
                                type={passwordShown ? "text" : "password"}
                                id="password"
                                onChange={(e) => setCPwd(e.target.value)}
                                value={cPwd}
                                autoComplete="off"
                                required
                                aria-invalid={validCPwd ? "false" : "true"}
                                aria-describedby="CPwdNote"
                                onFocus={() => setCPwdFocus(true)}
                                onBlur={() => setCPwdFocus(false)}
                              />
                              <div
                                className="password-toggle-icon"
                                onClick={togglePassword}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "1rem",
                                  transform: "translateY(-50%)",
                                  cursor: "pointer",
                                  color: "var(--cancelColor)",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={passwordShown ? faEye : faEyeSlash}
                                />
                              </div>
                            </div>
                            <p
                              id="CPwdNote"
                              className={
                                CPwdFocus && cPwd && !validCPwd
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

                            <label htmlFor="new_password">
                              Mật khẩu hiện tại:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validNewPwd ? "valid" : "hide"}
                              />
                              <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                  validNewPwd || !newPwd ? "hide" : "invalid"
                                }
                              />
                            </label>
                            <div className="login-password-input-container">
                              <input
                                placeholder="Mật khẩu mới"
                                type={nPasswordShown ? "text" : "password"}
                                id="new_password"
                                onChange={(e) => setNewPwd(e.target.value)}
                                value={newPwd}
                                autoComplete="off"
                                required
                                aria-invalid={validNewPwd ? "false" : "true"}
                                aria-describedby="nPwdNote"
                                onFocus={() => setNewPwdFocus(true)}
                                onBlur={() => setNewPwdFocus(false)}
                              />
                              <div
                                className="password-toggle-icon"
                                onClick={toggleNPassword}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "1rem",
                                  transform: "translateY(-50%)",
                                  cursor: "pointer",
                                  color: "var(--cancelColor)",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={nPasswordShown ? faEye : faEyeSlash}
                                />
                              </div>
                            </div>
                            <p
                              id="nPwdNote"
                              className={
                                newPwdFocus && newPwd && !validNewPwd
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

                            <label
                              htmlFor="confirm"
                              style={{ marginTop: "1rem" }}
                            >
                              Xác nhận mật khẩu:
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={validConfirm ? "valid" : "hide"}
                              />
                              <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                  validConfirm || !confirm ? "hide" : "invalid"
                                }
                              />
                            </label>
                            <div className="login-password-input-container">
                              <input
                                placeholder="Xác nhận mật khẩu"
                                type={confirmShown ? "text" : "password"}
                                id="confirm"
                                onChange={(e) => setConfirm(e.target.value)}
                                value={confirm}
                                required
                                autoComplete="off"
                                aria-invalid={validConfirm ? "false" : "true"}
                                aria-describedby="confirmNote"
                                onFocus={() => setConfirmFocus(true)}
                                onBlur={() => setConfirmFocus(false)}
                              />
                              <div
                                className="password-toggle-icon"
                                onClick={toggleConfirm}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "1rem",
                                  transform: "translateY(-50%)",
                                  cursor: "pointer",
                                  color: "var(--cancelColor)",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={confirmShown ? faEye : faEyeSlash}
                                />
                              </div>
                            </div>
                            <p
                              id="nPwdNote"
                              className={
                                newPwdFocus && newPwd && !validNewPwd
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              Password and confirm password are not matched.
                            </p>

                            <p
                              // ref={errRef}
                              className={errMsg ? "errorMessage" : "offscreen"}
                              aria-live="assertive"
                            >
                              {errMsg}
                            </p>
                          </div>
                        </div>
                      </form>
                      <p
                        // ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        width: "100%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button className="btn success-btn">Đổi mật khẩu</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
