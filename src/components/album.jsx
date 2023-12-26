import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "../app/constants.jsx";
import { SearchSongTile } from "./child/searchTileComponent";
import { BackNavigationWithTitle, LoadingComponent } from "./child/commonComponents.jsx";
import { parseSanitizedHTML } from "./child/utils.jsx";
import FixedBottomPlayer from "./child/playerComponent.jsx";

const AlbumViewComponent = () => {

    const { albumId } = useParams();
    let fetchAlbumUrl = SERVER_ADDRESS + `/album?id=${albumId}`;

    const [albumData, setAlbumData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(fetchAlbumUrl)
            .then(response => {
                if (!response.ok) { throw new Error('Network response was not ok'); }
                return response.json();
            })
            .then(data => {
                // set your state here
                setAlbumData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
        , [fetchAlbumUrl, albumId]);



    return (
        <div className="bg-spotify-black">
            {!isLoading ? <div className='h-screen w-screen'>
                <div>
                    <FixedBottomPlayer />
                    {/* back button */}
                    {/* navigation */}
                    {/* <div className='h-14 w-full opacity-30 bg-black sticky'></div> */}
                    {/* content */}
                    <div>
                        <BackNavigationWithTitle title={
                            albumData.title ? albumData.title : ''
                        }
                            navColor={
                                'bg-spotify-playlist_1'
                            }
                        />
                        <div className="bg-gradient-to-b from-spotify-playlist_1 to-spotify-black to-90%">

                            <div className='p-Padding16px'>
                                {/* image */}
                                <div className="h-40 mb-6 p-Padding8px flex justify-center items-center">
                                    <img
                                        src={albumData.image}
                                        className="w-40 h-full"
                                        alt="img"
                                    />
                                </div>
                                {/* title */}
                                <div className="text-spotify-white text-3xl font-bold mb-4">
                                    {parseSanitizedHTML(albumData.title ? albumData.title : '')}
                                </div>
                                {/*  make description */}
                                <div>
                                    {/* sub title */}
                                    <div className="text-spotify-lightGray text-base">
                                        {albumData.type ? albumData.type : ''}
                                    </div>
                                    {/* lang */}
                                    <div className="text-spotify-lightGray text-base flex">
                                        {albumData.language ? albumData.language : ''}
                                        {albumData.language && albumData.year ? ' • ' : ''}
                                        {albumData.year ? albumData.year : ''}
                                    </div>
                                    {/* subtitle */}
                                    <div className="text-sm text-spotify-lightGray line-clamp-2 overflow-hidden overflow-ellipsis">
                                        {albumData.subtitle ? albumData.subtitle : ''}
                                    </div>
                                </div>
                                <div>
                                    {/* count */}
                                    <div className="text-white text-base">
                                        {albumData.list_count > 1 ? albumData.list_count + ' songs' : ''}
                                        {albumData.list_count == 1 ? albumData.list_count + ' song' : ''}
                                    </div>
                                </div>
                                {/* buttons */}
                                <div className='w-full flex items-center'>
                                    {/*  like or heart symbol */}
                                    <div className='py-3 pr-3 text-spotify-iconColor1'>
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
                                    {/* share button */}
                                    <div className='p-3 text-spotify-iconColor1'>
                                        <svg
                                            data-encore-id="icon"
                                            role="img"
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            fill={"currentColor"}
                                        ><path d="M3 8a1 1 0 0 1 1-1h3.5v2H5v11h14V9h-2.5V7H20a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8z"></path><path d="M12 12.326a1 1 0 0 0 1-1V3.841l1.793 1.793a1 1 0 1 0 1.414-1.414L12 .012 7.793 4.22a1 1 0 1 0 1.414 1.414L11 3.84v7.485a1 1 0 0 0 1 1z"></path></svg>
                                    </div>
                                    {/* three dots menu */}
                                    <div className='p-3 text-spotify-iconColor1'>
                                        <svg
                                            data-encore-id="icon"
                                            role="img"
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            fill={"currentColor"}
                                            width="24"
                                            height="24"
                                        ><path d="M10.5 4.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0 15a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0-7.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path></svg>
                                    </div>

                                    <div className='ml-auto'>
                                        {/* play or pause button */}
                                        <div className='p-4 bg-spotify-green rounded-full'>
                                            <svg
                                                className='w-6 h-6'
                                                data-encore-id="icon"
                                                role="img"
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                            ><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-Padding8px bg-spotify-black pb-20'>
                            {/* song list view */}
                            {albumData.list &&
                                albumData.list.map((song, index) => {
                                    return <SearchSongTile key={song.id} result={song} index={index} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
                : <LoadingComponent />
            }
        </div>
    );
}

export default AlbumViewComponent;