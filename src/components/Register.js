import React from 'react';
import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';

// Regex Statements
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

//Sets focus when the component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])

//Check for valid username
    useEffect(() => {
        const result = USER_REGEX.test(user);
        /* console.log(result);
        console.log(user); */
        setValidName(result);
    }, [user])

//check for valid pwd
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        /* console.log(result);
        console.log(pwd); */
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

//Error message, when the 3 pieces of state below are updated, the errMsg will clear out
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button is enables with js hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("invalid entry");
            return;
        }
        /* console.log(user, pwd); */
        setSuccess(true);
        try {
            const response = await axios.post(REGISTER_URL, 
            JSON.stringify({ user, pwd }), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            /* console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response)); */
            setSuccess(true);
            // optionally clear input fields here
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Already Exists');
            } else {
                setErrMsg('Registration Failed')
            }
            
        }
    }

  return (
    <>
    {success ? (
        <section>
            <h1>success!</h1>
            <p>
                {/* react router link */}
                <a href="#">sign in</a>
            </p>
        </section>
    ) : (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : 
      "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>register</h1>
      <form onSubmit={handleSubmit}>


        <label htmlFor="username">
            username:
        </label>
        <input 
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
        />
        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
            Username must be 4 to 24 characters, begin with a letter.<br />
            Letters, numbers, underscores, and hyphens are allowed.
        </p>


        <label htmlFor="password">
            password:
        </label>
        <input 
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
        />
        <p id="uidnote" className={pwdFocus && !validName ? "instructions" : "offscreen"}>
            Password must be 8 to 24 characters.<br />
            Also, must include uppercase and lowercase letters, a number,
            <br/> and a special character.
        </p>


        <label htmlFor="confirm_pwd">
            confirm password:
        </label>
        <input 
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
        />
        <p id="confirmnote" className={matchFocus && !validName ? "instructions" : "offscreen"}>
            Confirm password. Must match password field.
        </p>

        <button disabled={!validName || !validPwd || !validMatch ? true : false}>register</button>
      </form>

        <p>
            already registered? <br/>
            <span>
                {/* react router link would go here */}
                <a href="#">sign in</a>
            </span>
        </p>

    </section>
    )}
    </>
  )
}

export default Register
