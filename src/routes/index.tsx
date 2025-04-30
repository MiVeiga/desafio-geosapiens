import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fishing } from "../pages/Fishing";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fishing />} />
      </Routes>
    </BrowserRouter>
  );
};
