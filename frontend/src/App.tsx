import Home from './pages/Home';
import FeedBack from './pages/FeedBack';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/feedback" element={<FeedBack />} />
            </Routes>
        </Router>
    );
}

export default App;