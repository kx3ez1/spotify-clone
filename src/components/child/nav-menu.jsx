import {Link} from "react-router-dom";
import homeIcon from "../../assets/home-icon.svg";

const NavMenu = () => {
    return (<div className="bg-spotify-darkGray text-spotify-white p-4 rounded-lg text-lg font-semibold">
        <div className={'flex'}>
            <Link to="/home">
                <img src={homeIcon} alt="home-icon" className="inline-block"/>
                Home</Link>
        </div>
        <div>
            <Link to="/search">Search</Link>
        </div>
    </div>);
};

export default NavMenu;
