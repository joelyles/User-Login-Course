import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import Home from "./components/Home";
import Missing from "./components/Missing";
import Admin from "./components/Admin";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
       
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          
        </Route>

        <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
          
        </Route>

        <Route path="missing" element={<Missing />} />

      </Route>
    </Routes>
  );
}

export default App;
