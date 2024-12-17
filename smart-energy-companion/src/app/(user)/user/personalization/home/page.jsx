'use client';
import HomePersonalization from "@/components/UserComponents/Personalization/HomePersonalization/HomePersonalization";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtils";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {useRouter} from "next/navigation";

function HomePersonalized () {
    const router = useRouter();
    const queryClient = useQueryClient();
    const {userProfile} = queryClient.getQueryData(["UserData"]) || {};

    const {data, isLoading, isError} = useQuery({
        queryKey: ["UserData"],
        queryFn: AdminUtils.userProfile,
        staleTime: Infinity,
        enabled: !userProfile,
    });

    const effectiveUserData = userProfile || data;

    if (isLoading) {
        return <LazyLoading/>;
    }

    if (isError || !data) {
        router.push("/error/e401");
    }
    return (
        <>
            <HomePersonalization userProfile={effectiveUserData}/>
        </>
    )
}

export default HomePersonalized;