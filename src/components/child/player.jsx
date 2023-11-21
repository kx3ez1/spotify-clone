import {useState} from "react";
import * as PropTypes from "prop-types";

function ImageColorExtractor(props) {
    return null;
}

ImageColorExtractor.propTypes = {imageUrl: PropTypes.string};
const FixedBottomPlayer = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);


    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (<div
        className={`fixed bottom-0 left-0 z-50 transition-all duration-150 ease-in-out ${isFullScreen ? 'w-screen h-screen' : 'w-full h-16'}`}
    >
        {!isFullScreen && <div className="mx-2 h-14 rounded-md bg-spotify-gray" onClick={toggleFullScreen}>
            <div className="flex flex-col">
                <div className='flex'>
                    <img className="" alt='img'/>
                </div>
                {/*    progress bar*/}
                <div></div>
            </div>
        </div>}
        {isFullScreen && <div className="h-full w-full bg-spotify-gray">
            <div className="flex flex-col p-3">
                <div className='flex justify-between w-full'>
                    {/* minimize player button*/}
                    <div className='p-3' onClick={toggleFullScreen}>
                        <div className='w-6 h-6'>
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" fill="white"
                            >
                                <path
                                    d="M2.793 8.043a1 1 0 0 1 1.414 0L12 15.836l7.793-7.793a1 1 0 1 1 1.414 1.414L12 18.664 2.793 9.457a1 1 0 0 1 0-1.414z"></path>
                            </svg>
                        </div>
                    </div>
                    {/* album name */}
                    <div className='text-xs w-3/4 text-center flex items-center' onClick={toggleFullScreen}>
                        <div className='w-full overflow-hidden text-spotify-white whitespace-nowrap overflow-ellipsis'> name name name hakjsa asdlk hello world</div>
                    </div>
                    <div className='p-3'>
                        <div className='w-6 h-6'>
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" fill={'white'}
                                 className="Svg-sc-ytk21e-0 iYxpxA">
                                <path
                                    d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                {/* album image */}
                <div className='h-64'>
                    <img className="w-full h-full object-cover" alt='img'/>
                </div>
                {/* album title */}
                <div className='flex justify-between'>
                    <div></div>
                    <div></div>
                </div>
                {/* progress bar*/}
                <div></div>
                {/* player controls  */}
                <div className='flex justify-between items-center'>
                    {/* shuffle */}
                    <div className='w-6 h-6'>
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                             className="Svg-sc-ytk21e-0 iYxpxA">
                            <path
                                d="M18.788 3.702a1 1 0 0 1 1.414-1.414L23.914 6l-3.712 3.712a1 1 0 1 1-1.414-1.414L20.086 7h-1.518a5 5 0 0 0-3.826 1.78l-7.346 8.73a7 7 0 0 1-5.356 2.494H1v-2h1.04a5 5 0 0 0 3.826-1.781l7.345-8.73A7 7 0 0 1 18.569 5h1.518l-1.298-1.298z"></path>
                            <path
                                d="M18.788 14.289a1 1 0 0 0 0 1.414L20.086 17h-1.518a5 5 0 0 1-3.826-1.78l-1.403-1.668-1.306 1.554 1.178 1.4A7 7 0 0 0 18.568 19h1.518l-1.298 1.298a1 1 0 1 0 1.414 1.414L23.914 18l-3.712-3.713a1 1 0 0 0-1.414 0zM7.396 6.49l2.023 2.404-1.307 1.553-2.246-2.67a5 5 0 0 0-3.826-1.78H1v-2h1.04A7 7 0 0 1 7.396 6.49z"></path>
                        </svg>
                    </div>
                    {/* prev button */}
                    <div className="w-8 h-8">
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                             className="Svg-sc-ytk21e-0 iaCPPY">
                            <path
                                d="M6.3 3a.7.7 0 0 1 .7.7v6.805l11.95-6.899a.7.7 0 0 1 1.05.606v15.576a.7.7 0 0 1-1.05.606L7 13.495V20.3a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7V3.7a.7.7 0 0 1 .7-.7h1.6z"></path>
                        </svg>
                    </div>
                    {/* play */}
                    <div className="w-14 h-14 bg-spotify-white flex justify-center items-center rounded-full">
                        <div className="w-6 h-6">
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                 className="Svg-sc-ytk21e-0 iYxpxA">
                                <path
                                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                            </svg>
                        </div>
                    </div>
                    {/* next icon*/}
                    <div className="w-8 h-8">
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                             className="Svg-sc-ytk21e-0 iaCPPY">
                            <path
                                d="M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
                        </svg>
                    </div>
                    {/* mode - reply,.. */}
                    <div className="w-6 h-6">
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                             className="Svg-sc-ytk21e-0 iYxpxA">
                            <path
                                d="M6 2a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h1v-2H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-4.798l1.298-1.298a1 1 0 1 0-1.414-1.414L9.373 19l3.713 3.712a1 1 0 0 0 1.414-1.414L13.202 20H18a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H6z"></path>
                        </svg>
                    </div>
                </div>
                {/* share */}
                <div className='flex justify-end'>
                    <div className='w-4 h-4'>
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"
                             className="Svg-sc-ytk21e-0 kPpCsU">
                            <path
                                d="M12.875 2a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zM10.25 3.125a2.625 2.625 0 1 1 .754 1.841L5.75 8l5.254 3.034a2.625 2.625 0 1 1-.704 1.326l-5-2.889a2.625 2.625 0 1 1 0-2.943l5-2.888a2.634 2.634 0 0 1-.051-.516zm-7.125 3.75a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zm9.75 4.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25z"></path>
                        </svg>
                    </div>
                </div>
                <h1>Colors</h1>
                <ImageColorExtractor imageUrl={'https://i.scdn.co/image/ab67616d0000b273fac61ec6ab51254a1a4ee6b1'}/>
            </div>
        </div>}
    </div>);
}

export default FixedBottomPlayer;

