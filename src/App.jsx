import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Browse from "./pages/Browse"
import Watchlist from "./pages/Watchlist"
import MovieDetail from "./pages/MovieDetail"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Dashboard from "./pages/dashboard"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
