import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ExerciseCollection from '../components/ExerciseCollection';

function RetrieveExercisesPage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);

    const navigate = useNavigate();

    //GET all exercises
    const loadExercises = async () => {
        const res = await fetch('/exercises');
        const data = await res.json();
        
        setExercises(data);
    }

    //load on startup
    useEffect(() => {
        loadExercises();
    },[]);

    const editExercise = async (exercise) => {
        setExerciseToEdit(exercise);
        navigate('/edit-exercise');
    }

    //delete & re-render
    const deleteExercise = async (_id) => {
            const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
            if (response.status === 204) {
                setExercises(exercises.filter (exercises => exercises._id !== _id));
                
            } else {
                alert(`Failed to delete movie with id = ${_id}, status code = ${response.status}`)
            }
        }
    
    return (
        <ExerciseCollection exercises = {exercises} editExercise={editExercise} deleteExercise = {deleteExercise}></ExerciseCollection>
    )

}

export default RetrieveExercisesPage;