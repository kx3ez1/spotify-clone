import {Link} from "react-router-dom";

const LibraryComponent = () => {
    return (
        <div className="bg-spotify-darkGray text-spotify-white p-4 rounded-lg text-lg font-semibold">
            <div>
                <Link to="/">Your Library</Link>
            </div>
        </div>
    );
}

export default LibraryComponent;