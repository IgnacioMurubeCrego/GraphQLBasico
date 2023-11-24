import { getPetFromModel } from "../../controllers/getPetFromModel.ts";
import { petModel, petModelType } from "../../db/pet.ts";
import { Pet } from "../../types.ts";

export const Mutation = {
    addPet: async (_: unknown, args: {name: string; breed: string }) => {
    try{
        const {name, breed} = args;

        if(!name || !breed){
            throw new Error("Fields missing in request.");
        }
        const pet = new petModel({
        name: args.name,
        breed: args.breed,
        }); 
        await pet.save();   
        const postedPet : Pet = getPetFromModel(pet);
        if(postedPet)
            return postedPet;
        else
            throw new Error("new pet error.");
        }
    
    catch(error){
        console.log(error.message);
    }
    },
    deletePet: async (_: unknown, args: {id : string}) => {
        try{
            const {id} = args;
    
            if(!id){
                throw new Error("Fields missing in request.");
            }
            const deletedPet = await petModel.findByIdAndDelete(id);
            if(deletedPet)
                return getPetFromModel(deletedPet);
            else
                throw new Error("Pet not found");
            }
        catch(error){
            console.log(error.message);
        }
    },
    updatePet : async (_: unknown, args: {id : string, name : string, breed : string}) => {
        try{
            const {id, name, breed} = args;
    
            if(!id || !name || !breed){
                throw new Error("Fields missing in request.");
            }
            const newPet = {
            name: args.name,
            breed: args.breed,
            }; 

            const postedPet : petModelType |null = await petModel.findByIdAndUpdate(id,newPet)  
             
            if(postedPet)
                return  getPetFromModel(postedPet);
            else
                throw new Error("new pet error.");
            }
        catch(error){
            console.log(error.message);
        }
    }
  };