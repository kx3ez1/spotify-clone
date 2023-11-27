import { capitalize } from "../utils";
import {useDispatch, useSelector} from "react-redux";
import {fetchFinalPlayUrl, setCurrentSong} from "../../../reducers/player";
import PropTypes from "prop-types";

const SearchTile = ({ result }) => {
  const replacedTitle = result?.title.replace(/&quot;/g, '"');
    const dispatch = useDispatch();

  return (
    <div className="flex py-Padding8px" onClick={
        async () => {
          dispatch(setCurrentSong(result));
          dispatch(fetchFinalPlayUrl(result?.more_info?.encrypted_media_url));
        }
    }>
      {/* <p className="text-spotify-white">{index + 1}</p> */}
      <img src={result?.image} alt={replacedTitle} className="w-14 h-14 rounded-md" />
      <MakeSearchTileDesc
        result={result}
        replacedTitle={replacedTitle}
      />
    </div>
  );
};

SearchTile.propTypes = {
  result: PropTypes.object,
  index: PropTypes.number,
  type: PropTypes.string,
};


const MakeSearchTileDesc = ({result, replacedTitle}) => {
  return (
    <div className="ml-4">
      <div className="text-spotify-white">{replacedTitle}</div>
      <div className="text-spotify-gray">{capitalize(result?.type)} •{result?.more_info?.album}
      </div>
    </div>
  );
};

MakeSearchTileDesc.propTypes = {
  result: PropTypes.object,
  replacedTitle: PropTypes.string,
};

export { SearchTile };
