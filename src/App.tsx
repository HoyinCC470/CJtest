import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TestStart from './pages/test/TestStart';
import TestQuiz from './pages/test/TestQuiz';
import TestPassword from './pages/test/TestPassword';
import TestResult from './pages/test/TestResult';
import MITResult from './pages/test/MITResult';
import OxfordResult from './pages/test/OxfordResult';
import HarvardYaleResult from './pages/test/HarvardYaleResult';
import RhodeIslandResult from './pages/test/RhodeIslandResult';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestStart />} />
        <Route path="/test/quiz" element={<TestQuiz />} />
        <Route path="/test/password" element={<TestPassword />} />
        <Route path="/test/result" element={<TestResult />} />
        <Route path="/test/mit-result" element={<MITResult />} />
        <Route path="/test/oxford-result" element={<OxfordResult />} />
        <Route path="/test/harvard-yale-result" element={<HarvardYaleResult />} />
        <Route path="/test/rhode-island-result" element={<RhodeIslandResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
