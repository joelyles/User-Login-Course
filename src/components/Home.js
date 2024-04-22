import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <div>
      <p>Home Page</p>
      
        <Link to="/admin">Admin</Link>
        <div>
          <button onClick={signOut}>Sign Out</button>
        </div>
    </div>
  )
}

export default Home
