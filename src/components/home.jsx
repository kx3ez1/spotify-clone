import NavMenu from "./child/nav-menu";
import LibraryComponent from "./child/library.jsx";
import { SpotifyHorizontalScrollView } from "./child/home-utils.jsx";
import { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "../app/constants.jsx";
import { AlbumCardV2, ArtistCardV2, PlaylistCardV2 } from "./child/home-utils.jsx";
import FixedBottomPlayer from "./child/player.jsx";

const HomeComponent = () => {
  const [trendingData, setTrendingData] = useState({});
  const welcomeMessage = () => {
    const date = new Date();
    const hours = date.getHours();
    let message = "";
    if (hours < 12) {
      message = "Good Morning";
    } else if (hours < 18) {
      message = "Good Afternoon";
    } else {
      message = "Good Evening";
    }
    return message;
  }


  useEffect(() => {
    fetch(`${SERVER_ADDRESS}/trending`)
      .then((response) => response.json())
      .then((data) => {
        setTrendingData(data);
      });


  }, []);

  return (
    <div className="bg-spotify-black w-screen h-screen flex">
      <FixedBottomPlayer />
      {/* side menu */}
      {/* hidden in @mobile */}
      <div className="w-1/4 hidden md:block">
        <div>
          {/* nav menu component */}
          <NavMenu />
        </div>
        <div className="pt-2">
          {/* library component */}
          <LibraryComponent />
        </div>
      </div>


      <div className="w-full h-full overflow-y-scroll pb-20">
        {/* top menu - settings, last played */}
        <div className="flex justify-between items-center p-Padding12px">
          {/* greetings */}
          <div className="text-white text-2xl font-semibold">{welcomeMessage()}</div>

          <div>
            {/* notifications */}


            {/* listening history */}

            {/* settings  */}
            <div className="text-spotify-white p-3">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                fill={"currentColor"}
                className="w-6 h-6"
                viewBox="0 0 24 24"><path d="m23.2 11.362-1.628-.605a.924.924 0 0 1-.52-.7.88.88 0 0 1 .18-.805l1.2-1.25a1 1 0 0 0 .172-1.145 12.075 12.075 0 0 0-3.084-3.865 1 1 0 0 0-1.154-.086l-1.35.814a.982.982 0 0 1-.931-.02 1.01 1.01 0 0 1-.59-.713l-.206-1.574a1 1 0 0 0-.787-.848 12.15 12.15 0 0 0-4.945 0 1 1 0 0 0-.785.848l-.2 1.524a1.054 1.054 0 0 1-.62.747 1.024 1.024 0 0 1-.968.02l-1.318-.795a1 1 0 0 0-1.152.086 12.118 12.118 0 0 0-3.085 3.867 1 1 0 0 0 .174 1.143l1.174 1.218a.91.91 0 0 1 .182.828.949.949 0 0 1-.532.714l-1.618.6a1 1 0 0 0-.653.955 12.133 12.133 0 0 0 1.1 4.822 1 1 0 0 0 1 .578l1.935-.183a.83.83 0 0 1 .654.327.794.794 0 0 1 .188.726l-.6 1.822a1 1 0 0 0 .34 1.106c.66.504 1.369.94 2.117 1.3.748.36 1.532.642 2.338.841a.988.988 0 0 0 .715-.09 1 1 0 0 0 .362-.332l1.136-1.736a.81.81 0 0 1 1.16.022l1.124 1.714a1 1 0 0 0 1.077.422c1.617-.4 3.133-1.13 4.454-2.145a1 1 0 0 0 .341-1.106l-.613-1.859a.771.771 0 0 1 .18-.7.78.78 0 0 1 .635-.317l1.945.183a.994.994 0 0 0 1-.578 12.133 12.133 0 0 0 1.1-4.822 1 1 0 0 0-.643-.953zm-1.6 2.977c-.103.448-.237.888-.4 1.318l-1.213-.115a2.851 2.851 0 0 0-2.9 3.637l.383 1.16a10.09 10.09 0 0 1-2.473 1.191l-.72-1.1a2.691 2.691 0 0 0-2.275-1.18 2.637 2.637 0 0 0-2.232 1.16l-.735 1.12a10.117 10.117 0 0 1-2.471-1.19l.37-1.125a2.879 2.879 0 0 0-2.93-3.669l-1.2.113a10.46 10.46 0 0 1-.4-1.317 10.09 10.09 0 0 1-.214-1.358l.93-.345a3.032 3.032 0 0 0 1.095-4.8L3.55 7.15a10.158 10.158 0 0 1 1.71-2.146l.688.415a3 3 0 0 0 2.875.066 3.022 3.022 0 0 0 1.726-2.283l.105-.8a10.174 10.174 0 0 1 2.745 0l.11.844a3.099 3.099 0 0 0 4.542 2.184l.721-.435a10.22 10.22 0 0 1 1.712 2.146l-.694.72a3.005 3.005 0 0 0 1.084 4.768l.942.35c-.042.457-.113.912-.215 1.36H21.6zM12 7.001a5 5 0 1 0 5 5 5.006 5.006 0 0 0-4.993-5H12zm0 8a3 3 0 1 1 .007 0H12z"></path></svg>
            </div>
          </div>
        </div>

        {/* main content */}
        <SpotifyHorizontalScrollView category={'Trending Now'} >
          {
            trendingData
            && trendingData.new_trending
            && trendingData.new_trending.map((item, index) => {

              if (item.type === 'album') {
                return <AlbumCardV2 data={item} key={index} />
              }
              else if (item.type === 'artist') {
                return <ArtistCardV2 data={item} key={index} />
              }
              else if (item.type === 'playlist') {
                return <PlaylistCardV2 data={item} key={index} />
              }

            })

          }
        </SpotifyHorizontalScrollView>


        <SpotifyHorizontalScrollView category={'New Releases'} >
          {
            trendingData
            && trendingData.new_albums
            && trendingData.new_albums.map((item, index) => {

              if (item.type === 'album') {
                return <AlbumCardV2 data={item} key={index} />
              }
              else if (item.type === 'artist') {
                return <ArtistCardV2 data={item} key={index} />
              }
              else if (item.type === 'playlist') {
                return <PlaylistCardV2 data={item} key={index} />
              }

            })

          }
        </SpotifyHorizontalScrollView>

        <SpotifyHorizontalScrollView category={'Editorial Picks'} >
          {
            trendingData
            && trendingData.top_playlists
            && trendingData.top_playlists.map((item, index) => {

              if (item.type === 'album') {
                return <AlbumCardV2 data={item} key={index} />
              }
              else if (item.type === 'artist') {
                return <ArtistCardV2 data={item} key={index} />
              }
              else if (item.type === 'playlist') {
                return <PlaylistCardV2 data={item} key={index} />
              }

            })
          }

        </SpotifyHorizontalScrollView>

        <SpotifyHorizontalScrollView category={'Best of 90s'} >
          {
            trendingData
            && trendingData['promo:vx:data:185']
            && trendingData['promo:vx:data:185'].map((item, index) => {

              if (item.type === 'album') {
                return <AlbumCardV2 data={item} key={index} />
              }
              else if (item.type === 'artist') {
                return <ArtistCardV2 data={item} key={index} />
              }
              else if (item.type === 'playlist') {
                return <PlaylistCardV2 data={item} key={index} />
              }

            })
          }
        </SpotifyHorizontalScrollView>

        <SpotifyHorizontalScrollView category={'Top Albums'} >
          {
            trendingData
            && trendingData['promo:vx:data:120']
            && trendingData['promo:vx:data:120'].map((item, index) => {

              if (item.type === 'album') {
                return <AlbumCardV2 data={item} key={index} />
              }
              else if (item.type === 'artist') {
                return <ArtistCardV2 data={item} key={index} />
              }
              else if (item.type === 'playlist') {
                return <PlaylistCardV2 data={item} key={index} />
              }

            })

          }
        </SpotifyHorizontalScrollView>

        <SpotifyHorizontalScrollView category={'Devotional'} >
          {
            trendingData
            && trendingData['promo:vx:data:150']
            && trendingData['promo:vx:data:150'].map((item, index) => {

              if (item.type === 'album') {
                return <AlbumCardV2 data={item} key={index} />
              }
              else if (item.type === 'artist') {
                return <ArtistCardV2 data={item} key={index} />
              }
              else if (item.type === 'playlist') {
                return <PlaylistCardV2 data={item} key={index} />
              }

            })

          }
        </SpotifyHorizontalScrollView>

      </div>
    </div>
  );
};

export default HomeComponent;
