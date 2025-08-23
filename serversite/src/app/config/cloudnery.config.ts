

import AppError from "../errorHelpers/AppError";
import { envVars } from "./env";

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
   cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
   api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
   api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET,
})

export const deleteImageFromCLoudinary = async (url: string) => {
    try {
        //https://res.cloudinary.com/djzppynpk/image/upload/v1753126572/ay9roxiv8ue-1753126570086-download-2-jpg.jpg.jpg

        const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;

        const match = url.match(regex);

        // eslint-disable-next-line no-console
        console.log({ match });

        if (match && match[1]) {
            const public_id = match[1];
           await cloudinary.uploader.destroy(public_id)
           // eslint-disable-next-line no-console
            console.log(`File ${public_id} is deleted from cloudinary`);

        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new AppError(401, "Cloudinary image deletion failed", error.message)
    }
}



export const cloudinaryUpload = cloudinary









