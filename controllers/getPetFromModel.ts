import { petModelType } from "../db/pet.ts";
import { Pet } from "../types.ts";

export const getPetFromModel = (petDoc : petModelType) : Pet => {
    const pet = {
        "id" : petDoc.id.toString(),
        "name" : petDoc.name,
        "breed" : petDoc.breed,
    }
    return pet;
}