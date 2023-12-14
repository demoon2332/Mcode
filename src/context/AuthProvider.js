import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import useRefreshToken from "../hooks/useRefreshToken";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function checkTokenExpiration(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = new Date().getTime() / 1000;
  return decodedToken?.exp && currentTime <= decodedToken?.exp;
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);

  const login = (data) => {
    const decodedToken = jwtDecode(data.accessToken);
    setAuth({
      accessToken: data.accessToken,
      expirationTime: decodedToken.exp,
      ...decodedToken.payload,
    });

    // set refreshToken into cookie
    if(data.refreshToken)
      {
        // setCookie("refreshToken", data.refreshToken, {httpOnly: true, secure: true, path: "/", maxAge: 604800 });
        setCookie("refreshToken", data.refreshToken, {path: "/"});

      }
      console.log("Sau khi lưu có cookie ko nè")
      console.log(cookies.refreshToken)
      // 604800 seconds is a week  
  };

  const refresh = useRefreshToken();

  const isAuthenticated = () => {
    return auth.accessToken && checkTokenExpiration(auth?.accessToken);
  };

  const logout = () => {
    setAuth({});
    // sessionStorage.removeItem('mcode_token');
    localStorage.removeItem("mcode_token");
    removeCookie("refreshToken");
  };

  const onLocalStorageChange = (e) => {
    if (e.key === "mcode_token") {
      try {
        const decodedToken = jwtDecode(e.newValue);
        setAuth({
          accessToken: e.newValue,
          expirationTime: decodedToken.exp,
          ...decodedToken.payload,
        });
      } catch (e) {
        console.log("Error during storage change, decode and save token: ");
        setAuth({});
      }
    }
  };

  useEffect(() => {
    window.addEventListener("storage", onLocalStorageChange);

    return () => {
      window.removeEventListener("storage", onLocalStorageChange);
    };
  }, []);

  // due to setState for auth in login func is asynchronous --> only after auth is assigned/changed
  // this useEffect will run and set into sessionStorage, localStorage
  useEffect(() => {
    if (auth?.accessToken) {
      if (checkTokenExpiration(auth.accessToken)) {
        // sessionStorage.setItem('mcode_token',auth.accessToken);
        localStorage.setItem("mcode_token", auth.accessToken);
      }
    }
  }, [auth]);

  // this effect will run once component is mounted
  useEffect(() => {
    // const storedToken = JSON.parse(sessionStorage.getItem('mcode_token')) || JSON.parse(localStorage.getItem('mcode_token'));
    // const storedToken = sessionStorage.getItem('mcode_token') || localStorage.getItem('mcode_token');
    const storedToken = localStorage.getItem("mcode_token");

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      console.log("Decoded Token nè: ");
      console.log(decodedToken);
      if (checkTokenExpiration(storedToken)) {
        // Token is not expired, set user information and mark as logged in
        console.log("after check token exp");
        // console.log()
        setAuth({
          accessToken: storedToken,
          expirationTime: decodedToken.exp,
          ...decodedToken.payload,
        });
      } else {
        const storedRefreshToken = cookies.refreshToken;

        // refresh if the refresh Token is still available
        if (storedRefreshToken) {
          // axios.get('/refresh')
          refresh()
            .then((res) => {
              // const { accessToken, refreshToken } = res.data;
              console.log("Res in auth provider")
              console.log(res);
              const { accessToken } = res.data;
              login({ accessToken, storedRefreshToken });
            })
            .catch((err) => {
              console.log("21/11 can't refresh ")
              logout();
            });
        } else {
          // When both 2 Tokens (access and refresh) are expired, log the user out
          logout();
          console.log("Token expired. Redirecting to login page.");
          // Redirect to the login page
          // Example: history.push('/login');
        }
      }
    }
    console.log("RUN EFFECT: isAuthenticated ?");
    console.log(isAuthenticated());
  }, []);

  return (
    <AuthContext.Provider
      value={{ setAuth, auth, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
