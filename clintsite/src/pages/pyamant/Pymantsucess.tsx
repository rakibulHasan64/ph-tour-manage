import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

const PaymentSuccess = () => {
   const [searchParams] = useSearchParams();
   const transactionId = searchParams.get("transactionId");
   const amount = searchParams.get("amount");
   const status = searchParams.get("status");
   const [copied, setCopied] = useState(false);
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      // Trigger animation on component mount
      setIsVisible(true);
   }, []);

   const copyToClipboard = () => {
      if (transactionId) {
         navigator.clipboard
            .writeText(transactionId)
            .then(() => {
               setCopied(true);
               setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
               console.error("Failed to copy: ", err);
            });
      }
   };


   const isSuccess = status?.toLowerCase() === "success";

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
         <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md w-full transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Status Icon */}
            <div className="flex justify-center mb-6">
               <div className={`p-4 rounded-full ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
                  {isSuccess ? (
                     <CheckCircleIcon className="h-16 w-16 text-green-600" />
                  ) : (
                     <XCircleIcon className="h-16 w-16 text-red-600" />
                  )}
               </div>
            </div>

            {/* Status Message */}
            <h1 className={`text-3xl font-bold text-center mb-2 ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
               Payment {status}
            </h1>

            <p className="text-gray-600 text-center mb-8">
               {isSuccess
                  ? "Your payment was processed successfully"
                  : "There was an issue with your payment"
               }
            </p>

            {/* Transaction Details */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">Amount Paid:</span>
                  <span className="text-2xl font-bold text-indigo-700">${amount}</span>
               </div>

               <div className="mb-1 text-gray-500">Transaction ID:</div>
               <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                  <code className="text-sm text-gray-700 truncate mr-2">{transactionId}</code>
                  <button
                     onClick={copyToClipboard}
                     className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                     title="Copy to clipboard"
                  >
                     <DocumentDuplicateIcon className="h-5 w-5" />
                  </button>
               </div>
               {copied && (
                  <div className="text-green-600 text-sm mt-2 text-right">Copied to clipboard!</div>
               )}
            </div>

            {/* Next Steps */}
            <div className="text-center">
               <p className="text-gray-600 mb-6">
                  {isSuccess
                     ? "You will receive a confirmation email shortly. Thank you for your purchase!"
                     : "Please try again or contact support if the problem persists."
                  }
               </p>

               <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {isSuccess ? (
                     <>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                           View Order Details
                        </button>
                        <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors">
                           Continue Shopping
                        </button>
                     </>
                  ) : (
                     <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                        Try Again
                     </button>
                  )}
               </div>
            </div>

            {/* Support Info */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
               <p className="text-gray-500 text-sm">
                  Need help? <a href="#" className="text-indigo-600 hover:text-indigo-800">Contact Support</a>
               </p>
            </div>
         </div>
      </div>
   );
};

export default PaymentSuccess;