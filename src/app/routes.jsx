import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import HomeComponent from "../components/home";
import NotFoundComponent from "../components/not-found";
import SearchComponent from "../components/search";
import PlaylistViewComponent from "../components/playlist";
import AlbumViewComponent from "../components/album";
import ArtistViewComponent from "../components/artist";
import QueueComponent from "../components/queue";
import FixedBottomPlayer from "../components/child/playerComponent";

const CustomRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* random route for functionality */}
      <Route path="/fixed-bottom-player" exact element={<FixedBottomPlayer />} />
      {/* queue view */}
      <Route path="/queue" exact element={<QueueComponent />} />
      {/* main view */}
      <Route path="/search" exact element={<SearchComponent />} />
      <Route path="/home" exact element={<HomeComponent />} />
      <Route path="/search/:query/:searchType" exact element={<SearchComponent />} />
      {/* sub view */}
      <Route path="/album/:albumId" exact element={<AlbumViewComponent />} />  {/* album view */}
      <Route path="/artist/:artistId" exact element={<ArtistViewComponent />} />  {/* artist view */}
      <Route path="/playlist/:playListId" exact element={<PlaylistViewComponent />} /> {/* playlist view */}
      {/* 404 */}
      <Route path="*" exact element={<NotFoundComponent />} />
      {/* Redirect */}
      <Route path="/" exact element={<Navigate to="/home" />} />
    </Routes>
  </BrowserRouter>
);

export default CustomRoutes;
