'use client';
import { lazy, useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtils";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import { toast } from 'sonner';

const Dashboard = lazy(() => import("@/components/UserComponents/DashboardComponents/Dashboard/Dashboard"));

function UserDashboard() {
    const router = useRouter();
    const queryClient = useQueryClient();

    // Retrieve cached userProfile if available
    const {userProfile} = queryClient.getQueryData(["UserData"]) || {};

    // Fetch the user profile if not in the cache
    const {data, isLoading, isError} = useQuery({
        queryKey: ["UserData"],
        queryFn: AdminUtils.userProfile,
        staleTime: Infinity,
        enabled: !userProfile,
    });

    const effectiveUserData = userProfile || data;

    useEffect(() => {
        if (effectiveUserData) {
            // Check if the user profile is complete
            const isProfileComplete = effectiveUserData.firstName && effectiveUserData.lastName;

            if (!isProfileComplete) {
                toast.info('Redirecting to finish up profile settings...');
                router.push("/user/get-started");
            }
        } else if (!isLoading && isError) {
            // If fetching fails or user data is unavailable, redirect to an error page
            router.push("/error/e401");
        }
    }, [effectiveUserData, isLoading, isError, router]);

    if (isLoading || !effectiveUserData) {
        return <LazyLoading />;
    }

    return (
        <Suspense fallback={<LazyLoading />}>
            <Dashboard userProfile={effectiveUserData} />
        </Suspense>
    );
}

export default UserDashboard;
