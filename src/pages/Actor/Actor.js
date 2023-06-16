import {
	TextField,
	ThemeProvider,
	InputAdornment
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "./Actor.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { useLocation } from "react-router-dom";

const Actor = () => {
	const [searchText, setSearchText] = useState("");
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState();

	const [isTyping, setIsTyping] = useState(false);

	const location = useLocation();

	const darkTheme = createTheme({
		palette: {
			mode: "dark"
		},
	});

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const actorName = searchParams.get("name");
		if (actorName) {
			setSearchText(actorName);
		}
	}, [location.search]);


	const fetchSearch = async () => {
		try {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/search/person?api_key=${
					process.env.REACT_APP_API_KEY
				}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
			);
			setNumOfPages(data.total_pages)

			const actors = data.results;

			const fetchAndAppendData = async (actor) => {
				const actorId = actor.id;
				const { data: actorData } = await axios.get(
					`https://api.themoviedb.org/3/person/${actorId}?api_key=${
						process.env.REACT_APP_API_KEY
					}&language=en-US`
				);
				actor.details = actorData;
				return actor;
			};

			const updatedActors = await Promise.all(actors.map(fetchAndAppendData));
			setContent(updatedActors);
		} catch (error) {
			console.error(error);
		}
	};


	useEffect(() => {
		fetchSearch();
		// eslint-disable-next-line
	}, [page, content]);

	const handleSearchSubmit = () => {
		fetchSearch();
	};

	const handleInputChange = (e) => {
		setSearchText(e.target.value);
		setIsTyping(e.target.value.trim() !== "");
		setPage(1);
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if(searchText && isTyping) {
				fetchSearch();
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [searchText, isTyping]);

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<div className="search">
					<TextField
						style={{ flex: 1 }}
						className="searchBox"
						label="Search"
						variant="outlined"
						placeholder="actor"
						color="secondary"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									{!isTyping && (
										<div onClick={handleSearchSubmit}>
											<SearchIcon />
										</div>
									)}
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
								{isTyping && (
									<div
										onClick={handleSearchSubmit}
										style={{ cursor: "pointer" }}
									>
										<SearchIcon />
									</div>
								)}
								</InputAdornment>
							),
							classes: {
								root: "inputRoot",
								adornedStart: "inputAdornedStart",
							},
						}}
						onChange={handleInputChange}
					/>
				</div>
			</ThemeProvider>
			<div className="trending">
				{content && 
					content.map((c) => (
						<SingleContent
							key={c.id}
							id={c.id}
							poster={c.profile_path}
							title={c.name}
							date={c.details.birthday || "Unknown"}
							media_type={c.known_for_department}
							vote_average={c.popularity}
							data={c}
						/>
					))	
				}
				{searchText && content.length === 0 && (
            		<h2>No Actor/Actress Found</h2>
          		)}
			</div>
			{numOfPages > 1 && (
        		<CustomPagination setPage={setPage} numOfPages={numOfPages > 500 ? 500 : numOfPages} />
      		)}
		</div>
	)
}

export default Actor;