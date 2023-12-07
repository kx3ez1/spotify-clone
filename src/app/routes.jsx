import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeComponent from "../components/home";
import NotFoundComponent from "../components/not-found";
import SearchComponent from "../components/search";

const CustomRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/search" element={<SearchComponent />} />
      <Route path="/home" element={<HomeComponent />} />
      <Route path="/search/:query/:searchType" element={<SearchComponent />} />
      <Route path="*" element={<NotFoundComponent />} />
    </Routes>
  </BrowserRouter>
);

export default CustomRoutes;
