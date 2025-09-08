import { useState } from "react";
import { AddDivisionModal } from "../../components/modules/Adminmodules/Divison/AddDivisonModal";
import { useDeleteDivisionMutation, useGetDivisionsQuery } from "../../redux/featuer/divison/Divison.api";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../components/ui/pagination";



export interface IDivision {
   name: string;
   slug: string;
   thumbnail?: string;
   description?: string

}

function AddDivision() {
   const [currentPage,setCurrentPage]=useState(1)
   const { data: divisions, isLoading, error } = useGetDivisionsQuery({ page: currentPage, });
   const [deleteDivision] = useDeleteDivisionMutation();
   const [selectedDivision, setSelectedDivision] = useState(null);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");


   const totalPage = divisions?.meta?.totalPage || 1;

   const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this division?")) {
         try {
            await deleteDivision(id).unwrap();
            alert("Division deleted successfully");
         } catch (err) {
            alert("Error deleting division");
            console.error("Failed to delete division:", err);
         }
      }
   };

   const handleEdit = (division) => {
      setSelectedDivision(division);
      setIsEditModalOpen(true);
   };

   // Filter divisions based on search term
   const filteredDivisions = divisions
      ? divisions.filter((division) =>
         division.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         division.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         division.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : [];

   if (isLoading) {
      return (
         <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center">
               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
               <p className="mt-4 text-lg text-gray-600">Loading divisions...</p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
               <div className="text-red-500 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold mt-4">Failed to Load Divisions</h3>
                  <p className="mt-2 text-gray-600">Please check your connection and try again.</p>
                  <button
                     onClick={() => window.location.reload()}
                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                     Retry
                  </button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
         <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-800 mb-2">Division Management</h1>
               <p className="text-gray-600">Manage your organization's divisions and departments</p>
            </div>

            {/* Stats and Actions Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                     <h2 className="text-xl font-semibold text-gray-800">All Divisions</h2>
                     <p className="text-gray-600">
                        {divisions ? `${divisions.length} division(s) found` : 'No divisions available'}
                     </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                           </svg>
                        </div>
                        <input
                           type="text"
                           placeholder="Search divisions..."
                           className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                     <AddDivisionModal />
                  </div>
               </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Thumbnail
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Slug
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created At
                           </th>
                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDivisions.length > 0 ? (
                           filteredDivisions.map((division) => (
                              <tr key={division._id} className="hover:bg-blue-50 transition-colors duration-150">
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    {division.thumbnail ? (
                                       <img
                                          src={division.thumbnail}
                                          alt={division.name}
                                          className="h-12 w-12 object-cover rounded-lg shadow-sm"
                                       />
                                    ) : (
                                       <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                       </div>
                                    )}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-semibold text-gray-900">{division.name}</div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <div className="text-sm text-gray-600 max-w-xs truncate">
                                       {division.description || "No description provided"}
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md inline-block">
                                       {division.slug}
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-600">
                                       {new Date(division.createdAt).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric'
                                       })}
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                       <button
                                          onClick={() => handleEdit(division)}
                                          className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                                       >
                                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                          </svg>
                                          Edit
                                       </button>
                                       <button
                                          onClick={() => handleDelete(division._id)}
                                          className="text-red-600 hover:text-red-800 transition-colors flex items-center"
                                       >
                                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                          Delete
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan="6" className="px-6 py-8 text-center">
                                 <div className="flex flex-col items-center justify-center text-gray-500">
                                    <svg className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-lg font-medium">No divisions found</p>
                                    <p className="mt-1">
                                       {searchTerm ? 'Try adjusting your search term' : 'Get started by adding your first division'}
                                    </p>
                                 </div>
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && selectedDivision && (
               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                     <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Division</h2>
                     <p className="text-gray-600 mb-4">Edit functionality would be implemented here.</p>
                     <div className="flex justify-end space-x-3">
                        <button
                           onClick={() => setIsEditModalOpen(false)}
                           className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                           Cancel
                        </button>
                        <button
                           onClick={() => {
                              // Handle update logic here
                              setIsEditModalOpen(false);
                           }}
                           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                           Save Changes
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>


         <div className="">
            <Pagination>
               <PaginationContent>
                  <PaginationItem>
                     <PaginationPrevious onClick={() => setCurrentPage((prev) => prev - 1)} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>


                  {
                     Array?.from({ length: totalPage }, (_, index) => index + 1)?.map(page => (
                        <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                           <PaginationLink >{page}</PaginationLink>
                        </PaginationItem>
                     ))
                  }



                  <PaginationItem>
                     <PaginationNext onClick={() => setCurrentPage((prev) => prev + 1)} />
                  </PaginationItem>
               </PaginationContent>
            </Pagination>
         </div>

      </div>
   );
}

export default AddDivision;