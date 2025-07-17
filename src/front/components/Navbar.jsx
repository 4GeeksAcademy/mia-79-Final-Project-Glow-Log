import { Link, useNavigate } from "react-router-dom";
import logoImageUrl from "../assets/img/glowlog-logo.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();
	const handleLogout = () => {
		dispatch({
			type: "logout"
		});
		navigate("/"); // or navigate("/login") if you have a login page
	};

	return (
		<nav className="navbar p-2" style={{ backgroundColor: 'rgb(221, 230, 196)' }}>
			<div className="container-fluid d-flex justify-content-between align-items-center p-2">
				<Link className="navbar-brand d-flex align-items-center" to="/">
					<img src={logoImageUrl} alt="logo" width="60" height="60" className="me-2" />
					<h1 style={{ color: 'rgb(67, 81, 40)' }}>GlowLog</h1>
				</Link>
				<ul className="navbar-nav d-flex flex-row">
					<li className="nav-item p-2">
						<Link className="nav-link active" to="/" style={{ color: 'rgb(67, 81, 40)' }}>Main Page</Link>
					</li>
					<li className="nav-item p-2">
						<Link className="nav-link" to="/profile" style={{ color: 'rgb(67, 81, 40)' }}>Profile</Link>
					</li>
					<li className="nav-item p-2">
						<button
							onClick={handleLogout}
							className="btn btn-link nav-link"
							style={{ color: 'rgb(67, 81, 40)', textDecoration: 'none' }}
						>
							Sign Out
						</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};