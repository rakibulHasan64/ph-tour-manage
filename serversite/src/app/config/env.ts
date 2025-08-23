import dotenv from "dotenv";


dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_EXPIRES: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  EXPRESS_SESSION_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  FONTEND_URL: string;
  SSL: {
    SSL_STORE_ID: string,
    SSL_STORE_PSS: string,
    SSL_PAYMANT_API: string,
    SSL_VALTDATION_API: string,
    SSL_SUCCESS_FRONTEND_URL: string,
    SSL_FAIL_FRONTEND_URL: string,
    SSL_CANCEL_FRONTEND_URL: string,
    SSL_SUCCESS_BACKEND_URL: string,
    SSL_FAIL_BACKEND_URL: string,
    SSL_CANCEL_BACKEND_URL: string,
  }
  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: string,
    CLOUDINARY_API_KEY: string,
    CLOUDINARY_API_SECRET: string
  }

    EMIAL_SENDER: {
      
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMPT_USER: string;
      SMTP_PASS: string;
      SMTP_FROM: string
    }

}

const loadEnvVariables = (): EnvConfig => {
 const requiredEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "BCRYPT_SALT_ROUND",      
    "JWT_ACCESS_EXPIRES",     
   "JWT_ACCESS_SECRET",
   "SUPER_ADMIN_EMAIL",
   "SUPER_ADMIN_PASSWORD",
   "JWT_REFRESH_EXPIRES",
   "JWT_REFRESH_SECRET",
   "GOOGLE_CLIENT_SECRET",
   "GOOGLE_CLIENT_ID",
   "EXPRESS_SESSION_SECRET",
   "GOOGLE_CALLBACK_URL",
   "FONTEND_URL",
   "SSL_STORE_ID",
   "SSL_STORE_PSS",
   "SSL_PAYMANT_API",
   "SSL_VALTDATION_API",
   "SSL_SUCCESS_FRONTEND_URL",
   "SSL_FAIL_FRONTEND_URL", 
   "SSL_CANCEL_FRONTEND_URL",
   "SSL_SUCCESS_BACKEND_URL",
   "SSL_FAIL_BACKEND_URL",
   "SSL_CANCEL_BACKEND_URL",
   "CLOUDINARY_API_SECRET",
   "CLOUDINARY_API_KEY",
   "CLOUDINARY_CLOUD_NAME",
   "SMTP_HOST",
   "SMTP_PORT",
   "SMPT_USER",
   "SMTP_FROM"



    
      
      
      
    
    
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_EXPIRES:  process.env.JWT_ACCESS_EXPIRES as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    FONTEND_URL: process.env.FONTEND_URL as string,
    SSL: {
      SSL_STORE_ID: process.env.SSL_STORE_ID as string,
      SSL_STORE_PSS: process.env.SSL_STORE_PSS as string,
      SSL_PAYMANT_API: process.env.SSL_PAYMANT_API as string,
      SSL_VALTDATION_API: process.env.SSL_VALTDATION_API as string,
      SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
      SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
      SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL as string,
      SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL as string,
      SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
      SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,

    },

    CLOUDINARY: {
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    },
    EMIAL_SENDER: {
      
      SMTP_HOST: process.env.SMTP_HOST as string,
      SMTP_PORT: process.env.SMTP_PORT as string,
      SMPT_USER: process.env.SMPT_USER as string,
      SMTP_PASS: process.env.SMTP_PASS as string,
      SMTP_FROM: process.env.SMTP_FROM as string
    }
  };
};

export const envVars = loadEnvVariables();



// CLOUDINARY_URL=cloudinary://223719979219963:SuYNiU5VntS3KYBYply6JoiVe9s@ddmgnugte


