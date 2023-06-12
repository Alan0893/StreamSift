import * as React from 'react';
import styled from "@mui/system/styled";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {
	Whatshot,
	Movie,
	Tv,
	Search
} from '@mui/icons-material'

const BottomNav = styled(BottomNavigation)({
	width: "100%",
	position: "fixed",
	bottom: 0,
	backgroundColor: "#2d313a",
	zIndex: 100,
})

export default function SimpleBottomNavigation() {
	const [value, setValue] = React.useState(0);

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
