import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RetrieveExercisesPage from './pages/RetrieveExercisesPage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import './index.css'

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (

    <div className="app">
      <header>
        <h1>Exercise Tracker</h1>
        <p>CS 290 Portfolio Assignment - MERN App</p>
      </header>
      <Router>
        <nav className='app-nav'>
          <Link to="/">Home</Link>
          <Link to="/create-exercise">Create</Link>

        </nav>
        <main>
          <Routes>
            <Route path="/" element={<RetrieveExercisesPage setExerciseToEdit={setExerciseToEdit}/>}></Route>
            <Route path="/create-exercise" element={<CreateExercisePage />}></Route>
            <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
          </Routes>
        </main>

      </Router>
      <footer>&copy; Erik Stone 2025 &hearts;</footer>
    </div>
  );
}

export default App;