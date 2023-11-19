import PropTypes from "prop-types";
import { capitalize } from "../utils";

const SearchTile = ({ result }) => {
  const replacedTitle = result?.title.replace(/&quot;/g, '"');

  return (
    <div className="flex py-Padding8px">
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
