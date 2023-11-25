import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/modal/Modal";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Account = () => {
  const { logout } = useContext(AuthContext);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const clickLogOut = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    logout();
    navigate("/");
  };

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const response = await axios.get('/auth/refresh');
        setUserData(response.data);
      } catch(error){
        console.log("Error during fetching user data: ",error);
      }
    }

    fetchData();
  },[axios])



  return (
    <>
      <div>Account page</div>

      <button onClick={clickLogOut}>Sign Out</button>
      {userData ? (
        <p>Data from API: {JSON.stringify(userData)}</p>
      ) : ( <p> Loading user information </p>)}
      <Modal />
    </>
  );
};

export default Account;
