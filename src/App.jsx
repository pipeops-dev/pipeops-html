import { useState } from "react";

import Header from "./components/Header/Header";
import "./App.css";
import BottomNavBar from "./components/Header/MobileNavigation/BottomNavBar";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Header />
			<BottomNavBar />
		</>
	);
}

export default App;
