import React, { useContext } from "react";
import LoginContext from "../../contexts/LoginContext";
import LoginPage from "../LoginPage/LoginPage";
const ProfilePage = ({ setToken, setCurrentUser, currentUser }) => {
    const token = useContext(LoginContext)
    if (!token) return (
        <LoginPage setToken={setToken}
            setCurrentUser={setCurrentUser} />
    )
    const handleLogout = () => {
        setToken(null)
        localStorage.removeItem('TOKEN')
    }
    return (
        <div className="app-container">
            Profile Page
            <div>Current User:{currentUser.id}</div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default ProfilePage;