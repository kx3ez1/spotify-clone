import { useSelector } from "react-redux";
import { BackNavigationWithTitle } from "./child/commonComponents";
import { SearchSongTile } from "./child/searchTileComponent";
import FixedBottomPlayer from "./child/playerComponent";
import { Link } from "react-router-dom";
import { setHistory } from "../reducers/player";
import { useDispatch } from "react-redux";

const QueueComponent = () => {
    const queue = useSelector(state => state.player.queue);
    const history = useSelector(state => state.player.history);
    const currentSong = useSelector(state => state.player.currentSong);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="flex flex-col h-screen bg-spotify-black">
                <FixedBottomPlayer />
                <BackNavigationWithTitle title="" navColor={
                    'bg-spotify-black'
                } />
                <div className="w-full h-full pb-20 overflow-y-scroll p-Padding16px">
                    <div className="pb-Padding8px md:text-2xl text-xl text-white font-bold flex">
                        {/* NOTE: current playing song already in history so, history.length > 1 */}
                        {history && history.length > 1 && 'Recently Played'}
                        {history && history.length > 1 && <div className="ml-auto text-spotify-green font-bold cursor-pointer text-sm"
                            onClick={() => {
                                dispatch(setHistory([
                                    currentSong
                                ]))
                            }}
                        >
                            clear
                        </div>}
                    </div>
                    <div>
                        {
                            history && history.map((song, index) => {
                                if (song.id !== currentSong.id) {
                                    return (
                                        <SearchSongTile key={song.id} result={song} index={index} />
                                    )
                                }
                            })
                        }
                    </div>

                    <div>
                        <div className="text-spotify-white font-bold">
                            {currentSong && currentSong.id && 'Now Playing'}
                        </div>
                        {
                            currentSong && currentSong.id && <SearchSongTile key={currentSong.id} result={currentSong} index={10000} />
                        }
                    </div>
                    <div className="md:text-2xl text-xl text-white font-bold">
                        {queue && queue.length > 0 && 'Up Next'}
                    </div>
                    <div>
                        {queue && queue.length === 0 && history && history.length <= 1 &&
                            <div className="text-white text-center mt-20">
                                No songs in queue
                                <br />
                                <Link to="/home" className="text-spotify-green underline"> Go Home </Link>
                            </div>
                        }
                        {
                            queue && queue.map((song, index) => {
                                return (
                                    <SearchSongTile key={song.id} result={song} index={index} />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}



export default QueueComponent;