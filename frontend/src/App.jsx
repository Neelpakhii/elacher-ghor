import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Home from "./pages/home/home.jsx";
import About from "./pages/about/about.jsx"

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
