import { Routes, Route } from "react-router-dom";

import { Details } from "../pages/Details"
import { Profile } from "../pages/Profile"
import { Home } from "../pages/Home"
import { New } from "../pages/New"

export function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<Home/> }/>
      <Route path="/new" element={<New/>} />      
      <Route path="/details" element={<Details/>}/>
      <Route path="/profile:id" element={<Profile/>} />
    </Routes>
  )
}