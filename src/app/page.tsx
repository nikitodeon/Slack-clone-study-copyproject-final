"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();

  const workspaciId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workspaciId) {
      console.log("Redirect to workspace");
    } else {
      console.log("Open creation modal");
    }
  }, [workspaciId, isLoading]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
