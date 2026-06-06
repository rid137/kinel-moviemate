import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Browse from "./pages/Browse"
import Watchlist from "./pages/Watchlist"
import MovieDetail from "./pages/MovieDetail"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import { AuthProvider } from "./context/AuthContext"
import Dashboards from "./pages/Dashboards"

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
