import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateExercisePage() {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const createExercise = async () => {
        const newExercise = {name,reps,weight,unit,date}
        const res = await fetch(
            '/exercises',
            {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
            }
        );
        if(res.status === 201){
            alert('Successfully added the exercise');
        } else {
            alert("Failed to add the exercise, status code = " + res.status)
        }
        navigate('/')
    }

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
                onClick={createExercise}
            >Add New Exercise</button>
        </p>
    )
}

export default CreateExercisePage;