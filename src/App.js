import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route 
              path="/signin"
              element={<SignIn />}
            />
          </Routes>
          <Routes>
            <Route 
              path="/signup"
              element={<SignUp />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
