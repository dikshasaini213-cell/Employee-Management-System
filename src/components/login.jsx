import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/authslice";


const DEMO = { email: "admin@ems.com", password: "admin123" };

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        
        setTimeout(() => {
            if (email.trim().toLowerCase() === DEMO.email && password === DEMO.password) {
                dispatch(login({ name: "Admin", email: DEMO.email }));
                navigate("/");
            } else {
                setError("Invalid email or password. Try the demo account below.");
                setShake(true);
                setLoading(false);
            }
        }, 900);
    }

    function fillDemo() {
        setEmail(DEMO.email);
        setPassword(DEMO.password);
        setError("");
    }

    return (
        <div className="login-page">
            
            <section className="login-brand">
                <span className="blob blob-1" />
                <span className="blob blob-2" />
                <span className="blob blob-3" />

                <div className="login-brand-top">
                    <span className="brand-mark" />
                    EmployeeMS
                </div>

                <div className="login-brand-body">
                    <h1>Manage your team, beautifully.</h1>
                    <p>
                        Add, edit and track employees in one clean dashboard built
                        with React, Redux Toolkit and React Query.
                    </p>

                    <div className="chip chip-1">
                        <strong>Fast</strong> search & filters
                    </div>
                    <div className="chip chip-2">
                        <strong>Live</strong> API data
                    </div>
                    <div className="chip chip-3">
                        <strong>Clean</strong> CRUD flow
                    </div>
                </div>

                <div className="login-brand-foot">© {new Date().getFullYear()} EmployeeMS</div>
            </section>

           
            <section className="login-side">
                <div
                    className={`login-card ${shake ? "shake" : ""}`}
                    onAnimationEnd={() => setShake(false)}
                >
                    <h2>Welcome back</h2>
                    <p className="login-sub">Sign in to continue to your dashboard.</p>

                    {error && <div className="login-error">{error}</div>}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="field">
                            <input
                                id="email"
                                type="email"
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                            <label htmlFor="email">Email address</label>
                        </div>

                        <div className="field">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <button
                                type="button"
                                className="toggle-pass"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className={`login-submit ${loading ? "loading" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <div className="login-divider"><span>or</span></div>

                    <button type="button" className="demo-btn" onClick={fillDemo}>
                        Use demo account
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Login;
