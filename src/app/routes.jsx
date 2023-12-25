import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import HomeComponent from "../components/home";
import NotFoundComponent from "../components/not-found";
import SearchComponent from "../components/search";
import PlaylistViewComponent from "../components/playlist";
import AlbumViewComponent from "../components/album";
import ArtistViewComponent from "../components/artist";

const CustomRoutes = () => (
  <BrowserRouter>
    <Routes>
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
