import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";


const divisionScehma = new Schema<IDivision>({
   name: { type: String, required: true, unique: true },
   slug: { type: String, unique: true },
   thumbnail: { type: String },
   description: { type: String }
}, {
   timestamps: true
})

divisionScehma.pre("save", async function (next) {
   
   if (this.isModified("name")) {
      const baseslug = this.name.toLowerCase().split(" ").join("-");
      let slug = `${baseslug}-division`
       let counter = 0;
      while (await Division.exists({ slug })) {
        slug=`${slug}-${counter++}`
      }

      this.slug = slug;
   }
 


   next()
})



divisionScehma.pre("findOneAndUpdate", async function (next) {
   const update = this.getUpdate() as Partial<IDivision>;

   if (update.name) {
      const baseslug = update.name.toLowerCase().split(" ").join("-");
      let slug = `${baseslug}-division`;
      let counter = 0;

      while (await Division.exists({ slug })) {
        slug = `${slug}-${counter++}`;
      }

      // set the new slug in the update object
      this.setUpdate({
        ...update,
        slug: slug
      });
   }

   next();
});


export const Division=model<IDivision>("Division", divisionScehma)