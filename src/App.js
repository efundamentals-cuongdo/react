import React, { useEffect, useState } from "react";
import WelcomePage from "./page/WelcomePage/WelcomePage";
import Counter from "./components/counter/Counter";
import PostPage from "./page/PostPage/PostPage";
import DetailPage from "./page/DetailPage/DetailPage";
import LoginPage from "./page/LoginPage/LoginPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ProfilePage from "./page/ProfilePage/ProfilePage";
import LoginContext from "./contexts/LoginContext";
const PAGE = {
    COUNTER: "counter",
    WELCOME: "welcome",
    POST: "Post",
    DETAIL: "Detail",
    LOGIN: "Login"
}
const App = () => {
    const [page, setPage] = useState(PAGE.WELCOME)
    const getPageRender = () => {
        switch (page) {
            case PAGE.COUNTER:
                return <Counter />
            case PAGE.WELCOME:
                return <WelcomePage />
            case PAGE.POST:
                return <PostPage />
            case PAGE.DETAIL:
                return <DetailPage />
            case PAGE.LOGIN:
                return <LoginPage />
            default:
                return null;
        }
    }
    const [token, setToken] = useState(null)
    const [currentUser, setCurrentUser] = useState({
        id: null
    })
    useEffect(() => {
        let tokenSaved = localStorage.getItem('TOKEN')
        let userID = localStorage.getItem('USERID')
        console.log('token in localStorage:' + tokenSaved)
        if (tokenSaved) {
            setToken(tokenSaved)
            setCurrentUser({ id: userID })
        }
    }, [token])
    const handleLogout = () => {
        localStorage.removeItem('TOKEN')
        setToken(null)
    }
    return (
        <div className="app-container">

            {/* <button onClick={() => setPage(PAGE.COUNTER)} style={{ margin: 20 }}>show counter</button>
            <button onClick={() => setPage(PAGE.WELCOME)}>show welcome</button>
            <button onClick={() => setPage(PAGE.POST)}>show post</button>
            <button onClick={() => setPage(PAGE.DETAIL)}>show Detail</button>
            <button onClick={() => setPage(PAGE.LOGIN)}>show Login</button>
            {getPageRender()} */}
            <Router>
                <LoginContext.Provider value={token}>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/post">Post</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    {!token && <Link to="/login">Login</Link>}
                                    {token && <button onClick={handleLogout}>Logout</button>}
                                </li>
                            </ul>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/post" exact>
                                <PostPage />
                            </Route>
                            <Route path="/login" exact>
                                <LoginPage setToken={setToken}
                                    setCurrentUser={setCurrentUser}
                                />
                            </Route>
                            <Route path="/profile" exact>
                                <ProfilePage setToken={setToken}
                                    setCurrentUser={setCurrentUser}
                                    currentUser={currentUser}
                                />
                            </Route>
                            <Route path="/" exact>
                                <WelcomePage />
                            </Route>
                            <Route path="/post/:id" children={<DetailPage />} exact>
                            </Route>
                        </Switch>
                    </div>
                </LoginContext.Provider>
            </Router>
        </div>
    )
};

export default App;