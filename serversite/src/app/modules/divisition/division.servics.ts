import { deleteImageFromCLoudinary } from "../../config/cloudnery.config";
import { IDivision } from "./division.interface";
import { Division } from "./division.modul";



const createDivisions = async (payload: IDivision) => {

   
   
   const existingDivision = await Division.findOne({ name: payload.name });
    if (existingDivision) {
      throw new Error("A division with this name already exists.");
   }

   // const baseslug = payload.name.toLowerCase().split(" ").join("-");
   // let slug = `${baseslug}-division`
   // let counter = 0;
   // while (await Division.exists({ slug })) {
   //    slug=`${slug}-${counter++}`
   // }

   // payload.slug = slug;
   
   const division = await Division.create(payload);

   return division
}


const getAllDivisions = async () => {
   const divisions = await Division.find({});
   const totalDivisions = await Division.countDocuments();

   return {
      data: divisions,
      mata: {
         total: totalDivisions
      }
   }
};



const getSingleDivision = async (slug: string) => {

   const division = await Division.find({ slug })
   return {
      data: division,
   }
}



const updateDivision = async (id: string, payload: Partial<IDivision>) => {

    const existingDivision = await Division.findById(id);
    if (!existingDivision) {
        throw new Error("Division not found.");
    }

   const duplicateDivision = await Division.findOne({
      name: payload.name,
      _id: { $ne: id },
   });



   if (duplicateDivision) {
      throw new Error("A division with this name already exists.");
   
   }

   const updatedDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

   if (payload.thumbnail && existingDivision.thumbnail) {
      await deleteImageFromCLoudinary(existingDivision.thumbnail)
   }

   return updatedDivision
       
   
}


const deleteDivision = async (id: string) => {
    await Division.findByIdAndDelete(id);
    return null;
};



export const DivisionService = {
    createDivisions,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};