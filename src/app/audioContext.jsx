// AudioContext.js
import { createContext, useContext, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsPlaying,
  setDuration,
  setCurrentTime,
  setReadyState,
  setCurrentSong,
  setQueue,
} from "./../reducers/player";

import { fetchFinalPlayUrl } from "./../reducers/player";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const duration = useSelector((state) => state.player.duration);
  const currentTime = useSelector((state) => state.player.currentTime);
  const audioRef = useRef(new Audio());
  const currentSong = useSelector((state) => state.player.currentSong);
  const readyState = useSelector((state) => state.player.readyState);
  const playerControls = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const queue = useSelector((state) => state.player.queue);
  const history = useSelector((state) => state.player.history);

  useEffect(() => {
    const audioInstance = audioRef.current;
    const playUrl = currentSong?.playUrl;

    // update readyState
    if (audioInstance.readyState !== readyState) {
      dispatch(setReadyState(audioInstance.readyState));
    }

    if (playUrl) {
      if (audioInstance.src !== playUrl) {
        audioInstance.src = playUrl;
      }
      if (isPlaying) {
        let playPromise = audioInstance.play();
        if (playPromise !== undefined) {
          playPromise
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
              dispatch(setIsPlaying(false));
              alert("Oops! Something went wrong. Please refresh the page and try again.")
              window.location.reload();
            });
        }
      } else {
        audioInstance.pause();
      }

      const handleTimeUpdate = () => {
        dispatch(setCurrentTime(audioInstance.currentTime));
      };

      const handleDurationChange = () => {
        dispatch(setDuration(audioInstance.duration));
      };

      const handleEnded = () => {

        if (playerControls.isRepeat) {
          // if the song url is not valid then it will not play same song
          // audioInstance.currentTime = 0;
          // audioInstance.play();
          // return;
          dispatch(setCurrentSong(currentSong));
          dispatch(fetchFinalPlayUrl(currentSong?.more_info?.encrypted_media_url));
          dispatch(setIsPlaying(true));
          return;
        }

        // automatic play next song
        if (queue.length === 0 && history.length === 0) {
          return;
        }

        let nextSongIndex = history.findIndex((song) => song.id === currentSong.id) + 1;
        if (nextSongIndex < history.length) {
          dispatch(setCurrentSong(history[nextSongIndex]));
          dispatch(fetchFinalPlayUrl(history[nextSongIndex]?.more_info?.encrypted_media_url));
          dispatch(setIsPlaying(true));
        } else {
          dispatch(setCurrentSong(queue[0]));
          dispatch(fetchFinalPlayUrl(queue[0]?.more_info?.encrypted_media_url));
          dispatch(setIsPlaying(true));
          dispatch(setQueue(queue.slice(1)));
        }
        return;
      };

      audioInstance.addEventListener("timeupdate", handleTimeUpdate);
      audioInstance.addEventListener("durationchange", handleDurationChange);
      audioInstance.addEventListener("play", () =>
        dispatch(setIsPlaying(true))
      );
      audioInstance.addEventListener("pause", () =>
        dispatch(setIsPlaying(false))
      );

      audioInstance.addEventListener("ended", handleEnded);
      return () => {
        audioInstance.removeEventListener("timeupdate", handleTimeUpdate);
        audioInstance.removeEventListener(
          "durationchange",
          handleDurationChange
        );
        audioInstance.removeEventListener("play", () =>
          dispatch(setIsPlaying(true))
        );
        audioInstance.removeEventListener("pause", () =>
          dispatch(setIsPlaying(false))
        );
        audioInstance.removeEventListener("ended", handleEnded);
      };
    }
  }, [isPlaying, dispatch, currentSong?.playUrl, readyState, queue, currentSong, playerControls.isRepeat, history]);

  const togglePlay = () => {
    dispatch(
      setIsPlaying((prevPlaying) => {
        if (!audioRef.current.src) {
          audioRef.current.src = currentSong?.playUrl;
        }

        if (prevPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }

        return !prevPlaying;
      })
    );
  };

  const handleRangeChange = (e) => {
    // dispatch(setCurrentTime(e.target.value));
    audioRef.current.currentTime = e.target.value;
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        audioRef,
        duration,
        currentTime,
        readyState,
        togglePlay,
        handleRangeChange,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
