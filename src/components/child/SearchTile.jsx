import { capitalize, parseSanitizedHTML } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinalPlayUrl, setCurrentSong, setIsPlaying, setQueue } from "../../reducers/player";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SearchSongTile = ({ result }) => {
  const replacedTitle = parseSanitizedHTML(result?.title)
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.player.queue);

  return (
    <div
      className="flex py-Padding8px cursor-pointer"
      onClick={async () => {
        dispatch(setCurrentSong(result));
        dispatch(setIsPlaying(true));
        dispatch(fetchFinalPlayUrl(result?.more_info?.encrypted_media_url));
      }}
    >
      {/* <p className="text-spotify-white">{index + 1}</p> */}
      <img
        src={result?.image}
        alt={replacedTitle}
        className="w-14 h-14 rounded-md"
      />
      <MakeSearchTileDesc result={result} replacedTitle={replacedTitle} />

      <div className="p-3 ml-auto flex items-center">
        <div className="w-4 h-4 text-spotify-iconColor1"

          onClick={
            async (e) => {
              e.stopPropagation();
              if (queue?.length > 0) {
                let newQueue = [...queue];
                newQueue.push(result);
                dispatch(setQueue(newQueue));
              } else {
                dispatch(setQueue([result]));
              }

              alert("Song added to queue");
            }
          }

        >
          <svg
            fill={'currentColor'}
            data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path></svg>
        </div>
      </div>
    </div>
  );
};

SearchSongTile.propTypes = {
  result: PropTypes.object,
  index: PropTypes.number,
  type: PropTypes.string,
};

const MakeSearchTileDesc = ({ result, replacedTitle }) => {
  return (
    <div className="ml-4">
      <div className="text-spotify-white">{replacedTitle}</div>
      <div className="text-spotify-gray">
        {capitalize(result?.type)} •{parseSanitizedHTML(result?.more_info?.album)}
      </div>
    </div>
  );
};

MakeSearchTileDesc.propTypes = {
  result: PropTypes.object,
  replacedTitle: PropTypes.string,
};

const SearchAlbumTileDescription = ({ result, replacedTitle }) => {
  return (
    <div className="ml-4 w-full overflow-hidden flex flex-col justify-center">
      <div className="text-spotify-white w-full line-clamp-2 overflow-hidden overflow-ellipsis">
        {replacedTitle}
      </div>
      <div className="text-spotify-gray">{capitalize(result?.type)}</div>
    </div>
  );
};

SearchAlbumTileDescription.propTypes = {
  result: PropTypes.object,
  replacedTitle: PropTypes.string,
};

const SearchAlbumTile = ({ result }) => {
  const replacedTitle = parseSanitizedHTML(result?.title)
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="flex py-Padding8px"
      onClick={async () => {
        navigate(`/album/${result?.id}`);
      }}
    >
      {/* <p className="text-spotify-white">{index + 1}</p> */}
      <img
        src={result?.image}
        alt={replacedTitle}
        className="w-14 h-14 rounded-md"
      />
      <SearchAlbumTileDescription
        result={result}
        replacedTitle={replacedTitle}
      />
    </div>
  );
};

SearchAlbumTile.propTypes = {
  result: PropTypes.object,
  index: PropTypes.number,
  type: PropTypes.string,
};

const SearchTileDescriptionArtist = ({ result, replacedTitle }) => {
  return (
    <div className="ml-4 w-full overflow-hidden flex flex-col justify-center">
      <div className="text-spotify-white w-full line-clamp-2 overflow-hidden overflow-ellipsis">
        {replacedTitle}
      </div>
      <div className="text-spotify-gray">{capitalize(result?.type)}</div>
    </div>
  );
};

SearchTileDescriptionArtist.propTypes = {
  result: PropTypes.object,
  replacedTitle: PropTypes.string,
};

const SearchArtistTile = ({ result }) => {
  const replacedTitle = parseSanitizedHTML(result?.name)
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const extractArtistToken = (result) => {
    let artistToken = "";
    let artistUrlSplit = result?.perma_url.split("/");
    // get last element of array
    artistToken = artistUrlSplit[artistUrlSplit.length - 1];
    return artistToken;
  };

  return (
    <div
      className="flex py-Padding8px"
      onClick={async () => {
        navigate(`/artist/${extractArtistToken(result)}`);

        // dispatch(setCurrentSong(result));
        // dispatch(fetchFinalPlayUrl(result?.more_info?.encrypted_media_url));
      }}
    >
      {/* <p className="text-spotify-white">{index + 1}</p> */}
      <img
        src={result?.image}
        alt={replacedTitle}
        className="w-14 h-14 rounded-full"
      />
      <SearchTileDescriptionArtist
        result={result}
        replacedTitle={replacedTitle}
      />
    </div>
  );
};

SearchArtistTile.propTypes = {
  result: PropTypes.object,
  index: PropTypes.number,
  type: PropTypes.string,
};

const SearchPlaylistTileDescription = ({ result, replacedTitle }) => {
  return (
    <div className="ml-4 w-full overflow-hidden flex flex-col justify-center">
      <div className="text-spotify-white w-full line-clamp-2 overflow-hidden overflow-ellipsis">
        {replacedTitle}
      </div>
      <div className="text-spotify-gray">{capitalize(result?.type)}</div>
    </div>
  );
};

SearchPlaylistTileDescription.propTypes = {
  result: PropTypes.object,
  replacedTitle: PropTypes.string,
};

const SearchPlaylistTile = ({ result }) => {
  const replacedTitle = parseSanitizedHTML(result?.title)
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="flex py-Padding8px"
      onClick={async () => {
        navigate(`/playlist/${result?.id}`);
        // dispatch(setCurrentSong(result));
        // dispatch(fetchFinalPlayUrl(result?.more_info?.encrypted_media_url));
      }}
    >
      {/* <p className="text-spotify-white">{index + 1}</p> */}
      <img
        src={result?.image}
        alt={replacedTitle}
        className="w-14 h-14 rounded-md"
      />
      <SearchPlaylistTileDescription
        result={result}
        replacedTitle={replacedTitle}
      />
    </div>
  );
};

SearchPlaylistTile.propTypes = {
  result: PropTypes.object,
  index: PropTypes.number,
  type: PropTypes.string,
};

export {
  SearchSongTile,
  SearchAlbumTile,
  SearchArtistTile,
  SearchPlaylistTile,
};
