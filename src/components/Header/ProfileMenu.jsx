import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import "./styles.css";

export default function ProfileMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<div
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				className="profile-menu-flex"
			>
				<MenuRoundedIcon />
				<AccountCircleRoundedIcon />
			</div>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
				sx={{
					".MuiPaper-root": {
						borderRadius: "1rem",
						marginTop: "1rem",
						minWidth: "220px",
						boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 9%);",
					},
				}}
			>
				<MenuItem className="menu-items" onClick={handleClose}>
					Sign up
				</MenuItem>
				<MenuItem className="menu-items" onClick={handleClose}>
					Log in
				</MenuItem>
				<div
					style={{
						height: "1px",
						background: "var(--grey)",
						width: "100%",
					}}
				></div>
				<MenuItem className="menu-items" onClick={handleClose}>
					Gift cards
				</MenuItem>
				<MenuItem className="menu-items" onClick={handleClose}>
					Aishub your home
				</MenuItem>
				<MenuItem className="menu-items" onClick={handleClose}>
					Help Center
				</MenuItem>
			</Menu>
		</div>
	);
}
