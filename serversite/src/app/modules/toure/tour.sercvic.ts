
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.module";
import { QueryBuilder } from "../../utils/queryBlider";
import { tourSearchableFields } from "./tour.constant";

const createTour = async (payload: ITour) => {

   const existinge = await Tour.findOne({ title: payload.title });

    if (existinge) {
       
       throw new Error("A tour with this title already exists.");
    }

    const baseslug = payload.title.toLowerCase().split(" ").join("-");
       let slug = `${baseslug}-division`
       let counter = 0;
       while (await Tour.exists({ slug })) {
          slug=`${slug}-${counter++}`
    }
    
    payload.slug = slug;

    const tour = await Tour.create(payload)
    
    return tour


   
}


const getAllTours = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(Tour.find(), query)
    
    const tours = await queryBuilder
        .search(tourSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()
    
    const [data, mata] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        mata
    }




   
}

const updateTour = async (id: string, payload: Partial<ITour>) => {
    
      const existingTour = await Tour.findById(id);

       if (!existingTour) {
        throw new Error("Tour not found.");
    }
    

    if (payload.title) {
       const baseslug = payload.title.toLowerCase().split(" ").join("-");
       let slug = `${baseslug}-division`
       let counter = 0;
       while (await Tour.exists({ slug })) {
        slug=`${slug}-${counter++}`
      }
            payload.slug = slug;

    }
           

    const updateTours = await Tour.findByIdAndUpdate(id, payload, { new: true });
    return updateTours

}


const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
};



const createTourType = async (payload: ITourType) => {
    const exitsingToutype = await TourType.findOne({ name: payload.name });
    if (exitsingToutype) {
        throw new Error("Tour type already exists.");
    }

    return await TourType.create({ name })
};

const getAllTourTypes = async () => {
    return await TourType.find();
};

const deleteTourType = async (id: string) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    return await TourType.findByIdAndDelete(id);
};


const updateTourType = async (id: string, payload: ITourType) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });
    return updatedTourType;
};



export const TourService = {
    createTour,
    createTourType,
    deleteTourType,
    updateTourType,
    getAllTourTypes,
    getAllTours,
    updateTour,
    deleteTour,
};