import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Track } from "../pages/Track"
import { View } from "../pages/View"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track/:id" element={<Track />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  )
}