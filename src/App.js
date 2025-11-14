import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./utils/reintentos"; // activar sistema
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardPaciente from "./pages/DashboardPaciente";
import DashboardPsicologo from "./pages/DashboardPsicologo";
import TestEmail from "./pages/TestEmail";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/paciente" element={<DashboardPaciente />} />
        <Route path="/psicologo" element={<DashboardPsicologo />} />
        <Route path="/test-email" element={<TestEmail />} />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
