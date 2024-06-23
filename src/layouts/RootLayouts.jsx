import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"

export default function RootLayouts() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
