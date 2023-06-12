import React, { useEffect } from 'react';
import styled from "@mui/system/styled";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {
	Whatshot,
	Movie,
	Tv,
	Search
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BottomNav = styled(BottomNavigation)({
	width: "100%",
	position: "fixed",
	bottom: 0,
	backgroundColor: "#2d313a",
	zIndex: 100,
})

export default function SimpleBottomNavigation() {
	const [value, setValue] = React.useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		if(value === 0) 
			navigate("/");
		else if (value === 1)
			navigate("/movies");
		else if(value === 2)
			navigate("/series")
		else if(value === 3) 
			navigate("/search")
	}, [value, navigate])

	return (
		<BottomNav
			showLabels
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
		>
			<BottomNavigationAction 
				label="Trending" 
				icon={<Whatshot />} 
				style={{ color: "white" }}
			/>
			<BottomNavigationAction 
				label="Movies" 
				icon={<Movie />}
				style={{ color: "white" }} 
			/>
			<BottomNavigationAction 
				label="TV Series" 
				icon={<Tv />} 
				style={{ color: "white" }}
			/>
			<BottomNavigationAction 
				label="Search" 
				icon={<Search />} 
				style={{ color: "white" }}
			/>
		</BottomNav>
	);
}
