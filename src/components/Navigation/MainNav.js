import React, { useEffect } from 'react';
import styled from "@mui/system/styled";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {
	TrendingUp,
	Movie,
	Tv,
	Search,
	TheaterComedy
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
	palette: {
		mode: "dark"
	}
})

const BottomNav = styled(BottomNavigation)({
	width: "100%",
	position: "fixed",
	bottom: 0,
	background: "linear-gradient(112.1deg, rgb(63, 76, 119) 11.4%, rgb(32, 38, 57) 70.2%)",
	zIndex: 100,
})

export default function SimpleBottomNavigation() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/") setValue(0);
		else if (location.pathname === "/movies") setValue(1);
		else if (location.pathname === "/series") setValue(2);
		else if (location.pathname === "/search") setValue(3);
		else if (location.pathname === "/actor") setValue(4);
	}, [location.pathname]);

	const handleNavigation = (newValue) => {
		if (newValue === 0) navigate("/");
		else if (newValue === 1) navigate("/movies");
		else if (newValue === 2) navigate("/series");
		else if (newValue === 3) navigate("/search");
		else if (newValue === 4) navigate("/actor");
	};

	const [value, setValue] = React.useState(0);

	return (
		<ThemeProvider theme={darkTheme}>
			<BottomNav
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction 
					label="Trending" 
					icon={<TrendingUp />} 
				/>
				<BottomNavigationAction 
					label="Movies" 
					icon={<Movie />}
				/>
				<BottomNavigationAction 
					label="TV Series" 
					icon={<Tv />} 
				/>
				<BottomNavigationAction 
					label="Search" 
					icon={<Search />} 
				/>
				<BottomNavigationAction
					label="Actor"
					icon={<TheaterComedy />}
				/>
			</BottomNav>
		</ThemeProvider>
	);
}
