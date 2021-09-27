import React from "react";
import Welcome from "../../components/Welcome/Welcome";
const PAGE = {
    COUNtER: "counter",
    WELCOME: "Welcome"
}
const WelcomePage = () => {
    return (
        <div className="app-container">
            <Welcome name='cuong'
                age="20"
                color='red'
            />
            <Welcome name='tung'
                age="20"
                color='blue'
            />
        </div>
    )
};

export default WelcomePage;