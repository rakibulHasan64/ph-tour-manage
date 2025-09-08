/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { User, Lock, CheckCircle, CreditCard, Map, TrendingUp, Calendar, BarChart3 } from "lucide-react";
import {
   PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
   AreaChart, Area, XAxis, YAxis, CartesianGrid,
   LineChart, Line, 
} from "recharts";
import { useBookingAdminControlQuery, usePymantAdminControlQuery, useTourAdminControlQuery, useUserAdminControlQuery } from "../../../redux/featuer/adminstatus/Status";

// ---------- Color Constants ----------
const COLORS = ["#6366F1", "#10B981", "#F87171", "#3B82F6", "#8B5CF6", "#F59E0B", "#EC4899"];
const ORANGE_COLORS = {
   light: "#FFE4CC",
   medium: "#FFA64D",
   dark: "#FF8000",
   gradient: "from-orange-400 to-orange-600"
};

const CARD_COLORS = {
   purple: "from-purple-500 to-purple-600",
   green: "from-emerald-500 to-emerald-600",
   red: "from-rose-500 to-rose-600",
   blue: "from-blue-500 to-blue-600",
   indigo: "from-indigo-500 to-indigo-600",
   orange: ORANGE_COLORS.gradient,
   pink: "from-pink-500 to-pink-600",
};

// ---------- Sample Data for Charts ----------
const userGrowthData = [
   { month: 'Jan', users: 12 },
   { month: 'Feb', users: 20 },
   { month: 'Mar', users: 180 },
   { month: 'Apr', users: 290 },
   { month: 'May', users: 380 },
   { month: 'Jun', users: 420 },
   { month: 'Jul', users: 530 },
];

const revenueData = [
   { day: 'Mon', revenue: 1200 },
   { day: 'Tue', revenue: 1900 },
   { day: 'Wed', revenue: 1500 },
   { day: 'Thu', revenue: 2100 },
   { day: 'Fri', revenue: 2800 },
   { day: 'Sat', revenue: 3800 },
   { day: 'Sun', revenue: 3500 },
];

