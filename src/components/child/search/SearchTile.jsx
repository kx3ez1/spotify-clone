import PropTypes from "prop-types";

const SearchTile = ({ result, index }) => {
  const replacedTitle = result?.title.replace(/&quot;/g, '"')
  return (
    <div className="flex">
      <p className="text-spotify-white">{index + 1}</p>
      <img src={result?.image} alt={replacedTitle} className="w-16 h-16" />
      <div className="ml-4">
        <div className="text-spotify-white">{replacedTitle}</div>
      </div>
    </div>
  );
};

SearchTile.propTypes = {
  result: PropTypes.object,
  index: PropTypes.number,
};

export { SearchTile };
