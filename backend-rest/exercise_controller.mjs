//Author: Erik Stone (Stoneer)
//Date: 2025-12-01


import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise_model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;



//Function to do exercise validation (Helper for other )
function validateExercise(exerciseObj) {
    const allowedUnits = ['kgs','lbs','miles'];
    const date = new Date(exerciseObj.date);
    
    if ((typeof(exerciseObj.name) !== 'string') || (exerciseObj.name === "") ){ return false; }
    
    else if ((typeof(exerciseObj.reps) !== 'number') || (exerciseObj.reps <= 0) ){ return false; } 

    else if ((typeof(exerciseObj.weight) !== 'number') || (exerciseObj.weight < 0) ){ return false; }

    //REF: Google seach 'javascript check string in array'
    else if ((typeof(exerciseObj.unit) !== 'string') || (!allowedUnits.includes(exerciseObj.unit)) ){ return false; } 

    //ref: Google 'validate date in javascript'
    else if (isNaN(date.getTime())){ return false; }

    else {return true;}
}

//Create using POST /exercises
app.post('/exercises', asyncHandler(async (req,res) => {
    
    if (validateExercise(req.body)){
        const newExerciseObj = await exercises.createExercise(req.body.name,req.body.reps,req.body.weight,req.body.unit,req.body.date);
        res.status(201).send(newExerciseObj);
    } else {
        res.status(400).send({ "Error": "Invalid request" });
    }
    

    
}))

//Read All using GET /exercises (without query param company)
app.get('/exercises', asyncHandler(async (req, res) => {
    
    const findResp = await exercises.findExercises();
    res.status(200).send(findResp);
}))

//Read one using GET /exercises/:_id
app.get('/exercises/:_id', asyncHandler(async(req,res) => {
    const resObj = await exercises.findExerciseById(req.params._id)
    
    if(resObj === null) {
        res.status(404).send({"Error": "Not found"});
    } else {
        res.status(200).send(resObj);
    }
    
}))

//Update using PUT /exercises/:_id
app.put('/exercises/:_id', asyncHandler(async (req,res) => {
    
    if (validateExercise(req.body)){
        const resObj = await exercises.updateExerciseById(req.params._id,req.body);
        if(resObj === null) {
        res.status(404).send({"Error": "Not found"});
        } else {
            res.status(200).send(resObj);
        }
    } else {
        res.status(400).send({ "Error": "Invalid request" });
    }

    

    
}))



//Delete one using DELETE /exercises/:_id
app.delete('/exercises/:_id', asyncHandler(async (req,res) => {
    
    const resObj = await exercises.deleteExerciseById(req.params._id);
    
    if(resObj === null) {
        res.status(404).send({"Error": "Not found"});
    } else {
        res.status(204).send();
    }

    
}))

app.listen(PORT, async () => {
    await exercises.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});
