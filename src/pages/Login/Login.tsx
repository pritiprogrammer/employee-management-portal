import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/authSlice";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-heading">
        <h1 id="login-heading">EmployeeOps</h1>

        <p>Sign in to manage employees.</p>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            dispatch(
              login({
                id: 1,
                name: "Priti",
                email,
              }),
            );

            navigate("/dashboard");
          }}
        >
          <div className="login-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}

export default Login;
