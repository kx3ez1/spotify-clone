import { useEffect } from "react";
import NavMenu from "./child/nav-menu.jsx";
import LibraryComponent from "./child/library.jsx";
import TopNav from "./child/top-nav.jsx";
import { fetchSearch } from "../reducers/search.jsx";
import { useDispatch, useSelector } from "react-redux";
import * as searchReducer from "../reducers/search.jsx";
import { capitalize } from "./child/utils.jsx";
import { SearchTile } from "./child/search/SearchTile.jsx";
import FixedBottomPlayer from "./child/player.jsx";
import { useParams, useNavigate } from "react-router-dom";

function SearchComponent() {
  const state = useSelector((state) => state.search);
  const dispatch = useDispatch();
  // get query from url
  const { query, searchType } = useParams();
  const navigate = useNavigate();

  const tagList = useSelector((state) => state.search.tagList);

  const handleSearchInputChange = (val) => {
    dispatch(searchReducer.setQuery(val));
    let activeTag = tagList.find((tag) => tag.active);
    if (val === "") {
      navigate("/search");
      return;
    }
    if (!activeTag) {
      // if no tag is active, set songs as active
      activeTag = tagList[0];
    }
    const makeUrl = `/search/${val}/${activeTag.param}`;
    navigate(makeUrl);
  };

  useEffect(() => {
    if (query) {
      dispatch(searchReducer.setQuery(query));
    }

    if (searchType) {
      dispatch(searchReducer.setSearchType(searchType));
    }

    dispatch(fetchSearch(query));
  }, [dispatch, query, searchType]);

  return (
    <div className="bg-spotify-black w-screen h-screen p-2 flex">
      <FixedBottomPlayer />
      {/* side menu */}
      {/* hidden in @mobile */}
      <div className="w-1/4 hidden md:block">
        <div>
          {/* nav menu component*/}
          <NavMenu />
        </div>
        <div className="pt-2">
          {/* library component*/}
          <LibraryComponent />
        </div>
      </div>

      <div className="w-full h-full pl-2">
        <div className="rounded-lg w-full h-full overflow-y-scroll">
          {/* search input field*/}
          <TopNav showSearch={true} searchInput={handleSearchInputChange} />

          {/* -------------- search results ----------------------- */}

          {/* search tags*/}
          <div className="pl-Padding8px flex space-x-2 mt-2 overflow-x-scroll select-none">
            {tagList.map((tag) => (
              // generate uniq id for each tag and use it as key
              <div
                key={Math.random()}
                onClick={() => {
                  // set this tag as active
                  navigate(`/search/${state.query}/${tag.param}`);
                }}
                className={`
                md:cursor-pointer
                 rounded-full px-2 py-1 ${
                   tag.active
                     ? "bg-spotify-white text-spotify-black"
                     : "bg-opacity-25 bg-spotify-gray hover:bg-opacity-50 text-spotify-white"
                 }`}
              >
                {capitalize(tag.name)}
              </div>
            ))}
          </div>

          <div className="h-full w-full">
            {/* search results*/}
            {state.searchResults["results"].map((result, index) => (
              <SearchTile key={result.id} result={result} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
