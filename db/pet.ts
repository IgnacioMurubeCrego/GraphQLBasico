import mongoose from "mongoose";
import { Pet } from "../types.ts";

const Schema = mongoose.Schema;

const petSchema = new Schema ({
    name : {type : String, required : true},
    breed : {type : String, required : true},
});

export type petModelType = mongoose.Document 
                        & Omit<Pet, "id">;

export const petModel = mongoose.model<petModelType>("Pet", petSchema);