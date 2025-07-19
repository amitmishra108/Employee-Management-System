import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <HeaderComponent />
        <div className="flex-grow-1 container">
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<EmployeeComponent />} />
            <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
          </Routes>
        </div>
        <FooterComponent className="bg-dark text-light text-center py-3 mt-auto" />
      </div>
    </Router>
  );
}



export default App;
