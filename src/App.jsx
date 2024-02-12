import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Forgotpassword from "./components/Forgotpassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { Provider } from "react-redux";
import { store } from "./Services/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/tnfb/*" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
