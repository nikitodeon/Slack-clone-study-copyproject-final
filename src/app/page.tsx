"use client";

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspaciId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workspaciId) {
      router.replace(`/workspace/${workspaciId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaciId, isLoading, open, setOpen, router]);

  return (
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
