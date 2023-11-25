import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosPrivate from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// support multiple languages
import { useTranslation } from "react-i18next";

// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../../styles/components/Login/main.css";
import "../../index.css"

// images
import bgInside from "../../assets/images/Login/background_inside.png";
// import bg from "../../assets/images/Login/background.png";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const {t, i18n} = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // const axios = useAxiosPrivate();

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // useEffect with empty dependent array means --> this effect run only 1 time after component ui mounted
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // this effect will be re-render every time both user,pwd change
  useEffect(() => {
    setErrMsg("");
  }, [username, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("thing sent");
      console.log(JSON.stringify({ username: username, password: pwd }));
      const response = await axiosPrivate.post(LOGIN_URL, {
        username: username,
        password: pwd,
      });
      console.log("Chuẩn bị");
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;

      console.log("Access TOKEN: ", accessToken);
      login({ accessToken, refreshToken });
      setUserName("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log("ERROR");
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section id="login-section">
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="form-title">{t('hello')} !</h1>
          <span>
            Bạn chưa có tài khoản sao ?{" "}
            <Link to="/register" className="form-register-link">Đăng ký ngay </Link>{" "}
          </span>
          
          {/* <label htmlFor="username">Username</label> */}
          <input
            type="text"
            placeholder="Tên tài khoản"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            required
          />
          {/* <label htmlFor="password">Password:</label> */}
          <div className="login-password-input-container">
            <input
              placeholder="Mật khẩu"
              type={passwordShown ? "text" : "password"}
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <div className="password-toggle-icon" onClick={togglePassword}
             style={{
                position: "absolute",
                top: "50%",
                right: "1rem",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "var(--cancelColor)",
              }}>
              <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />
            </div>
          </div>
          <small><Link to="/reset" className="form-register-link" style={{color: 'var(--darkColor)'}}>Bạn đã quên mật khẩu ?  </Link>{" "}</small>

          <p
            ref={errRef}
            className={errMsg ? "errorMessage" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <button className="btn">Đăng nhập</button>
        </form>
        <div></div>
        <div className="form-image">
          <img src={bgInside}></img>
        </div>
      </div>
    </section>
  );
};

export default Login;
