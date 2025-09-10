/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { envVars } from "../../config/env";
import { ISSLCommerz } from "./sslcomarz.interfase";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes"
import { Payment } from "../pymant/pymant.modal";




export const sslPaymantInit =async (payload: ISSLCommerz) => {
   try {
      const data = {

            store_id: envVars.SSL.SSL_STORE_ID,
            store_passwd: envVars.SSL.SSL_STORE_PSS,
            total_amount: payload.amount,
            currency: "BDT",
            tran_id: payload.transactionId,
         success_url: `${envVars.SSL.SSL_SUCCESS_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=success`,
            fail_url: `${envVars.SSL.SSL_FAIL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=fail`,
            cancel_url: `${envVars.SSL.SSL_CANCEL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=cancel`,
            ipn_url: envVars.SSL.SSL_IPN_URL,
            shipping_method: "N/A",
            product_name: "Tour",
            product_category: "Service",
            product_profile: "general",
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add1: payload.address,
            cus_add2: "N/A",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: payload.phoneNumber,
            cus_fax: "01711111111",
            ship_name: "N/A",
            ship_add1: "N/A",
            ship_add2: "N/A",
            ship_city: "N/A",
            ship_state: "N/A",
            ship_postcode: 1000,
            ship_country: "N/A",
      
    }

    const respons = await axios({
      method: "POST",
      url: envVars.SSL.SSL_PAYMANT_API,
      data: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })

      return  respons.data;
      
   } catch (error ) {
       // eslint-disable-next-line no-console
       console.log("Payment Error Occured", error);
        if (error instanceof Error) {
          throw new AppError(httpStatus.BAD_REQUEST, error.message);
        } else {
          throw new AppError(httpStatus.BAD_REQUEST, "An unknown error occurred");
        }
   }

} 


const validatePaymant = async (payload: any) => {
   try {


      const response =await axios({
      method: "GET",
      url: `${envVars.SSL.SSL_VALTDATION_API}?val_id=${payload.val_id}&store_id=${envVars.SSL.SSL_STORE_ID}&store_passwd=${envVars.SSL.SSL_STORE_PSS}`
      })

      // eslint-disable-next-line no-console
      console.log("sslcomaerz validate api response", response.data);
      

      await Payment.updateOne({ transactionId: payload.tran_id }, { paymentGatewayData: (await response).data },
         {runValidators: true}
      )
      
   
   } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      if (error instanceof Error) {
         throw new AppError(401, `Paymant Validtion Error,${error.message}`);
      } else {
         throw new AppError(401, "Paymant Validtion Error, unknown error");
      }
      
   }
}


export const SSLService = {
   sslPaymantInit,
   validatePaymant 
}