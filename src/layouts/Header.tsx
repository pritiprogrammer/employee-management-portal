import { NavLink } from "react-router-dom";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };
  return (
    <header className="app-header">
      <div className="header-container">
        <NavLink to="/dashboard" className="header-logo">
          <span className="logo-icon" aria-hidden="true">
            EO
          </span>
          <span className="logo-text">EmployeeOps</span>
        </NavLink>

        <nav className="header-nav" aria-label="Main navigation">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/employees"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Employees
          </NavLink>
        </nav>

        <div className="header-user">
          <span className="user-avatar">P</span>
          <span className="user-name">{user?.name ?? "User"}</span>{" "}
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
