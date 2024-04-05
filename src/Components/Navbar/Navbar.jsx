import Login from "../Login/Login";

import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-body">
        <h1 className="header">Keepr</h1>
        <Login />
      </div>
    </nav>
  );
};
export default Navbar;
