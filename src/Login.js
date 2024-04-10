import React from 'react';
import { useRef, useState, useEffect } from 'react';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // replace with Navigate for successful login
    const [success, setSuccess] = useState(false);

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
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }

  return (
    <>
        {success ? (
            <section>
                <h1>success!</h1>
                <p>
                    {/* react router link */}
                    <a href="#">to home</a>
                </p>
            </section>
        ) : (
            <section>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form>
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
        )}
    </>
  )
}

export default Login
