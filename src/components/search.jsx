import { useEffect } from "react";
import NavMenu from "./child/navigationMenu.jsx";
import LibraryComponent from "./child/libraryComponent.jsx";
import TopNav from "./child/topNavigation.jsx";
import {
  fetchSearchSongs,
  fetchSearchAlbums,
  fetchSearchArtists,
  fetchSearchPlaylists,
} from "../reducers/searchRequests.jsx";
import { useDispatch, useSelector } from "react-redux";
import * as searchReducer from "../reducers/search.jsx";
import { capitalize, isObjectEmpty } from "./child/utils.jsx";
import {
  SearchAlbumTile,
  SearchArtistTile,
  SearchPlaylistTile,
  SearchSongTile,
} from "./child/searchTileComponent.jsx";
import { useParams, useNavigate } from "react-router-dom";

function SearchComponent() {
  const state = useSelector((state) => state.search);
  const currentSong = useSelector((state) => state.player.currentSong);
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

      // fetch search results
      if (searchType === "tracks") {
        dispatch(fetchSearchSongs(query));
      } else if (searchType === "artists") {
        dispatch(fetchSearchArtists(query));
      } else if (searchType === "albums") {
        dispatch(fetchSearchAlbums(query));
      } else if (searchType === "playlists") {
        dispatch(fetchSearchPlaylists(query));
      }
    }
  }, [dispatch, query, searchType]);

  return (
    <div className="bg-spotify-black w-screen h-screen p-2 flex">
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

      <div className={`w-full h-full pl-2 ${isObjectEmpty(currentSong) ? '' : 'pb-20'}`}>
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
                  if (state.query === "") {
                    return;
                  }
                  // set this tag as active
                  navigate(`/search/${state.query}/${tag.param}`);
                }}
                className={`
                md:cursor-pointer
                 rounded-full px-2 py-1 ${tag.active
                    ? "bg-spotify-white text-spotify-black"
                    : "bg-opacity-25 bg-spotify-gray hover:bg-opacity-50 text-spotify-white"
                  }`}
              >
                {capitalize(tag.name)}
              </div>
            ))}
          </div>

          <div className="h-full w-full">
            <div className="pt-Padding8px"></div>
            {/* search results - songs*/}
            {tagList &&
              tagList[0].active &&
              state.searchResults.songs &&
              state.searchResults.songs["results"] &&
              state.searchResults.songs["results"].length > 0 &&
              state.searchResults.songs["results"].map((result, index) => (
                <SearchSongTile key={result.id} result={result} index={index} />
              ))}

            {/* search results - artists*/}
            {tagList &&
              tagList[1].active &&
              state.searchResults.artists &&
              state.searchResults.artists["results"] &&
              state.searchResults.artists["results"].length > 0 &&
              state.searchResults.artists["results"].map((result, index) => (
                <SearchArtistTile
                  key={result.id}
                  result={result}
                  index={index}
                />
              ))}

            {/* search results - albums*/}
            {tagList &&
              tagList[2].active &&
              state.searchResults.albums &&
              state.searchResults.albums["results"] &&
              state.searchResults.albums["results"].length > 0 &&
              state.searchResults.albums["results"].map((result, index) => (
                <SearchAlbumTile
                  key={result.id}
                  result={result}
                  index={index}
                />
              ))}

            {/* search results - playlists*/}
            {tagList &&
              tagList[3].active &&
              state.searchResults.playlists &&
              state.searchResults.playlists["results"] &&
              state.searchResults.playlists["results"].length > 0 &&
              state.searchResults.playlists["results"].map((result, index) => (
                <SearchPlaylistTile
                  key={result.id}
                  result={result}
                  index={index}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
