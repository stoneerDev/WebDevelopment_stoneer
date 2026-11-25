import ExerciseItem from './ExerciseItem'

function ExerciseCollection({exercises, editExercise, deleteExercise}){

    

    return (
        <table>
            <thead>
                <tr>
                    <th>Delete</th>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit/Save</th>
                </tr>
                {exercises.map((exercise, i) => <ExerciseItem exercise={exercise} editExercise={editExercise} deleteExercise={deleteExercise} key={i} />)}
            </thead>
            
        </table>
    )
    
}

export default ExerciseCollection;