import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import UserInfoForm from './pages/user/UserInfo';

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
          <Routes>
            <Route 
              path="/info"
              element={<UserInfoForm />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
