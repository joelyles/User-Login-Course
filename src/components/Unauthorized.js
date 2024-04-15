import React from 'react'
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

  return (
    <section>
      <h1>unauthorized</h1>
      <br />
      <p>unauthorized access</p>
      <div>
        <button onClick={goBack}>go back</button>
      </div>
    </section>
  )
}

export default Unauthorized
