import NavMenu from "./child/nav-menu";
import LibraryComponent from "./child/library.jsx";
import TopNav from "./child/top-nav.jsx";

const HomeComponent = () => {
    return (
        <div className='bg-spotify-black w-screen h-screen p-2 flex'>
            <div className='w-1/4'>
                <div>
                    {/* nav menu component */}
                    <NavMenu/>
                </div>
                <div className='pt-2'>
                    {/* library component */}
                    <LibraryComponent/>
                </div>
            </div>
            <div className='w-full pl-2'>
                <div className='bg-spotify-darkGray rounded-lg w-full h-full'>
                    <TopNav/>
                </div>
            </div>
        </div>);
};

export default HomeComponent;
