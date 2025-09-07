import React from "react";
import {
   useBookingAdminControlQuery,
   usePymantAdminControlQuery,
   useTourAdminControlQuery,
   useUserAdminControlQuery,
} from "../../../redux/featuer/adminstatus/Status";
import { User, Lock, CheckCircle, CreditCard, Map } from "lucide-react";
import {
   PieChart,
   Pie,
   Cell,
   Tooltip,
   ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366F1", "#10B981", "#F87171", "#3B82F6", "#8B5CF6"];

// ---------- Types ----------
interface RoleData {
   _id: string;
   count: number;
}

interface UserStats {
   totalUser: number;
   totalActive: number;
   totalBlocked: number;
   newUserInLast7Days: number;
   newUserInLast30Days: number;
   userByRole: RoleData[];
}

interface TourStats {
   totalTour: number;
   totalTourType: RoleData[];
   totalTourDivision: RoleData[];
}

interface BookingStats {
   totalBooking: number;
   totalBookingByStatus: RoleData[];
   bookingsLast7Days: number;
   bookingsLast30Days: number;
}

interface PaymentStats {
   totalPaymant: number;
   totalPaymantByStatus: RoleData[];
   pymantGatWayData: RoleData[];
}

// ---------- Components ----------
const StatCard: React.FC<{
   title: string;
   value: number | string;
   icon: React.ReactElement;
   iconColor: string;
}> = ({ title, value, icon, iconColor }) => (
   <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex items-center gap-4 border border-gray-200 dark:border-gray-700">
      <div
         className={`w-12 h-12 flex items-center justify-center rounded-full ${iconColor} bg-opacity-20`}
      >
         {React.cloneElement(icon, { className: `w-6 h-6 ${iconColor}` })}
      </div>
      <div>
         <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
         <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {value}
         </p>
      </div>
   </div>
);

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
   if (active && payload && payload.length) {
      return (
         <div className="bg-gray-700 text-white p-2 rounded-md shadow-lg border border-gray-600">
            <p className="font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
         </div>
      );
   }
   return null;
};

// ---------- Main Component ----------
const AnalitisAll: React.FC = () => {
   const { data: userData } = useUserAdminControlQuery(undefined);
   const { data: tourData } = useTourAdminControlQuery(undefined);
   const { data: bookingData } = useBookingAdminControlQuery(undefined);
   const { data: paymentData } = usePymantAdminControlQuery(undefined);

   if (!userData) return <p className="text-gray-500">Loading stats...</p>;

   const userStats: UserStats = userData.data;
   const tourStats: TourStats | undefined = tourData?.data;
   const bookingStats: BookingStats | undefined = bookingData?.data;
   const paymentStats: PaymentStats | undefined = paymentData?.data;

   return (
      <div className="p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
         <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">
            📊 Admin Analytics Dashboard
         </h1>

         {/* ---------- User Stats ---------- */}
         <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            👤 User Stats
         </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            <StatCard
               title="Total Users"
               value={userStats.totalUser}
               icon={<User />}
               iconColor="text-purple-500"
            />
            <StatCard
               title="Active Users"
               value={userStats.totalActive}
               icon={<CheckCircle />}
               iconColor="text-green-500"
            />
            <StatCard
               title="Blocked Users"
               value={userStats.totalBlocked}
               icon={<Lock />}
               iconColor="text-red-500"
            />
            <StatCard
               title="New Users (7d)"
               value={userStats.newUserInLast7Days}
               icon={<User />}
               iconColor="text-blue-500"
            />
            <StatCard
               title="New Users (30d)"
               value={userStats.newUserInLast30Days}
               icon={<User />}
               iconColor="text-indigo-500"
            />
         </div>

         {/* Users by Role Pie Chart */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
               Users by Role
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
               <div className="w-full md:w-1/2 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={userStats.userByRole}
                           dataKey="count"
                           nameKey="_id"
                           cx="50%"
                           cy="50%"
                           outerRadius={80}
                           label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                           }
                        >
                           {userStats.userByRole.map((_, index) => (
                              <Cell
                                 key={`cell-${index}`}
                                 fill={COLORS[index % COLORS.length]}
                              />
                           ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                     </PieChart>
                  </ResponsiveContainer>
               </div>

               <div className="w-full md:w-1/2 flex flex-col gap-3">
                  {userStats.userByRole.map((role, index) => (
                     <div
                        key={role._id}
                        className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
                     >
                        <span
                           className="w-4 h-4 rounded-full"
                           style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                           {role._id}: {role.count}
                        </span>
                        <span className="ml-auto text-gray-500 dark:text-gray-400 text-sm">
                           {((role.count / userStats.totalUser) * 100).toFixed(2)}%
                        </span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* ---------- Tour Stats ---------- */}
         {tourStats && (
            <div className="mb-12">
               <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  🗺️ Tour Stats
               </h2>
               <StatCard
                  title="Total Tours"
                  value={tourStats.totalTour}
                  icon={<Map />}
                  iconColor="text-teal-500"
               />
            </div>
         )}

         {/* ---------- Booking Stats ---------- */}
         {bookingStats && (
            <div className="mb-12">
               <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  📖 Booking Stats
               </h2>
               <StatCard
                  title="Total Bookings"
                  value={bookingStats.totalBooking}
                  icon={<CheckCircle />}
                  iconColor="text-orange-500"
               />
            </div>
         )}

         {/* ---------- Payment Stats ---------- */}
         {paymentStats && (
            <div>
               <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  💳 Payment Stats
               </h2>
               <StatCard
                  title="Total Payments"
                  value={paymentStats.totalPaymant}
                  icon={<CreditCard />}
                  iconColor="text-pink-500"
               />
            </div>
         )}
      </div>
   );
};

export default AnalitisAll;
