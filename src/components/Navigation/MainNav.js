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
import { useNavigate } from 'react-router-dom';
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
	const [value, setValue] = React.useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		if (value === 0) navigate("/");
		else if (value === 1) navigate("/movies");
		else if (value === 2) navigate("/series");
		else if (value === 3) navigate("/search");
		else if (value === 4) navigate("/actor");
	}, [value, navigate])

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
