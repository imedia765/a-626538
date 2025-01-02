import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Index />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;