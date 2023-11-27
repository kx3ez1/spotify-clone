import {useEffect, useRef, useState} from "react";
import {capitalize} from "./utils.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchFinalPlayUrl, setCurrentTime, setDuration, setIsLoaded, setIsPlaying} from "../../reducers/player.jsx";

const FixedBottomPlayer = () => {
    const dispatch = useDispatch();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const playerControl = useSelector((state) => state.player);
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const currentPlayingSong = {
        title: playerControl?.currentSong?.title,
        sub_title: playerControl?.currentSong?.more_info?.album,
        image: playerControl?.currentSong?.image,
        currentProgress: 0,
        totalDuration: 100,
        // url: playerControl?.currentSong?.more_info?.encrypted_media_url,
        url: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav'
    }


    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const replace150to500 = (url) => {
        if (url.toString().includes('-150x150')) {
            return url.replace('150x150', '500x500');
        }
        return url;
    }


    return (<div
        className={`fixed bottom-0 left-0 z-50 transition-all duration-150 ease-in-out ${isFullScreen ? 'w-screen h-screen' : 'w-full h-16'}`}
    >
        {!isFullScreen && <div className="mx-2 h-14 rounded-md bg-spotify-musicPlayer" onClick={toggleFullScreen}>
            <div className="flex flex-col">
                <div className='p-1.5 flex justify-between items-center'>
                    <div>
                        {/* album image */}
                        <img className="h-10 w-10 rounded-md" alt='img'
                             src={currentPlayingSong?.image}
                        />
                    </div>
                    <div>
                        {/* album name */}
                        <div className='text-spotify-white text-xs'>
                            {capitalize(currentPlayingSong?.title)}
                        </div>

                    </div>
                </div>
                {/*    progress bar*/}
                <div>
                    <MakeAudioPlayerV2 currentPlayingSong={currentPlayingSong}/>
                </div>
            </div>
        </div>}
        {isFullScreen &&
            <div className="h-full w-full bg-gradient-to-b from-spotify-bigPlayer_1 to-spotify-bigPlayer_2 to-90%">
                <div className="flex flex-col p-3">
                    <div className='mb-10 flex justify-between w-full'>
                        {/* minimize player button*/}
                        <div className='p-3' onClick={toggleFullScreen}>
                            <div className='w-6 h-6'>
                                <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                     fill="white"
                                >
                                    <path
                                        d="M2.793 8.043a1 1 0 0 1 1.414 0L12 15.836l7.793-7.793a1 1 0 1 1 1.414 1.414L12 18.664 2.793 9.457a1 1 0 0 1 0-1.414z"></path>
                                </svg>
                            </div>
                        </div>
                        {/* album name */}
                        <div className='text-xs w-3/4 text-center flex items-center' onClick={toggleFullScreen}>
                            <div
                                className='w-full overflow-hidden text-spotify-white whitespace-nowrap overflow-ellipsis'>
                                {capitalize(currentPlayingSong?.sub_title)}
                            </div>
                        </div>
                        <div className='p-3'>
                            <div className='w-6 h-6'>
                                <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                     fill={'white'}
                                     className="Svg-sc-ytk21e-0 iYxpxA">
                                    <path
                                        d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* album image */}
                    <div className='h-72 mb-6 p-Padding8px flex justify-center items-center'>
                        <img
                            src={replace150to500(currentPlayingSong?.image)}
                            className="w-72 h-full" alt='img'/>
                    </div>
                    {/* album title */}
                    <div className='mx-3 mb-4 flex justify-between'>
                        <div className="w-full flex flex-col">
                            <div className='text-2xl text-spotify-white font-semibold'>
                                {capitalize(currentPlayingSong?.title)}
                            </div>
                            <div>
                                {capitalize(currentPlayingSong?.sub_title)}
                            </div>
                        </div>
                        {/* like button --> heart symbol */}
                        <div className='w-12 h-12 p-1 flex items-center justify-center text-spotify-white'>
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                 fill={'currentColor'} width="24" height="24"
                                 className="Svg-sc-ytk21e-0 iYxpxA">
                                <path
                                    d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"></path>
                            </svg>
                        </div>
                    </div>
                    {/* progress bar*/}
                    {/*<MakeAudioPlayer currentPlayingSong={currentPlayingSong}/>*/}
                    <MakeAudioPlayerV2 currentPlayingSong={currentPlayingSong}/>
                    {/* player controls  */}
                    {/*-----starts here---------*/}
                    <div className='flex justify-between items-center'>
                        {/* shuffle */}
                        <div className='w-10 h-10 p-2 text-spotify-disabledBtn'>
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                 fill={'currentColor'}
                                 className="Svg-sc-ytk21e-0 iYxpxA">
                                <path
                                    d="M18.788 3.702a1 1 0 0 1 1.414-1.414L23.914 6l-3.712 3.712a1 1 0 1 1-1.414-1.414L20.086 7h-1.518a5 5 0 0 0-3.826 1.78l-7.346 8.73a7 7 0 0 1-5.356 2.494H1v-2h1.04a5 5 0 0 0 3.826-1.781l7.345-8.73A7 7 0 0 1 18.569 5h1.518l-1.298-1.298z"></path>
                                <path
                                    d="M18.788 14.289a1 1 0 0 0 0 1.414L20.086 17h-1.518a5 5 0 0 1-3.826-1.78l-1.403-1.668-1.306 1.554 1.178 1.4A7 7 0 0 0 18.568 19h1.518l-1.298 1.298a1 1 0 1 0 1.414 1.414L23.914 18l-3.712-3.713a1 1 0 0 0-1.414 0zM7.396 6.49l2.023 2.404-1.307 1.553-2.246-2.67a5 5 0 0 0-3.826-1.78H1v-2h1.04A7 7 0 0 1 7.396 6.49z"></path>
                            </svg>
                        </div>
                        {/* prev button */}
                        <div className="w-12 h-12 p-2 text-spotify-disabledBtn">
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                 fill={'currentColor'}
                                 className="Svg-sc-ytk21e-0 iaCPPY">
                                <path
                                    d="M6.3 3a.7.7 0 0 1 .7.7v6.805l11.95-6.899a.7.7 0 0 1 1.05.606v15.576a.7.7 0 0 1-1.05.606L7 13.495V20.3a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7V3.7a.7.7 0 0 1 .7-.7h1.6z"></path>
                            </svg>
                        </div>
                        {/* play and pause */}
                        <div className="w-14 h-14 bg-spotify-white flex justify-center items-center rounded-full"
                             onClick={() => dispatch(setIsPlaying(!isPlaying))}>
                            <div className="w-6 h-6">
                                {!isPlaying ?
                                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                         className="Svg-sc-ytk21e-0 iYxpxA">
                                        <path
                                            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                    </svg> :
                                    <svg data-encore-id="icon" fill={'currentColor'} role="img" aria-hidden="true"
                                         viewBox="0 0 24 24" className="Svg-sc-ytk21e-0 iYxpxA">
                                        <path
                                            d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                                    </svg>}
                            </div>
                        </div>
                        {/* next icon*/}
                        <div className="w-12 h-12 p-2 text-spotify-disabledBtn">
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                 fill={'currentColor'}
                                 className="Svg-sc-ytk21e-0 iaCPPY">
                                <path
                                    d="M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
                            </svg>
                        </div>
                        {/* mode - reply,.. */}
                        <div className="w-10 h-10 p-2 text-spotify-disabledBtn">
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                 fill={'currentColor'}
                                 className="Svg-sc-ytk21e-0 iYxpxA">
                                <path
                                    d="M6 2a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h1v-2H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-4.798l1.298-1.298a1 1 0 1 0-1.414-1.414L9.373 19l3.713 3.712a1 1 0 0 0 1.414-1.414L13.202 20H18a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H6z"></path>
                            </svg>
                        </div>
                    </div>
                    {/* share */}
                    <div className='flex justify-end'>
                        <div className='w-4 h-4'>
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" fill={'white'}
                                 className="Svg-sc-ytk21e-0 kPpCsU">
                                <path
                                    d="M12.875 2a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zM10.25 3.125a2.625 2.625 0 1 1 .754 1.841L5.75 8l5.254 3.034a2.625 2.625 0 1 1-.704 1.326l-5-2.889a2.625 2.625 0 1 1 0-2.943l5-2.888a2.634 2.634 0 0 1-.051-.516zm-7.125 3.75a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zm9.75 4.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25z"></path>
                            </svg>
                        </div>
                    </div>
                    {/*<h1>Colors</h1>*/}
                    {/*<ImageColorExtractor imageUrl={'https://i.scdn.co/image/ab67616d0000b273fac61ec6ab51254a1a4ee6b1'}/>*/}
                </div>
            </div>}
    </div>);
}

