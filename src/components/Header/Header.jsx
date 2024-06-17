import React from "react";
import "./styles.css";
import logo from "../../assets/logo/logo-aishub-full.png";
function Header() {
	return (
		<div className="navbar">
			<img className="navbar-logo" src={logo} alt="logo" />
			<div className="search-bar">
				<div className="search-bar-text">Any where</div>
				<div className="search-bar-text">Any week</div>
				<div className="search-bar-text3">Add guests</div>
			</div>
			<div className="profile-container"></div>
		</div>
	);
}

export default Header;
