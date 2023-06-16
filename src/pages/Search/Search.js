import {
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  InputAdornment
} from "@mui/material";
import { createTheme } from "@mui/material/styles"
import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { useLocation } from "react-router-dom";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const [isTyping, setIsTyping] = useState(false); // Track typing state

  const location = useLocation();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const mediaName = searchParams.get("name");
		if (mediaName) {
			setSearchText(mediaName);
		}
	}, [location.search]);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page, content]);

  const handleSearchSubmit = () => {
    fetchSearch();
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setIsTyping(e.target.value.trim() !== "");
    setPage(1); // Reset page number when the search text changes
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText && isTyping) {
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
            placeholder="search movie/series"
            color="primary"
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
        <div className="center-tabs">
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
          >
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search TV Series" />
          </Tabs>
        </div>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
          {searchText && content.length === 0 && (
            type === 0 ? <h2>No Movies Found</h2> : <h2>No Series Found</h2>
          )}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages > 500 ? 500 : numOfPages} />
      )}
    </div>
  );
};

export default Search;
