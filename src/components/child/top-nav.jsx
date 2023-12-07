import { useEffect, useRef } from "react";
import propTypes from "prop-types";
import NavBackArrow from "./../../assets/nav-back-arrow.svg";
import { useSelector } from "react-redux";

const TopNav = (props) => {
  const searchInputRef = useRef(null);
  const searchMobileInputRef = useRef(null);
  const searchMobileClearIconRef = useRef(null);
  const searchQuery = useSelector((state) => state.search.query);

  useEffect(() => {
    if (searchQuery) {
      searchMobileInputRef.current.value = searchQuery;
      searchInputRef.current.value = searchQuery;
    }
    if (searchMobileInputRef.current.value.length === 0) {
      searchMobileClearIconRef.current.style.display = "none";
    }
  }, [searchQuery]);

  return (
    <div className={`h-14 bg-spotify-black`}>
      <div className="flex">
        {/* navigation @laptop */}
        <div className="md:flex space-x-4 p-6 hidden">
          <div className="rounded-full w-7 h-7 flex justify-center bg-spotify-black">
            <div className="self-center w-3 h-3 border-t-2 border-l-2 border-white transform -rotate-45 cursor-pointer flex justify-center"></div>
          </div>
          <div className="rounded-full w-7 h-7 flex justify-center bg-spotify-black">
            <div className="self-center w-3 h-3 border-b-2 border-r-2 border-white transform -rotate-45 cursor-pointer"></div>
          </div>
        </div>
        {/* search input @laptop */}
        <div
          className={`md:flex hidden w-96 h-12 justify-center ${
            props?.showSearch ? "" : "hidden"
          }`}
        >
          <input
            className="w-full h-full rounded-full"
            type="text"
            placeholder="What do you want to listen to?"
            ref={searchInputRef}
            onChange={() => props?.searchInput(searchInputRef.current?.value)}
          />
        </div>
        {/*  search input @mobile */}
        <div className={`md:hidden flex p-Padding8px w-full`}>
          <img
            src={NavBackArrow}
            alt="back arrow"
            className="w-6 h-6 self-center"
          />
          {/* input container */}
          <div className="flex w-full h-full ml-4">
            {/* search icon container */}
            <div
              className="w-10 h-10 p-0.5 bg-white flex rounded-l-md"
              onClick={() => {
                searchMobileInputRef.current.focus();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 self-center m-2 justify-center cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <div className="relative w-full h-full">
              <input
                className="w-full h-full pr-10 rounded-r-md outline-none text-sm"
                ref={searchMobileInputRef}
                onChange={() => {
                  // set input font weight to 600 on input
                  searchMobileInputRef.current.style.fontWeight = "600";

                  props?.searchInput(searchMobileInputRef.current?.value);
                  // show clear icon
                  // searchMobileClearIconRef.current.style.display = "block";
                  // on empty input hide clear icon
                  if (searchMobileInputRef.current?.value.length === 0) {
                    searchMobileClearIconRef.current.style.display = "none";
                    // set input font weight to 400 on clear
                    searchMobileInputRef.current.style.fontWeight = "400";
                  } else {
                    // show clear icon
                    searchMobileClearIconRef.current.style.display = "block";
                  }
                }}
                placeholder="What do you want to listen to?"
              />
              <svg
                ref={searchMobileClearIconRef}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={(e) => {
                  // clear search input --> clear search results
                  props?.searchInput("");
                  searchMobileInputRef.current.value = "";
                  // hide on click
                  e.target.style.display = "none";
                  searchMobileInputRef.current.focus();
                  // set input font weight to 400 on clear
                  searchMobileInputRef.current.style.fontWeight = "400";
                }}
                className={`w-6 h-6 absolute right-0 top-0 m-2 cursor-pointer select-none hidden`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6L18 18M6 18L18 6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TopNav.propTypes = {
  showSearch: propTypes.bool,
  searchInput: propTypes.func,
};

export default TopNav;
