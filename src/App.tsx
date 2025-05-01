import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
//redux
import { Provider } from 'react-redux';
import { store } from './redux/state/store';
import "./App.css";

import Home from "./pages/landing";
import PublicStories from "./pages/publicStories";
import Login from "./pages/registeration/login";
import Register from "./pages/registeration/register";
import Profile from "./pages/profile";
import NotFound from "./common/components/NotFound";

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stories-feed" element={<PublicStories />} />
              <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
              <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
      </Provider>
    </AuthProvider>
  );
};

export default App;
