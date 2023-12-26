import { useSelector } from "react-redux";
import { BackNavigationWithTitle } from "./child/commonComponents";
import { SearchSongTile } from "./child/searchTileComponent";
import FixedBottomPlayer from "./child/playerComponent";

const QueueComponent = () => {
    const queue = useSelector(state => state.player.queue);
    const history = useSelector(state => state.player.history);

    return (
        <div>
            <div className="flex flex-col h-screen bg-spotify-black">
                <FixedBottomPlayer />
                <BackNavigationWithTitle title="" navColor={
                    'bg-spotify-black'
                } />
                <div className="w-full h-full overflow-y-scroll p-Padding16px">
                    <div className="md:text-2xl text-xl text-white font-bold">
                        Queue
                    </div>
                    <div>
                        {
                            history && history.slice(-3).map((song, index) => {
                                return (
                                    <SearchSongTile key={song.id} result={song} index={index} />
                                )
                            })
                        }
                    </div>
                    {/* <div className="md:text-2xl text-xl text-white font-bold">
                        Next up
                    </div> */}
                    <div>
                        {queue && queue.length === 0 && history && history.length === 0 &&
                            <div className="text-white text-center mt-20">
                                No songs in queue
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