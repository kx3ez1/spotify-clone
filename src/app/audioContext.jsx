// AudioContext.js
import { createContext, useContext, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsPlaying,
  setDuration,
  setCurrentTime,
  setReadyState,
} from "./../reducers/player";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const duration = useSelector((state) => state.player.duration);
  const currentTime = useSelector((state) => state.player.currentTime);
  const audioRef = useRef(new Audio());
  const currentSong = useSelector((state) => state.player.currentSong);
  const readyState = useSelector((state) => state.player.readyState);
  const dispatch = useDispatch();

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
        audioInstance.play();
      } else {
        audioInstance.pause();
      }

      const handleTimeUpdate = () => {
        dispatch(setCurrentTime(audioInstance.currentTime));
      };

      const handleDurationChange = () => {
        dispatch(setDuration(audioInstance.duration));
      };

      audioInstance.addEventListener("timeupdate", handleTimeUpdate);
      audioInstance.addEventListener("durationchange", handleDurationChange);
      audioInstance.addEventListener("play", () =>
        dispatch(setIsPlaying(true))
      );
      audioInstance.addEventListener("pause", () =>
        dispatch(setIsPlaying(false))
      );

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
      };
    }
  }, [isPlaying, dispatch, currentSong?.playUrl, readyState]);

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
