import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import CreateUserInfoForm from './pages/user/CreateUserInfo';
import ViewUserInfo from './pages/user/ViewUserInfo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<ViewUserInfo />} />
          <Route path="/user/setup" element={<CreateUserInfoForm />} />
          <Route path="/user/edit" element={<CreateUserInfoForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
