import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Search } from "lucide-react";

import {
  // Command,
  CommandDialog,
  // CommandEmpty,
  // CommandGroup,
  // CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  // CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/features/channels/api/use-get-channels";

export const Toolbar = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useState(false);

  const { data } = useGetWorkspace({ id: workspaceId });
  const { data: channels } = useGetChannels({ workspaceId });
  const { data: members } = useGetMembers({ workspaceId });

  const onChannelClick = (channelId: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/channel/${channelId}`);
  };

  const onMemberClick = (memberId: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/member/${memberId}`);
  };

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">Search {data?.name}</span>
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
            style={{
              borderColor: "transparent",
              backgroundColor: "#f5f5f5",
              boxShadow: "none",
            }}
          />
          <div className="p-2">
            {(!channels || channels.length === 0) &&
            (!members || members.length === 0) ? (
              <p className="text-sm text-gray-500">No results found.</p>
            ) : (
              <>
                {channels && channels.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Channels</h3>
                    <ul>
                      {channels.map((channel) =>
                        channel && channel._id && channel.name ? (
                          <li
                            key={channel._id}
                            onClick={() => onChannelClick(channel._id)}
                            className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                          >
                            {channel.name}
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                )}

                {members && members.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2">Members</h3>
                    <ul>
                      {members.map((member) =>
                        member && member._id && member.user?.name ? (
                          <li
                            key={member._id}
                            onClick={() => onMemberClick(member._id)}
                            className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                          >
                            {member.user.name}
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </CommandDialog>
      </div>

      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
