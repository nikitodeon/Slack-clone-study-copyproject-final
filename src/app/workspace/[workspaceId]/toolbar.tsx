import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/features/channels/api/use-get-channels";

export const Toolbar = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetWorkspace({ id: workspaceId });
  const { data: channels = [] } = useGetChannels({ workspaceId }) || {};
  const { data: members = [] } = useGetMembers({ workspaceId }) || {};

  const onChannelClick = (channelId: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/channel/${channelId}`);
  };

  const onMemberClick = (memberId: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/member/${memberId}`);
  };

  const filteredChannels = channels.filter((channel) =>
    channel?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = members.filter((member) =>
    member?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setOpen(false)} // Закрытие при клике на тёмный фон
          >
            <div
              className="bg-white p-4 rounded-md shadow-lg max-w-sm w-full"
              onClick={(e) => e.stopPropagation()} // Остановка всплытия клика
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 mb-4"
              />

              {filteredChannels.length === 0 && filteredMembers.length === 0 ? (
                <p className="text-sm text-gray-500">No results found.</p>
              ) : (
                <>
                  {filteredChannels.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Channels</h3>
                      <ul>
                        {filteredChannels.map((channel) => (
                          <li
                            key={channel._id}
                            onClick={() => onChannelClick(channel._id)}
                            className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                          >
                            {channel.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {filteredMembers.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold mb-2">Members</h3>
                      <ul>
                        {filteredMembers.map((member) => (
                          <li
                            key={member._id}
                            onClick={() => onMemberClick(member._id)}
                            className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                          >
                            {member.user.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
