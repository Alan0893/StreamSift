import { Pagination } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
	palette: {
		text: {
			primary: "white",
		}
	}
})

const CustomPagination = ({ setPage, numOfPages=10 }) => {
	const handlePageChange = (event, page) => {
		setPage(page);
		window.scroll(0, 0);
	}

	return (
		<div 
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				marginTop: 10,
			}}
		>
			<ThemeProvider theme={darkTheme}>
				<Pagination 
					count={numOfPages} 
					onChange={handlePageChange}
					color="primary"
				/>
			</ThemeProvider>
		</div>
	)
}

export default CustomPagination;