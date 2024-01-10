import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Login from './Auth/Pages/Login'
import Signup from './Auth/Pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route 
              path="/login"
              element={<Login />}
            />
          </Routes>
          <Routes>
            <Route 
              path="/signup"
              element={<Signup />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
