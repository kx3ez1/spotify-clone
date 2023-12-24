import { useNavigate } from 'react-router-dom';
import { parseSanitizedHTML, replace150to500 } from './utils';


const SpotifyHorizontalScrollView = ({ children, category }) => {
    return (
        children &&
        <div className=''>
            {
                category &&
                <h2 className="
                
                px-Padding16px
                overflow-hidden
                whitespace-nowrap
                overflow-ellipsis
                text-spotify-white font-bold text-18px">{category}</h2>}
            <div className="px-Padding8px flex overflow-x-scroll hide-scrollbar"
            >
                {children}
            </div>
        </div>
    );
}


const AlbumCardV2 = ({ data }) => {

    const navigate = useNavigate();

    return (
        <div className="p-2 flex flex-col cursor-pointer"
            onClick={async () => {
                navigate(`/album/${data.id}`);
            }}
        >
            <div className="w-36 h-36">
                <img className="w-full h-full rounded-md max-w-full" src={replace150to500(data.image)} alt={data.title} />
            </div>
            <div className="
            p-2
            text-spotify-white text-sm
            line-clamp-3 overflow-hidden overflow-ellipsis
            ">{
                    parseSanitizedHTML(data.title)
                }</div>
        </div>
    );
}

const ArtistCardV2 = ({ data }) => {

    const navigate = useNavigate();

    const extractArtistToken = (result) => {
        let artistToken = "";
        let artistUrlSplit = result?.perma_url.split("/");
        // get last element of array
        artistToken = artistUrlSplit[artistUrlSplit.length - 1];
        return artistToken;
    };

    return (
        <div className="p-2 flex flex-col cursor-pointer"
            onClick={async () => {
                navigate(`/artist/${extractArtistToken(data)}`);
            }}
        >
            <div className="w-36 h-36">
                <img className="w-full h-full rounded-md max-w-full" src={replace150to500(data.image)} alt={data.title} />
            </div>
            <div className="p-2
            text-spotify-white text-sm
            line-clamp-3 overflow-hidden overflow-ellipsis">{
                    parseSanitizedHTML(data.title)
                }</div>
        </div>
    );
}


const PlaylistCardV2 = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className="p-2 flex flex-col cursor-pointer"
            onClick={async () => {
                navigate(`/playlist/${data.id}`);
            }}
        >
            <div className="w-36 h-36">
                <img className="w-full h-full rounded-md max-w-full" src={replace150to500(data.image)} alt={data.title} />
            </div>
            <div className="p-2
            text-spotify-white text-sm
            line-clamp-3 overflow-hidden overflow-ellipsis">{
                    parseSanitizedHTML(data.title)
                }</div>
        </div>
    );
}


export {
    AlbumCardV2,
    ArtistCardV2,
    PlaylistCardV2,
    SpotifyHorizontalScrollView,
}