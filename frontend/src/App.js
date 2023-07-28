import './App.css';
import Home from './Component/Home/Home';
import Footer from './Component/layout/Footer/Footer';
import Header from './Component/layout/Header/Header';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
