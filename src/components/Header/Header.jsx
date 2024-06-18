import React from "react";
import "./styles.css";
import logo from "../../assets/logo/logo-aishub-full.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import ProfileMenu from "./ProfileMenu";

function Header() {
	return (
		<div className="navbar">
			<img className="navbar-logo" src={logo} alt="logo" />
			<div className="search-bar">
				<div className="search-bar-text">Any where</div>
				<div className="search-bar-text">Any week</div>
				<div className="search-bar-text3">Add guests</div>
				<div className="search-icon-div">
					<SearchRoundedIcon className="search-icon" />
				</div>
			</div>
			<div className="profile-container">
				<div className="aishub-your-home">aishub your home</div>
				<div className="aishub-your-home">
					<LanguageRoundedIcon sx={{ fontSize: "1.4rem" }} />
				</div>
				<div className="profile-div">
					<ProfileMenu />
				</div>
			</div>
		</div>
	);
}

export default Header;
