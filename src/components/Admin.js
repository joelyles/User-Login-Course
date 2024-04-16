import { Link } from "react-router-dom";
import Users from './Users';

const Admin = () => {
  return (
    <section>
      <h1>Admin Page</h1>
      <br />
      <Users />
      <div>
        <Link to="/">home</Link>
      </div>
    </section>
  )
}

export default Admin
