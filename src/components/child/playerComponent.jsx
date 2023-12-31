import { useState, useEffect } from "react";
import { capitalize, parseSanitizedHTML } from "./utils.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useAudio } from "../../app/audioContext.jsx";
import { setIsPlaying, setCurrentSong, setIsFullScreen, setQueue, setIsRepeat } from "../../reducers/player.jsx";
import { fetchFinalPlayUrl } from "../../reducers/player.jsx";
import { useNavigate } from "react-router-dom";

const FixedBottomPlayer = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.player.isFullScreen);
  const playerControl = useSelector((state) => state.player);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const history = useSelector((state) => state.player.history);
  const queue = useSelector((state) => state.player.queue);
  const currentSong = useSelector((state) => state.player.currentSong);
  const navigate = useNavigate();

  const [isNextSongAvailable, setIsNextSongAvailable] = useState(false);
  const [isPrevSongAvailable, setIsPrevSongAvailable] = useState(false);



  const currentPlayingSong = {
    title: playerControl?.currentSong?.title,
    sub_title: playerControl?.currentSong?.more_info?.album,
    image: playerControl?.currentSong?.image,
    currentProgress: 0,
    totalDuration: 100,
    // url: playerControl?.currentSong?.more_info?.encrypted_media_url,
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
  };

  const toggleFullScreen = () => {
    dispatch(setIsFullScreen(!isFullScreen));
  };

  /**
   * replace url 150x150 with 500x500 to get better quality image
   * @param {*} url
   * @returns url string
   */
  const replace150to500 = (url) => {
    if (url.toString().includes("-150x150")) {
      return url.replace("150x150", "500x500");
    }
    return url;
  };


  useEffect(() => {

    if (currentSong.id !== undefined) {
      if (currentSong && currentSong["isInHistory"]) {
        // check current song is in history or not by checking id
        let isSongInHistory = history.some((song) => song.id === currentSong.id);

        // console.log("song is in history");
        let currentSongIndex = history.findIndex((song) => song.id === currentSong.id);

        // check next song is available in history or not -- except current playing song its already in history
        if (currentSongIndex < history.length - 2 && history.length > 2) {
          setIsNextSongAvailable(true);
        } else {
          // if no next song available in history then check in queue
          if (queue.length > 0) {
            setIsNextSongAvailable(true);
          } else {
            setIsNextSongAvailable(false);
          }
        }

        // check prev song is available in history or not
        if (currentSongIndex > 0) {
          setIsPrevSongAvailable(true);
        } else {
          setIsPrevSongAvailable(false);
        }

      }
    }



    if (isFullScreen) {
      // on keyboard space to pause/play
      const handleKeyPress = (e) => {
        if (e.code === "Space") {
          dispatch(setIsPlaying(!isPlaying))
        }
      };

      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [currentSong, dispatch, history, isFullScreen, isPlaying, queue]);

  return (
    currentPlayingSong?.title && (
      <div
        className={`fixed bottom-0 left-0 z-50 transition-all duration-150 ease-in-out ${isFullScreen ? "w-full h-full" : "w-full h-16"
          }`}
      >
        {!isFullScreen && (
          <div
            className="mx-2 h-14 rounded-md bg-spotify-musicPlayer"
            onClick={toggleFullScreen}
          >
            <div className="flex flex-col">
              <div className="w-full p-1.5 flex items-center">
                <div className="flex-none">
                  {/* album image */}
                  <img
                    className="h-10 w-10 rounded-md"
                    alt="img"
                    src={currentPlayingSong?.image}
                  />
                </div>
                <div className="grow">
                  {/* album name */}
                  <div className="pl-Padding8px text-spotify-white font-semibold text-xs
                  overflow-hidden line-clamp-2 overflow-ellipsis
                  ">
                    {parseSanitizedHTML(capitalize(currentPlayingSong?.title))}
                  </div>
                </div>
                <div className="text-spotify-white flex ml-auto">
                  {/* heart symbol or Like */}
                  <div className="w-10 h-10 p-Padding8px"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <svg
                      fill={"currentColor"}
                      data-encore-id="icon"
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"></path>
                    </svg>
                  </div>
                  <div
                    className="ml-2 w-10 h-10 p-Padding8px"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setIsPlaying(!isPlaying))
                    }}
                  >
                    {/*  play or pause button */}
                    <div className="text-spotify-white">
                      {!isPlaying ? (
                        //  play button
                        <svg
                          fill={"currentColor"}
                          data-encore-id="icon"
                          role="img"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                        >
                          <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                        </svg>
                      ) : (
                        // pause button
                        <svg
                          fill={"currentColor"}
                          data-encore-id="icon"
                          role="img"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/*    progress bar*/}
              <div>
                <MiniPlayerProgressBar currentPlayingSong={currentPlayingSong} />
              </div>
            </div>
          </div>
        )}
        {isFullScreen && (
          <div className="h-full w-full bg-gradient-to-b from-spotify-bigPlayer_1 to-spotify-bigPlayer_2 to-90%">
            <div className="h-full flex flex-col p-3">
              <div className="flex justify-between w-full">
                {/* minimize player button*/}
                <div className="p-3 cursor-pointer" onClick={toggleFullScreen}>
                  <div className="w-6 h-6">
                    <svg
                      data-encore-id="icon"
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M2.793 8.043a1 1 0 0 1 1.414 0L12 15.836l7.793-7.793a1 1 0 1 1 1.414 1.414L12 18.664 2.793 9.457a1 1 0 0 1 0-1.414z"></path>
                    </svg>
                  </div>
                </div>
                {/* album name */}
                <div
                  className="text-xs w-3/4 text-center flex items-center cursor-pointer"
                  onClick={toggleFullScreen}
                >
                  <div className="w-full overflow-hidden text-spotify-white whitespace-nowrap overflow-ellipsis">
                    {parseSanitizedHTML(capitalize(currentPlayingSong?.sub_title))}
                  </div>
                </div>
                <div className="p-3">
                  <div className="w-6 h-6">
                    <svg
                      data-encore-id="icon"
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill={"white"}

                    >
                      <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              {/* album image */}
              <div className="w-full h-full mb-6 p-Padding8px flex justify-center items-center">
                <img
                  src={replace150to500(currentPlayingSong?.image)}
                  className="h-72 w-72"
                  alt="img"
                />
              </div>
              {/* album title */}
              <div className="mx-3 mb-4 flex justify-between">
                <div className="w-5/6 flex flex-col">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-spotify-white font-semibold overflow-x-scroll whitespace-nowrap hide-scrollbar">
                    {parseSanitizedHTML(capitalize(currentPlayingSong?.title))}
                  </div>
                  {/* sub title into ellipsis and capitalize */}
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-spotify-black overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {parseSanitizedHTML(capitalize(currentPlayingSong?.sub_title))}
                  </div>
                </div>
                {/* like button --> heart symbol */}
                <div className="w-12 h-12 p-1 flex items-center justify-center text-spotify-white">
                  <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill={"currentColor"}
                    width="24"
                    height="24"
                  >
                    <path d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"></path>
                  </svg>
                </div>
              </div>
              {/* progress bar*/}
              {/*<MakeAudioPlayer currentPlayingSong={currentPlayingSong}/>*/}
              <ProgressBarFullScreenPlayer currentPlayingSong={currentPlayingSong} />
              {/* player controls  */}
              {/*-----starts here---------*/}

              <div className="mt-auto pb-10">
                <div className="flex justify-between items-center">
                  {/* shuffle */}
                  <div className="w-10 h-10 p-2 text-spotify-disabledBtn">
                    <svg
                      data-encore-id="icon"
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill={"currentColor"}
                    >
                      <path d="M18.788 3.702a1 1 0 0 1 1.414-1.414L23.914 6l-3.712 3.712a1 1 0 1 1-1.414-1.414L20.086 7h-1.518a5 5 0 0 0-3.826 1.78l-7.346 8.73a7 7 0 0 1-5.356 2.494H1v-2h1.04a5 5 0 0 0 3.826-1.781l7.345-8.73A7 7 0 0 1 18.569 5h1.518l-1.298-1.298z"></path>
                      <path d="M18.788 14.289a1 1 0 0 0 0 1.414L20.086 17h-1.518a5 5 0 0 1-3.826-1.78l-1.403-1.668-1.306 1.554 1.178 1.4A7 7 0 0 0 18.568 19h1.518l-1.298 1.298a1 1 0 1 0 1.414 1.414L23.914 18l-3.712-3.713a1 1 0 0 0-1.414 0zM7.396 6.49l2.023 2.404-1.307 1.553-2.246-2.67a5 5 0 0 0-3.826-1.78H1v-2h1.04A7 7 0 0 1 7.396 6.49z"></path>
                    </svg>
                  </div>
                  {/* prev button */}
                  <div className={`w-12 h-12 p-2 ${isPrevSongAvailable ? "text-spotify-white" : "text-spotify-disabledBtn"
                    }`}
                    onClick={
                      () => {
                        if (isPrevSongAvailable) {
                          let prevSong = history.findIndex((song) => song.id === currentSong.id) - 1;
                          prevSong = history[prevSong];
                          dispatch(setCurrentSong(prevSong))
                          dispatch(fetchFinalPlayUrl(prevSong?.more_info?.encrypted_media_url));
                          dispatch(setIsPlaying(true));
                        }
                      }
                    }
                  >
                    <svg
                      data-encore-id="icon"
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill={"currentColor"}
                    >
                      <path d="M6.3 3a.7.7 0 0 1 .7.7v6.805l11.95-6.899a.7.7 0 0 1 1.05.606v15.576a.7.7 0 0 1-1.05.606L7 13.495V20.3a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7V3.7a.7.7 0 0 1 .7-.7h1.6z"></path>
                    </svg>
                  </div>
                  {/* play and pause */}
                  <div
                    className="w-14 h-14 bg-spotify-white flex justify-center items-center rounded-full"
                    onClick={() => dispatch(setIsPlaying(!isPlaying))}
                  >
                    <div className="w-6 h-6">
                      {!isPlaying ? (
                        <svg
                          data-encore-id="icon"
                          role="img"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                        >
                          <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                        </svg>
                      ) : (
                        <svg
                          data-encore-id="icon"
                          fill={"currentColor"}
                          role="img"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                  {/* next icon*/}
                  <div className={"w-12 h-12 p-2 " + (isNextSongAvailable ? "text-spotify-white" : "text-spotify-disabledBtn")}
                    onClick={
                      () => {
                        if (isNextSongAvailable) {
                          let nextSongIndex = history.findIndex((song) => song.id === currentSong.id) + 1;
                          if (nextSongIndex < history.length) {
                            let nextSong = history[nextSongIndex];
                            dispatch(setCurrentSong(nextSong))
                            dispatch(fetchFinalPlayUrl(nextSong?.more_info?.encrypted_media_url));
                            dispatch(setIsPlaying(true));
                          } else {
                            let nextSong = queue[0];
                            dispatch(setCurrentSong(nextSong))
                            dispatch(fetchFinalPlayUrl(nextSong?.more_info?.encrypted_media_url));
                            dispatch(setIsPlaying(true));
                            dispatch(setQueue(queue.slice(1)))
                          }
                        }
                      }
                    }
                  >
                    <svg
                      data-encore-id="icon"
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill={"currentColor"}
                    >
                      <path d="M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
                    </svg>
                  </div>
                  {/* mode - replay, repeat.. */}
                  <div className={"w-10 h-10 p-2 " + `${playerControl.isRepeat ? "text-spotify-green" : "text-spotify-disabledBtn"}`}
                    onClick={() => dispatch(setIsRepeat(!playerControl.isRepeat))}
                  >
                    {!playerControl.isRepeat ?
                      <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill={"currentColor"}
                      >
                        <path d="M6 2a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h1v-2H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-4.798l1.298-1.298a1 1 0 1 0-1.414-1.414L9.373 19l3.713 3.712a1 1 0 0 0 1.414-1.414L13.202 20H18a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H6z"></path>
                      </svg>

                      : <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"

                        fill={"currentColor"}
                      ><path d="M11.382 2.516c.306-.323.448-.7.448-.969h2V11h-2V5H10V3h.378c.341 0 .706-.17 1.004-.484zM1 7a5 5 0 0 1 5-5h1v2H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h1v2H6a5 5 0 0 1-5-5V7z"></path><path d="M18 4h-1V2h1a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-4.798l1.298 1.298a1 1 0 1 1-1.414 1.415L9.373 19l3.713-3.712a1 1 0 0 1 1.414 1.414L13.202 18H18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z"></path>
                      </svg>

                    }
                  </div>
                </div>

                <div className="p-3 flex justify-end items-center text-spotify-white space-x-6">
                  {/* download */}
                  {/* <div className="w-6 h-6 text-spotify-white"
                    onClick={() => {
                      if (playerControl.currentSong && playerControl.currentSong.playUrl) {
                        window.open(playerControl.currentSong.playUrl, "_blank");
                      } else {
                        // Handle the case where playUrl is not available
                        console.error("playUrl is not available for the current song");
                      }
                    }}

                  >
                    <svg enableBackground="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="  M23.995,13.089C23.996,13.059,24,13.03,24,13c0-4.418-3.582-8-8-8c-3.814,0-6.998,2.671-7.8,6.242C5.208,12.038,3,14.757,3,18  c0,3.866,3.134,7,7,7h13c3.314,0,6-2.686,6-6C29,16.026,26.834,13.564,23.995,13.089z" fill="none" id="XMLID_126_" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" /><line fill="none" id="XMLID_132_" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="16" x2="16" y1="21" y2="11" /><polyline fill="none" id="XMLID_133_" points="  12,17 16,21 20,17 " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" /></svg>

                  </div> */}

                  {/* queue */}
                  {/* <Link to="/queue"> */}
                  <div className="w-6 h-6 text-spotify-green"
                    onClick={() => {
                      dispatch(setIsFullScreen(false));
                      if (window.location.pathname !== "/queue") {
                        navigate("/queue");
                      }
                    }
                    }
                  >
                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" fill={"currentColor"}><path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path></svg>
                  </div>

                  {/* share */}
                  <div className="w-6 h-6">
                    <svg
                      data-encore-id="icon"
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill={"currentColor"}
                    >
                      <path d="M12.875 2a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zM10.25 3.125a2.625 2.625 0 1 1 .754 1.841L5.75 8l5.254 3.034a2.625 2.625 0 1 1-.704 1.326l-5-2.889a2.625 2.625 0 1 1 0-2.943l5-2.888a2.634 2.634 0 0 1-.051-.516zm-7.125 3.75a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zm9.75 4.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25z"></path>
                    </svg>
                  </div>
                </div>
                {/*<h1>Colors</h1>*/}
                {/*<ImageColorExtractor imageUrl={'https://i.scdn.co/image/ab67616d0000b273fac61ec6ab51254a1a4ee6b1'}/>*/}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

const ProgressBarFullScreenPlayer = () => {
  const { handleRangeChange, currentTime, duration } = useAudio();



  const formatTime = (time) => {
    if (isNaN(time)) {
      return "00:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="pb-Padding8px">
      <input
        id="fullScreenProgressBar"
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleRangeChange}
        className="transparent h-1 w-full cursor-pointer appearance-none rounded-sm border-transparent
        outline-none focus:outline-none focus:ring-0 focus:border-transparent
        "
        style={{
          background: `linear-gradient(to right, #fff 0%, #fff ${(currentTime / duration) * 100
            }%, #6C7171 ${(currentTime / duration) * 100}%, #6C7171 100%)`,
          WebkitAppearance: "none" /* Override default CSS styles */,
        }}
      />
      <div className="flex justify-between items-center">
        <div className="text-spotify-white text-xs">{formatTime(currentTime)}</div>
        <div className="text-spotify-white text-xs">{formatTime(duration)}</div>
      </div>
    </div>
  );
};

const MiniPlayerProgressBar = () => {
  const { currentTime, duration } = useAudio();

  return (
    <div className="mx-1">
      <div
        // type="range"
        min="0"
        max={duration}
        value={currentTime}
        className="transparent h-0.5 w-full appearance-none rounded-lg border-transparent"
        // scroll bar color - #82CFD0
        style={{
          background: `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${(currentTime / duration) * 100
            }%, #fff ${(currentTime / duration) * 100}%, white 100%)`,
        }}
      />
    </div>
  );
};

export default FixedBottomPlayer;
