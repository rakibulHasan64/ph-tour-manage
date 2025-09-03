
import { Navigate } from "react-router";
import type { TRole } from "../types";
import type { ComponentType } from "react";
import { useUserInfoQuery } from "../redux/featuer/auth/auth.api";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
   return function AuthWrapper() {
      const { data, isLoading } = useUserInfoQuery(undefined);

      if (!isLoading && !data?.data?.email) {
         return <Navigate to="/login" />;
      }

      if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
         return <Navigate to="/unauthorized" />;
      }

      return <Component />;
   };
};