import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditExercisePage({exerciseToEdit}) {
    
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name,reps,weight,unit,date}
        const res = await fetch(
            `/exercises/${exerciseToEdit._id}`,
            {
                method: 'PUT', 
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(editedExercise)
            }
        );
        if(res.status === 200){
            alert('Successfully edited the exercise');
        } else {
            alert("Failed to edit the exercise, status code = " + res.status)
        }
        navigate('/')
    };

    //REF: for unit form entry, AI result for google prompt "form drop down html"
    return (
        <p>
            <label htmlFor='name-id'>Name</label>
            <input id='name-id'
            type='text'
            value={name}
            onChange={evt => setName(evt.target.value)} />

            <label htmlFor='reps-id'>Reps</label>
            <input id='reps-id'
            type='number'
            value={reps}
            onChange={evt => setReps(Number(evt.target.value))} />

            <label htmlFor='weight-id'>Weight</label>
            <input id='weight-id'
            type='number'
            value={weight}
            onChange={evt => setWeight(Number(evt.target.value))} />

            <label htmlFor='units-id'>Unit</label>
            <select id='units-id'
            name='units' value={unit}
            onChange={evt => setUnit(evt.target.value)}>
                <option value='kgs'>kgs</option>
                <option value='lbs'>lbs</option>
                <option value='miles'>miles</option>
            </select>
            

            <label htmlFor='date-id'>Date</label>
            <input id='date-id'
            type='date'
            value={date?.split('T')[0]}
            onChange={evt => setDate(evt.target.value)} />
            <br></br>
            <button
                onClick={editExercise}
            >Update</button>
        </p>
    )

}

export default EditExercisePage;