const bookingTrendData = [
   { week: 'W1', bookings: 45 },
   { week: 'W2', bookings: 52 },
   { week: 'W3', bookings: 48 },
   { week: 'W4', bookings: 67 },
   { week: 'W5', bookings: 75 },
];

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
   color: keyof typeof CARD_COLORS;
   change?: string;
   changeType?: "positive" | "negative";
}> = ({ title, value, icon, color, change, changeType }) => (
   <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start">
         <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            {change && (
               <div className={`flex items-center mt-2 text-sm ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  <TrendingUp size={14} className="mr-1" />
                  <span>{change}</span>
               </div>
            )}
         </div>
         <div className={`p-3 rounded-xl bg-gradient-to-r ${CARD_COLORS[color]} text-white`}>
            {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 24 })}
         </div>
      </div>
   </div>
);

const SectionHeader: React.FC<{ title: string; icon: React.ReactElement }> = ({ title, icon }) => (
   <div className="flex items-center mb-6">
      <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-3">
         {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 20 })}
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
   </div>
);

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
   if (active && payload && payload.length) {
      return (
         <div className="bg-gray-800 text-white p-3 rounded-md shadow-lg border border-gray-700">
            <p className="font-medium">{label}</p>
            {payload.map((entry: any, index: number) => (
               <p key={index} className="text-sm" style={{ color: entry.color }}>
                  {entry.name}: {entry.value}
               </p>
            ))}
         </div>
      );
   }
   return null;
};

// ---------- Chart Components ----------
const UserGrowthChart: React.FC = () => (
   <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
         <AreaChart
            data={userGrowthData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
         >
            <defs>
               <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={ORANGE_COLORS.dark} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={ORANGE_COLORS.dark} stopOpacity={0.1} />
               </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip content={<CustomTooltip />} />
            <Area
               type="monotone"
               dataKey="users"
               stroke={ORANGE_COLORS.dark}
               fillOpacity={1}
               fill="url(#colorUsers)"
               name="Total Users"
            />
         </AreaChart>
      </ResponsiveContainer>
   </div>
);

const RevenueTrendChart: React.FC = () => (
   <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
         <LineChart
            data={revenueData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
         >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
            <XAxis dataKey="day" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip content={<CustomTooltip />} />
            <Line
               type="monotone"
               dataKey="revenue"
               stroke={ORANGE_COLORS.dark}
               strokeWidth={3}
               dot={{ fill: ORANGE_COLORS.dark, strokeWidth: 2, r: 5 }}
               activeDot={{ r: 8, fill: ORANGE_COLORS.dark }}
               name="Revenue ($)"
            />
         </LineChart>
      </ResponsiveContainer>
   </div>
);

const BookingTrendChart: React.FC = () => (
   <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
         <AreaChart
            data={bookingTrendData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
         >
            <defs>
               <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={ORANGE_COLORS.medium} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={ORANGE_COLORS.medium} stopOpacity={0.1} />
               </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
            <XAxis dataKey="week" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip content={<CustomTooltip />} />
            <Area
               type="monotone"
               dataKey="bookings"
               stroke={ORANGE_COLORS.medium}
               fillOpacity={1}
               fill="url(#colorBookings)"
               name="Bookings"
            />
         </AreaChart>
      </ResponsiveContainer>
   </div>
);

// ---------- Main Component ----------
const AnalitisAll: React.FC = () => {
   const { data: userData } = useUserAdminControlQuery(undefined);
   const { data: tourData } = useTourAdminControlQuery(undefined);
   const { data: bookingData } = useBookingAdminControlQuery(undefined);
   const { data: paymentData } = usePymantAdminControlQuery(undefined);

   console.log();
   

   if (!userData) {
      return (
         <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
         </div>
      );
   }

   const userStats: UserStats = userData.data;
   const tourStats: TourStats | undefined = tourData?.data;
   const bookingStats: BookingStats | undefined = bookingData?.data;
   const paymentStats: PaymentStats | undefined = paymentData?.data;

   return (
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
         <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
               <p className="text-gray-600 dark:text-gray-400">Overview of your platform's performance and metrics</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
               <StatCard
                  title="Total Users"
                  value={userStats.totalUser}
                  icon={<User />}
                  color="purple"
                  change="+12%"
                  changeType="positive"
               />
               <StatCard
                  title="Active Tours"
                  value={tourStats?.totalTour || 0}
                  icon={<Map />}
                  color="green"
                  change="+5%"
                  changeType="positive"
               />
               <StatCard
                  title="Total Bookings"
                  value={bookingStats?.totalBooking || 0}
                  icon={<CheckCircle />}
                  color="blue"
                  change="+18%"
                  changeType="positive"
               />
               <StatCard
                  title="Total Revenue"
                  value={`$${paymentStats?.totalPaymant || 0}`}
                  icon={<CreditCard />}
                  color="orange"
                  change="+22%"
                  changeType="positive"
               />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <SectionHeader title="User Growth (Last 6 Months)" icon={<TrendingUp size={20} />} />
                  <UserGrowthChart />
               </div>

               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <SectionHeader title="Revenue Trends (Last Week)" icon={<BarChart3 size={20} />} />
                  <RevenueTrendChart />
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Left Column */}
               <div className="space-y-8">
                  {/* User Stats */}
                  <div className=" dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                     <SectionHeader title="User Analytics" icon={<User size={20} />} />

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <StatCard title="Active Users" value={userStats.totalActive} icon={<CheckCircle />} color="green" />
                        <StatCard title="Blocked Users" value={userStats.totalBlocked} icon={<Lock />} color="red" />
                        <StatCard title="New Users (7d)" value={userStats.newUserInLast7Days} icon={<Calendar />} color="blue" />
                        <StatCard title="New Users (30d)" value={userStats.newUserInLast30Days} icon={<BarChart3 />} color="indigo" />
                     </div>

                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Users by Role</h3>
                     <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-full md:w-2/5 h-64">
                           <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                 <Pie
                                    data={userStats.userByRole}
                                    dataKey="count"
                                    nameKey="_id"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    labelLine={false}
                                 >
                                    {userStats.userByRole.map((_, index) => (
                                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                 </Pie>
                                 <Tooltip content={<CustomTooltip />} />
                              </PieChart>
                           </ResponsiveContainer>
                        </div>
                        <div className="w-full md:w-3/5 flex flex-col gap-2">
                           {userStats?.userByRole.map((role, index) => (
                              <div
                                 key={role._id}
                                 className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                              >
                                 <div className="flex items-center">
                                    <span
                                       className="w-3 h-3 rounded-full mr-3"
                                       style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    ></span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{role._id}</span>
                                 </div>
                                 <div className="text-right">
                                    <span className="font-semibold text-gray-900 dark:text-white">{role.count}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                       {((role.count / userStats.totalUser) * 100).toFixed(1)}%
                                    </span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Column */}
               <div className="space-y-8">
                  {/* Booking Stats */}
                  {bookingStats && (
                     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <SectionHeader title="Booking Analytics" icon={<CheckCircle size={20} />} />

                        <div className="mb-6">
                           <BookingTrendChart />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <StatCard title="Total Bookings" value={bookingStats.totalBooking} icon={<CheckCircle />} color="blue" />
                           <StatCard title="Last 7 Days" value={bookingStats.bookingsLast7Days} icon={<Calendar />} color="purple" />
                           <StatCard title="Last 30 Days" value={bookingStats.bookingsLast30Days} icon={<BarChart3 />} color="indigo" />
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AnalitisAll;