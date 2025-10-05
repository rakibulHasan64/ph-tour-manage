import { Search, User, Shield, CheckCircle, XCircle, MoreVertical, Edit, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useAdminContulAlluserQuery } from '../../../redux/featuer/auth/auth.api';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../../components/ui/pagination';
import type { IUser } from '../../../types/auth.type';


// Action dropdown menu
const ActionMenu = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className="relative">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
         >
            <MoreVertical size={18} />
         </button>
         {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl z-10">
               <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Edit size={16} />
                  <span>Edit User</span>
               </button>
               <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <Trash2 size={16} />
                  <span>Delete User</span>
               </button>
            </div>
         )}
      </div>
   );
};


function AdmincontrolUser() {
   const [currentPage, setCurrentPage] = useState(1);
   const [search, setSearch] = useState('');
   const { data: usersData, isLoading, isError } = useAdminContulAlluserQuery({ page: currentPage });

   const totalPage = usersData?.meta?.totalPage || 1;

   if (isLoading) return <p className="text-center py-10">Loading users...</p>;
   if (isError) return <p className="text-center py-10 text-red-500">Error loading users!</p>;

   const users: IUser[] = usersData?.data || [];

   const filteredUsers = users.filter((user: IUser) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
   );

   return (
      <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
         <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
               <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Management</h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Manage all registered users in the system.</p>
               </div>
               <button className="mt-4 md:mt-0 flex items-center gap-2 bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300">
                  <UserPlus size={18} />
                  <span>Add New User</span>
               </button>
            </div>

            {/* Search */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
               <div className="relative flex-grow">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                     type="text"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder="Search by name or email..."
                     className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
               </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
               <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                     <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Verified</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredUsers.length > 0 ? (
                        filteredUsers.map((user: IUser) => (
                           <tr key={user._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-3">
                                    <img
                                       className="w-10 h-10 rounded-full object-cover"
                                       src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`}
                                       alt={`${user.name}'s avatar`}
                                    />
                                    <div>
                                       <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                                       <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 {user.role === "ADMIN" ? (
                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/20 rounded-full">
                                       <Shield size={14} /> Admin
                                    </span>
                                 ) : user.role === "SUPER_ADMIN" ? (
                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/20 rounded-full">
                                       <Shield size={14} /> Super Admin
                                    </span>
                                 ) : user.role === "GUIDE" ? (
                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/20 rounded-full">
                                       <User size={14} /> Guide
                                    </span>
                                 ) : (
                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-900/20 rounded-full">
                                       <User size={14} /> User
                                    </span>
                                 )}
                              </td>

                              <td className="px-6 py-4">
                                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                 </span>
                              </td>
                              <td className="px-6 py-4">
                                 {user.isVerified ? <CheckCircle size={20} className="text-green-500" /> : <XCircle size={20} className="text-red-500" />}
                              </td>
                              <td className="px-6 py-4">
                                 <div className="font-medium">{user.phone || '-'}</div>
                                 <div className="text-gray-500">{user.address || '-'}</div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <ActionMenu />
                              </td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                              No users found.
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>

               {/* Pagination */}
               <div className="mt-4">
                  <Pagination>
                     <PaginationContent>
                        <PaginationItem>
                           <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                        </PaginationItem>

                        {Array.from({ length: totalPage }, (_, i) => i + 1).map(page => (
                           <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                              <PaginationLink>{page}</PaginationLink>
                           </PaginationItem>
                        ))}

                        <PaginationItem>
                           <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPage))} />
                        </PaginationItem>
                     </PaginationContent>
                  </Pagination>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AdmincontrolUser;
