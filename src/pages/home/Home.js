import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Modal from "../../components/common/modal/Modal";

import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/common/languageSwitcher/LanguageSwitcher";

const Home = () => {

    const {t} = useTranslation();
    const { auth,setAuth,logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const clickLogOut = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        logout();
        navigate('/');
    }

    return (
        <section>
            { auth.username ? <> <h1>{t('hello')}</h1> <p>{t('welcome_back')}, <b>{auth.username}</b></p> </> : <p>{t('welcome_to_app')}</p>}
            <br />
            {/* <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br /> */}
            <Link to="/home">{t('get_back_home')}</Link>
            <div className="flexGrow">
                {/* <button onClick={clickLogOut}>Sign Out</button> */}
            </div>
            {/* <Modal /> */}

            <LanguageSwitcher></LanguageSwitcher>
        </section>
    )
}

export default Home