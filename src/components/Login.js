import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
// Auth context removed upon adding useAuth
// import AuthContext from "../context/AuthProvider";
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';

// matches route in node.js file routes/api/auth...
const LOGIN_URL = '/auth';

const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // replace with Navigate for successful login - removed upon adding nav from
    // const [success, setSuccess] = useState(false);

    // Sets focus on the first user input when the component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // If user changes user or pwd, the error message will clear out
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({user, pwd}), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            /* console.log(JSON.stringify(response)); */
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('no server response')
            } else if (err.response?.status === 400) {
                setErrMsg('missing username or password');
            } else if(err.response?.status === 401) {
                setErrMsg('unauthorized');
            } else {
                setErrMsg('login failed');
            }
            errRef.current.focus();
        }
    }

  return (
            <section>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                {/* no event handler needed when there is only 1 button */}
                <button>Sign In</button>
            </form>
            <p>
                    Need to Register? <br />
                    <span className="line">
                        {/* router link would go here */}
                        <a href="#">sign up</a>
                    </span>
            </p>
            </section>
    )
}

export default Login
