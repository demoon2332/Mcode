import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./components/Register/Register";
// import MainLayout from "./layouts/main";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Home from "./pages/home/Home";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import News from "./pages/news/News";
import Tutorials from "./pages/tutorials/Tutorials";
import About from "./pages/about/About";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import AuthContext from "./context/AuthProvider";
import Account from "./pages/account/Account";
import Admin from "./pages/admin/Admin";
import Reset from "./components/Reset/Reset";


import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en.json";
import viTranslation from "./locales/vi.json";
import Course from "./pages/course/Course";
import Exam from "./pages/exam/Exam";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    vi: {
      translation: viTranslation,
    },
  },
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const ROLES = {
  User: 2001,
  Editor: 1905,
  Admin: 4420,
};

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const routeWithNavBar = ['/','/news','/leaderboard','/tutorials','/about'];
  const [navBarOn, setNavBarOn] = useState(true); 

  useEffect(()=>{
    setNavBarOn(routeWithNavBar.includes(window.location.pathname));
    console.log("WINDOW LOCATION HERE: ",window.location.pathname);
  },[navigate])

  return (
    <div>
      {navBarOn && <Navbar />}
      <Routes>
        <Route
          path="login"
          element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="register"
          element={isAuthenticated() ? <Navigate to="/" /> : <Register />}
        />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/news" element={<News />} />
          <Route path="/account" element={<Account />} /> */}

        {/* we want to protect these routes */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User,ROLES.Admin]} />}>
            <Route path="/" element={<Home />} />
          </Route> */}
        <Route path="/reset" element={<Reset />} />
        <Route path="/" element={<Home />} />
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="/about" element={<About />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="/tutorials" element={<Tutorials />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="/news" element={<News />} />
        </Route>
        {/* <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="/account" element={<Account />} />
        </Route> */}
        <Route path="/account" element={<Account />}></Route>
        <Route path="/courses" element={<Course />}></Route>
        <Route path="/lessons/:lessonId" element={<Exam />}></Route>


        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route> */}

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* <Route path="/leaderboard" component={About} />
        <Route path="/tutorial" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/news" component={News} /> */}

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
