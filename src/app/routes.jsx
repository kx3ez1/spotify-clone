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
      <Route path="/search" element={<SearchComponent />} />
      <Route path="/home" element={<HomeComponent />} />
      <Route path="/search/:query/:searchType" element={<SearchComponent />} />
      {/* sub view */}
      <Route path="/album/:albumId" element={<AlbumViewComponent />} />  {/* album view */}
      <Route path="/artist/:artistId" element={<ArtistViewComponent />} />  {/* artist view */}
      <Route path="/playlist/:playListId" element={<PlaylistViewComponent />} /> {/* playlist view */}
      {/* 404 */}
      <Route path="*" element={<NotFoundComponent />} />
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  </BrowserRouter>
);

export default CustomRoutes;
