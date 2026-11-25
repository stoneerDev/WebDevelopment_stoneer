//Author: Erik Stone (Stoneer)
//Date: 2025-11-11

// Get the mongoose object
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercises_db';
const EXERCISE_COLLECTION = 'exercises';
const EXERCISE_CLASS = 'Exercise';

let connection = undefined;
let Exercise = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {dbName: EXERCISE_DB_NAME});
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        //Needed to create exercise object for use in functions
        Exercise = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel(){
    //create the schema
    const exerciseSchema = mongoose.Schema({
         name: {type: String, required: true},
         reps: {type: Number, required: true},
         weight: {type: Number, required: true},
         unit: {type: String, required: true},
         date: {type: Date, required: true}
         
    },{collection: EXERCISE_COLLECTION});
    //define the class, should happen after schema
    return mongoose.model(EXERCISE_CLASS,exerciseSchema);
}

async function createExercise(name,reps,weight,unit,date){
    
    let exercise = undefined;
    //TODO: Add validation?
    exercise = new Exercise({name:name, reps: reps, weight: weight, unit: unit, date: date});

    return exercise.save();
}

const findExercises = async(filter) => {
    const query = Exercise.find(filter);
    return query.exec();  
}

const findExerciseById = async(id) => {
    return Exercise.findById(id);  
}

//REF: Google search 'mongoose findByIdAndUpdate()'
const updateExerciseById = async(id,updateObj) => {
    const updatedDoc = await Exercise.findByIdAndUpdate(id,updateObj,{new: true});
    return updatedDoc;
}

//REF: Google search 'mongoose findByIdAndDelete()'
const deleteExerciseById = async(id) => {
    //TODO: Not manipulated from A7, check 
    const deleteRes = await Exercise.findByIdAndDelete(id);
    return deleteRes;
}




export { connect, createExercise, findExercises, findExerciseById, updateExerciseById, deleteExerciseById };
