import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import WorkoutDashboard from './Workout/Pages/WorkoutDashboard'
import Navbar from './Workout/Components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<WorkoutDashboard />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
