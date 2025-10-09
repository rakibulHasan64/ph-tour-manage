
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery } from "../../redux/featuer/auth/auth.api";
import {
   Loader2,
   Mail,
   Phone,
   MapPin,
   User,
   ShieldCheck,
   Star,
   Award,
   BadgeCheck,
   Clock,
   Calendar,
   MapPinIcon,
   Users,
   DollarSign,
   Eye,
   CheckCircle,
   XCircle,
   AlertCircle,
   RefreshCw,
   CreditCard,
   Download,
   Share2,
   Filter,
   Search,
   X,
   FileText,
   Bell,
   Settings,
   Edit3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useGetPaymantTypesQuery, useGetSingleBookingQuery } from "../../redux/featuer/paymantapi/paymant.api";
// import { BOOKING_STATUS, PAYMENT_STATUS } from "../../types/tour.type";
import { useState } from "react";
import { BOOKING_STATUS, PAYMENT_STATUS } from "../../types/tour.type";







function Account() {
   const { data, isLoading, isError } = useUserInfoQuery(undefined);
   const user = data?.data;
   const [showModal, setShowModal] = useState(false);
   const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

   const { data: paymentData, isLoading: paymentLoading } = useGetPaymantTypesQuery(undefined);
   const bookings = paymentData || [];

   // Fetch single booking data when modal is open
   const { data: singleBookingData, isLoading: singleBookingLoading } = useGetSingleBookingQuery(
      selectedBookingId!,
      { skip: !selectedBookingId }
   );

   const handleShowModal = (id: string) => {
      setSelectedBookingId(id);
      setShowModal(true);
   };

   const handleCloseModal = () => {
      setShowModal(false);
      setSelectedBookingId(null);
   };

   if (isLoading)
      return (
         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-gray-700/30 shadow-2xl">
               <div className="relative">
                  <Loader2 className="animate-spin w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>
               </div>
               <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">Loading your profile...</p>
               <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Please wait a moment</p>
            </div>
         </div>
      );

   if (isError || !user)
      return (
         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-gray-700/30 shadow-2xl">
               <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200 dark:border-red-800">
                  <svg className="w-10 h-10 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
               </div>
               <h3 className="text-red-600 dark:text-red-400 font-semibold text-xl mb-2">Failed to load profile</h3>
               <p className="text-gray-600 dark:text-gray-400 mb-4">We couldn't load your information</p>
               <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
               >
                  Try Again
               </button>
            </div>
         </div>
      );

   const getStatusColor = (status: string) => {
      switch (status) {
         case BOOKING_STATUS.COMPLETE:
         case PAYMENT_STATUS.PAID:
            return 'text-green-700 bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
         case BOOKING_STATUS.CANCEL:
         case PAYMENT_STATUS.CANCELLED:
         case PAYMENT_STATUS.FAILED:
            return 'text-red-700 bg-red-100 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
         case BOOKING_STATUS.PENDING:
         case PAYMENT_STATUS.UNPAID:
            return 'text-yellow-700 bg-yellow-100 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
         case PAYMENT_STATUS.REFUNDED:
            return 'text-blue-700 bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
         default:
            return 'text-gray-700 bg-gray-100 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      }
   };

   const getStatusIcon = (status: string) => {
      switch (status) {
         case BOOKING_STATUS.COMPLETE:
         case PAYMENT_STATUS.PAID:
            return <CheckCircle className="w-4 h-4" />;
         case BOOKING_STATUS.CANCEL:
         case PAYMENT_STATUS.CANCELLED:
         case PAYMENT_STATUS.FAILED:
            return <XCircle className="w-4 h-4" />;
         case BOOKING_STATUS.PENDING:
         case PAYMENT_STATUS.UNPAID:
            return <AlertCircle className="w-4 h-4" />;
         case PAYMENT_STATUS.REFUNDED:
            return <RefreshCw className="w-4 h-4" />;
         default:
            return <AlertCircle className="w-4 h-4" />;
      }
   };

   const getRoleBgColor = (role: string) => {
      switch (role?.toLowerCase()) {
         case 'admin': return 'bg-gradient-to-r from-red-500 to-rose-600';
         case 'premium': return 'bg-gradient-to-r from-purple-500 to-indigo-600';
         case 'user': return 'bg-gradient-to-r from-blue-500 to-cyan-600';
         default: return 'bg-gradient-to-r from-gray-500 to-slate-600';
      }
   };

   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'short',
         day: 'numeric'
      });
   };

   const formatDateTime = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'short',
         day: 'numeric',
         hour: '2-digit',
         minute: '2-digit'
      });
   };

   const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: 'USD',
      }).format(amount);
   };

   // Calculate booking statistics
   const totalBookings = bookings.length;
   const completedBookings = bookings.filter((b: any) =>
      b.status === BOOKING_STATUS.COMPLETE || b.payment?.status === PAYMENT_STATUS.PAID
   ).length;
   const pendingBookings = bookings.filter((b: any) =>
      b.status === BOOKING_STATUS.PENDING || b.payment?.status === PAYMENT_STATUS.UNPAID
   ).length;
   const totalSpent = bookings.reduce((total: number, booking: any) =>
      total + (booking.payment?.amount || 0), 0
   );

   // Single booking data
   const singleBooking = singleBookingData;

   return (
      <div className="min-h-screen mt-22 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:to-indigo-900">
         {/* Header Section */}
         <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-4">
                  <div className="text-center sm:text-left">
                     <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        My Account
                     </h1>
                     <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2">
                        Manage your profile and booking history
                     </p>
                  </div>
                  <div className="flex items-center gap-3">
                     <button className="p-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-2xl border border-gray-200 dark:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md">
                        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                     </button>
                     <button className="p-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-2xl border border-gray-200 dark:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md">
                        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                     </button>
                     <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                        <Edit3 className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit Profile</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">

               {/* Left Column - Profile Section */}
               <div className="xl:col-span-3 space-y-6 lg:space-y-8">

                  {/* Profile Overview Card */}
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-xl overflow-hidden">
                     <div className={`h-2 ${getRoleBgColor(user.role)}`}></div>
                     <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                           {/* Avatar Section */}
                           <div className="relative">
                              <div className="relative">
                                 <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=65c9ff,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=gradientLinear`}
                                    alt={user.name}
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white dark:border-gray-800 shadow-2xl"
                                 />
                                 <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-pulse"></div>
                              </div>
                              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg border border-gray-200 dark:border-gray-700">
                                 <div className={`w-8 h-8 rounded-full ${getRoleBgColor(user.role)} flex items-center justify-center`}>
                                    <BadgeCheck className="w-4 h-4 text-white" />
                                 </div>
                              </div>
                           </div>

                           {/* Profile Info */}
                           <div className="flex-1 text-center lg:text-left">
                              <div className="mb-4">
                                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {user.name}
                                 </h2>
                                 <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getRoleBgColor(user.role)} text-white shadow-lg`}>
                                       {user.role}
                                    </span>
                                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(user.isActive ? 'active' : 'inactive')}`}>
                                       {user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                 </div>
                                 <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                 </p>
                              </div>

                              {/* Quick Stats */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                 <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalBookings}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Bookings</div>
                                 </div>
                                 <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{completedBookings}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
                                 </div>
                                 <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{pendingBookings}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
                                 </div>
                                 <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(totalSpent)}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Total Spent</div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Personal Information & Account Status */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

                     {/* Personal Information */}
                     <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-xl">
                        <CardHeader className="pb-4">
                           <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                 <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              Personal Information
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-600/50 transition-all duration-200">
                              <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                 <p className="font-semibold text-gray-900 dark:text-white truncate">{user.email}</p>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-600/50 transition-all duration-200">
                              <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                                 <p className="font-semibold text-gray-900 dark:text-white">{user.phone || "Not provided"}</p>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-600/50 transition-all duration-200">
                              <MapPin className="w-5 h-5 text-red-500 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                                 <p className="font-semibold text-gray-900 dark:text-white">{user.address || "No address available"}</p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Account Status */}
                     <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-xl">
                        <CardHeader className="pb-4">
                           <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                 <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              </div>
                              Account Status
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                              <ShieldCheck className={`w-5 h-5 ${user.isVerified ? "text-green-500" : "text-gray-400"}`} />
                              <div>
                                 <p className="text-sm text-gray-500 dark:text-gray-400">Verification Status</p>
                                 <p className={`font-semibold ${user.isVerified ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}>
                                    {user.isVerified ? "Verified Account" : "Not Verified"}
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                              <Star className="w-5 h-5 text-yellow-500" />
                              <div>
                                 <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                                 <p className="font-semibold text-gray-900 dark:text-white">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                       year: 'numeric',
                                       month: 'long',
                                       day: 'numeric'
                                    })}
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                              <Clock className="w-5 h-5 text-indigo-500" />
                              <div>
                                 <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                                 <p className="font-semibold text-gray-900 dark:text-white">
                                    {formatDateTime(user.updatedAt)}
                                 </p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>

                  {/* Booking History Section */}
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-xl">
                     <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                           <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                           </div>
                           Booking History
                        </CardTitle>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                           <div className="relative flex-1 sm:flex-none">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                 type="text"
                                 placeholder="Search bookings..."
                                 className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                           </div>
                           <button className="p-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-2xl border border-gray-200 dark:border-gray-600 transition-all duration-200">
                              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                           </button>
                        </div>
                     </CardHeader>
                     <CardContent>
                        {paymentLoading ? (
                           <div className="text-center py-12">
                              <Loader2 className="animate-spin w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                              <p className="text-gray-600 dark:text-gray-400">Loading your bookings...</p>
                           </div>
                        ) : bookings.length > 0 ? (
                           <div className="space-y-4">
                              {bookings.map((booking: any) => (
                                 <div key={booking._id} className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 group">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                       <div className="flex-1 min-w-0">
                                          <div className="flex items-start gap-4">
                                             <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                                <MapPinIcon className="w-6 h-6 text-white" />
                                             </div>
                                             <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                   {booking.tour?.title || 'Unknown Tour'}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                                   {booking.tour?.location || 'Location not specified'}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-medium border border-gray-200 dark:border-gray-500">
                                                      <Users className="w-3.5 h-3.5" />
                                                      {booking.guestCount} guests
                                                   </span>
                                                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-medium border border-gray-200 dark:border-gray-500">
                                                      <DollarSign className="w-3.5 h-3.5" />
                                                      {formatCurrency(booking.payment?.amount || 0)}
                                                   </span>
                                                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-medium border border-gray-200 dark:border-gray-500">
                                                      <Calendar className="w-3.5 h-3.5" />
                                                      {formatDate(booking.createdAt)}
                                                   </span>
                                                </div>
                                             </div>
                                          </div>
                                       </div>

                                       <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3">
                                          <div className="flex items-center gap-2">
                                             <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${getStatusColor(booking.payment?.status)}`}>
                                                {getStatusIcon(booking.payment?.status)}
                                                {booking.payment?.status || PAYMENT_STATUS.UNPAID}
                                             </span>
                                          </div>
                                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                                             {getStatusIcon(booking.status)}
                                             {booking.status}
                                          </span>
                                          <div className="flex gap-2">
                                             <button
                                                onClick={() => handleShowModal(booking._id)}
                                                className="p-2 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 rounded-xl border border-gray-200 dark:border-gray-500 transition-all duration-200"
                                             >
                                                <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                             </button>
                                             <button className="p-2 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 rounded-xl border border-gray-200 dark:border-gray-500 transition-all duration-200">
                                                <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                             </button>
                                          </div>
                                       </div>
                                    </div>

                                    {/* Tour Details */}
                                    {booking.tour && (
                                       <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                             <div>
                                                <span className="font-semibold text-gray-500 dark:text-gray-400 text-xs">DATES:</span>
                                                <p className="text-gray-900 dark:text-white text-sm font-medium">
                                                   {formatDate(booking.tour.startDate)} - {formatDate(booking.tour.endDate)}
                                                </p>
                                             </div>
                                             <div>
                                                <span className="font-semibold text-gray-500 dark:text-gray-400 text-xs">TRANSACTION ID:</span>
                                                <p className="text-gray-900 dark:text-white font-mono text-sm truncate">
                                                   {booking.payment?.transactionId || 'N/A'}
                                                </p>
                                             </div>
                                             <div>
                                                <span className="font-semibold text-gray-500 dark:text-gray-400 text-xs">BOOKED ON:</span>
                                                <p className="text-gray-900 dark:text-white text-sm font-medium">
                                                   {formatDateTime(booking.createdAt)}
                                                </p>
                                             </div>
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-200 dark:border-gray-600">
                              <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                              <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">No bookings yet</h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-6">Your booking history will appear here once you make your first reservation</p>
                              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                                 Explore Tours
                              </button>
                           </div>
                        )}
                     </CardContent>
                  </Card>
               </div>

               {/* Right Column - Sidebar */}
               <div className="space-y-6 lg:space-y-8 sticky top-6">

                  {/* Account Level Card */}
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-xl overflow-hidden">
                     <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                           <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                              <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                           </div>
                           Account Level
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="text-center">
                           <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                              <span className="text-2xl font-black text-white">
                                 {user.role === 'admin' ? 'A' : user.role === 'premium' ? 'P' : 'U'}
                              </span>
                           </div>
                           <p className="font-bold text-gray-900 dark:text-white text-lg capitalize mb-1">{user.role} Member</p>
                           <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                              {user.isVerified ? 'Full access granted' : 'Limited access'}
                           </p>
                           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                 className={`h-2 rounded-full ${getRoleBgColor(user.role)} transition-all duration-1000`}
                                 style={{ width: user.isVerified ? '100%' : '60%' }}
                              ></div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-xl">
                     <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                           Quick Actions
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-3">
                        <button className="w-full flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-600/50 rounded-2xl border border-gray-200 dark:border-gray-600 transition-all duration-200 group">
                           <CreditCard className="w-5 h-5 text-blue-500 group-hover:text-blue-600" />
                           <span className="font-medium text-gray-700 dark:text-gray-300">Payment Methods</span>
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-600/50 rounded-2xl border border-gray-200 dark:border-gray-600 transition-all duration-200 group">
                           <Download className="w-5 h-5 text-green-500 group-hover:text-green-600" />
                           <span className="font-medium text-gray-700 dark:text-gray-300">Export Data</span>
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-600/50 rounded-2xl border border-gray-200 dark:border-gray-600 transition-all duration-200 group">
                           <Share2 className="w-5 h-5 text-purple-500 group-hover:text-purple-600" />
                           <span className="font-medium text-gray-700 dark:text-gray-300">Share Profile</span>
                        </button>
                     </CardContent>
                  </Card>

                  {/* Security Status */}
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-xl">
                     <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                           <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                              <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                           </div>
                           Security Status
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                           <CheckCircle className="w-5 h-5 text-green-500" />
                           <div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">Account Protected</p>
                              <p className="text-green-600 dark:text-green-400 text-xs">Enhanced security active</p>
                           </div>
                        </div>
                        <div className={`flex items-center gap-3 p-3 rounded-2xl border ${user.isVerified ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'}`}>
                           {user.isVerified ? (
                              <CheckCircle className="w-5 h-5 text-blue-500" />
                           ) : (
                              <AlertCircle className="w-5 h-5 text-gray-400" />
                           )}
                           <div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                 {user.isVerified ? 'Email Verified' : 'Verify Email'}
                              </p>
                              <p className={`text-xs ${user.isVerified ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                 {user.isVerified ? 'Your email is confirmed' : 'Confirm your email address'}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                           <ShieldCheck className="w-5 h-5 text-gray-400" />
                           <div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">Two-Factor Auth</p>
                              <p className="text-gray-500 dark:text-gray-400 text-xs">Available for setup</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>

         {/* Booking Details Modal */}
         {showModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
               <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                           <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Details</h2>
                           <p className="text-gray-500 dark:text-gray-400 text-sm">Complete booking information</p>
                        </div>
                     </div>
                     <button
                        onClick={handleCloseModal}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                     >
                        <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                     </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                     {singleBookingLoading ? (
                        <div className="text-center py-12">
                           <Loader2 className="animate-spin w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                           <p className="text-gray-600 dark:text-gray-400">Loading booking details...</p>
                        </div>
                     ) : singleBooking ? (
                           <div className="space-y-6 overflow-y-auto">
                           {/* Tour Information */}
                           <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                 <MapPinIcon className="w-5 h-5 text-blue-500" />
                                 Tour Information
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Tour Name</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{singleBooking.tour?.title || 'N/A'}</p>
                                 </div>
                                 <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{singleBooking.tour?.location || 'N/A'}</p>
                                 </div>
                                 {singleBooking.tour?.startDate && (
                                    <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                                       <p className="font-semibold text-gray-900 dark:text-white">{formatDate(singleBooking.tour.startDate)}</p>
                                    </div>
                                 )}
                                 {singleBooking.tour?.endDate && (
                                    <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
                                       <p className="font-semibold text-gray-900 dark:text-white">{formatDate(singleBooking.tour.endDate)}</p>
                                    </div>
                                 )}
                              </div>
                           </div>

                           {/* Booking Details */}
                           <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                 <Calendar className="w-5 h-5 text-green-500" />
                                 Booking Details
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Booking ID</p>
                                    <p className="font-mono font-semibold text-gray-900 dark:text-white text-sm">{singleBooking._id}</p>
                                 </div>
                                 <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Booking Date</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{formatDateTime(singleBooking.createdAt)}</p>
                                 </div>
                                 <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Number of Guests</p>
                                    <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                                       <Users className="w-4 h-4" />
                                       {singleBooking.guestCount} guests
                                    </p>
                                 </div>
                                 <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Booking Status</p>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(singleBooking.status)}`}>
                                       {getStatusIcon(singleBooking.status)}
                                       {singleBooking.status}
                                    </span>
                                 </div>
                              </div>
                           </div>

                           {/* Payment Information */}
                           <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                 <CreditCard className="w-5 h-5 text-purple-500" />
                                 Payment Information
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                                    <p className="font-semibold text-gray-900 dark:text-white text-xl">
                                       {formatCurrency(singleBooking.payment?.amount || 0)}
                                    </p>
                                 </div>
                                 <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Payment Status</p>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(singleBooking.payment?.status)}`}>
                                       {getStatusIcon(singleBooking.payment?.status)}
                                       {singleBooking.payment?.status || PAYMENT_STATUS.UNPAID}
                                    </span>
                                 </div>
                                 {singleBooking.payment?.transactionId && (
                                    <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</p>
                                       <p className="font-mono font-semibold text-gray-900 dark:text-white text-sm">{singleBooking.payment.transactionId}</p>
                                    </div>
                                 )}
                                 {singleBooking.payment?.createdAt && (
                                    <div>
                                       <p className="text-sm text-gray-500 dark:text-gray-400">Payment Date</p>
                                       <p className="font-semibold text-gray-900 dark:text-white">
                                          {formatDateTime(singleBooking.payment.createdAt)}
                                       </p>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div className="text-center py-12">
                           <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                           <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">Booking not found</h3>
                           <p className="text-gray-600 dark:text-gray-400">Unable to load booking details</p>
                        </div>
                     )}
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end gap-3 p-6 mb-14 border-t border-gray-200 dark:border-gray-700">
                     <button
                        onClick={handleCloseModal}
                        className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-2xl font-medium transition-all duration-200"
                     >
                        Close
                     </button>
                     <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-all duration-200 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Invoice
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Account;