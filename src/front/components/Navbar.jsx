import { Link } from "react-router-dom";
import logoImageUrl from "../assets/img/glowlog-logo.png";

export const Navbar = () => {

	return (
		<nav className="navbar p-2" style={{ backgroundColor: 'rgb(221, 230, 196)' }}>
			<div className="container-fluid d-flex justify-content-between align-items-center p-2">
				<Link className="navbar-brand d-flex align-items-center" to="/">
					<img src={logoImageUrl} alt="logo" width="60" height="60" className="me-2" style={{ color: 'rgb(67, 81, 40)' }}/>
					<h1 style={{ color: 'rgb(67, 81, 40)' }}>GlowLog</h1>
				</Link>
				<ul className="navbar-nav d-flex flex-row">
					<li className="nav-item p-2">
						<Link className="nav-link active" aria-current="page" to="/" style={{ color: 'rgb(67, 81, 40)' }}>Main Page</Link>
					</li>
					<li className="nav-item p-2" style={{ color: 'rgb(157, 175, 122)' }}>
						<Link className="nav-link" to="/">Profile</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};