import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from './pages/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from "./pages/Footer";
import ListCar from "./pages/ListCar";
import CarDetail from "./pages/CarDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Layout() {
    const location = useLocation();
    const noHeaderRoutes = ["/login", "/register"]; // Các trang không cần Header

    return (
        <div className="app">
            {!noHeaderRoutes.includes(location.pathname) && <Header />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/listCar" element={<ListCar />} />
                <Route path="home/car/:id" element={<CarDetail />} />
                {/* about */}
                <Route path="/about" element={<About/>} />
                {/* contact */}
                <Route path="/contact" element={<Contact/>} />


            </Routes>
            {!noHeaderRoutes.includes(location.pathname) && <Footer />}
        </div>
    );
}

function App() {
    return (

        <Router>
            <Layout />
        </Router>
    );
}

export default App;
