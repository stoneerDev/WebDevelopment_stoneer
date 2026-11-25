import { MdCreate, MdDelete } from "react-icons/md";

function ExerciseItem({exercise, editExercise, deleteExercise}){

    return (
        <tr className = 'exercise-row'>
            <td><MdDelete onClick={e => {
                //e.preventDefault();
                deleteExercise(exercise._id);
            }} /></td>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date?.split('T')[0]}</td>
            <td><MdCreate onClick = {e => {
                //e.preventDefault();
                editExercise(exercise);
            }}/></td>
        </tr>
    )
}

export default ExerciseItem