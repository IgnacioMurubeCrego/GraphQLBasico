import { GraphQLError } from "graphql";
import { getPetFromModel } from "../../controllers/getPetFromModel.ts";
import { petModelType, petModel } from "../../db/pet.ts";
import { Pet } from "../../types.ts";

export const Query = {
    pets: async () : Promise<Pet[]> => {
      const petDocs : petModelType[] = await petModel.find({});
      const pets : Pet[] = petDocs.map((pet : petModelType) => { 
            return getPetFromModel(pet);
        });
      return pets;
    },
    pet: async (_:unknown, args: { id: string }): Promise<Pet> => {
      const {id} = args;
      const petDoc : petModelType | null = await petModel.findById({_id : id});
      if (!petDoc) {
        throw new GraphQLError("Pet id not found");
      }
      const pet : Pet = await getPetFromModel(petDoc)
      return pet;
    },
  };