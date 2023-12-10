import { capitalize } from "../utils";
import { useDispatch } from "react-redux";
import { fetchFinalPlayUrl, setCurrentSong } from "../../../reducers/player";
import PropTypes from "prop-types";

const SearchSongTile = ({ result }) => {
  const replacedTitle = result?.title.replace(/&quot;/g, '"');
  const dispatch = useDispatch();

  return (
    <div
      className="flex py-Padding8px"
      onClick={async () => {
        dispatch(setCurrentSong(result));
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
        {capitalize(result?.type)} •{result?.more_info?.album}
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
  const replacedTitle = result?.title.replace(/&quot;/g, '"');
  // const dispatch = useDispatch();

  return (
    <div
      className="flex py-Padding8px"
      onClick={async () => {
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
  const replacedTitle = result?.name.replace(/&quot;/g, '"');
  // const dispatch = useDispatch();

  return (
    <div
      className="flex py-Padding8px"
      onClick={async () => {
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
  const replacedTitle = result?.title.replace(/&quot;/g, '"');
  // const dispatch = useDispatch();

  return (
    <div
      className="flex py-Padding8px"
      onClick={async () => {
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
