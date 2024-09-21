import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Display from "./pages/Display";
import Image from "./components/Image";
import Update from "./components/Update";





function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/upload" element={<Image />} />
        <Route path="/update:id" element={<Update />} />

      </Routes>
    </Router>
  )
}

export default App;
