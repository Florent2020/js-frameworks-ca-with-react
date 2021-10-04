import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Button from "react-bootstrap/Button";

function Nav() {
	const [auth, setAuth] = useContext(AuthContext);

	const history = useHistory();

	function logout() {
		setAuth(null);
		history.push("/");
		window.localStorage.clear();
	}


	return (
		<nav className="nav--menu">
			<div className="container">
				<NavLink to="/" exact className="nav-link">Home</NavLink>
				<NavLink to="/contact" className="nav-link">Contact</NavLink>
				{auth ? (
					<>
						<NavLink to="/admin" className="nav-link">Admin</NavLink>
						<Button variant="info" type="submit" className="logout--button" onClick={logout}>Log out</Button>
					</>
				) : (
						<NavLink to="/login" className="nav-link">Login</NavLink>
				)}
			</div>
		</nav>
	);
}

export default Nav;