const MakeAudioPlayerV2 = ({currentPlayingSong}) => {
    const audioRef = useRef(null);
    const currentTime = useSelector((state) => state.player.currentTime);
    const duration = useSelector((state) => state.player.duration);
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const isLoaded = useSelector((state) => state.player.isLoaded);
    const currentSong = useSelector((state) => state.player.currentSong);
    const dispatch = useDispatch();

    useEffect(() => {

        const audio = audioRef.current;

        const updateTime = () => {
            dispatch(setCurrentTime(audio.currentTime));
        };

        const handleAudioLoaded = () => {
            dispatch(setIsLoaded(true));
            audio.play();
            dispatch(setIsPlaying(true));
        }

        const handleAudioEnded = () => {
            dispatch(setIsPlaying(false));
        }

        const setAudioData = () => {
            dispatch(setDuration(audio.duration));
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('loadeddata', handleAudioLoaded);
        audio.addEventListener('ended', handleAudioEnded);

        if (isPlaying) {
            audio.play();
        }
        if(!isPlaying){
            audio.pause();
        }


        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('loadeddata', handleAudioLoaded);
            audio.removeEventListener('ended', handleAudioEnded);
        };
    }, [dispatch, isLoaded, isPlaying]);

    const handleRangeChange = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        dispatch(setCurrentTime(newTime));
        // after changing the time, if the song is paused, play it
        setTimeout(() => {
        if (!isPlaying) {
            dispatch(setIsPlaying(true));
        }
        }, 1000);
    };

    return (<div>
        <audio ref={audioRef} src={currentSong?.playUrl} hidden/>
        <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleRangeChange}
            className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent"
            style={{
                background: `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${(currentTime / duration) * 100}%, #fff ${(currentTime / duration) * 100}%, white 100%)`
            }}
        />
    </div>);
};

export default FixedBottomPlayer;

