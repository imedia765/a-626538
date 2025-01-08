import { Member } from "@/types/member";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import MemberCard from './MemberCard';
import PaginationControls from '../ui/pagination/PaginationControls';
import { usePagination } from '@/hooks/usePagination';

interface MembersListContentProps {
  members: Member[];
  isLoading: boolean;
  userRole: string | null;
  onPaymentClick: (memberId: string) => void;
  onEditClick: (memberId: string) => void;
}

const ITEMS_PER_PAGE = 20;

const MembersListContent = ({
  members,
  isLoading,
  userRole,
  onPaymentClick,
  onEditClick,
}: MembersListContentProps) => {
  const {
    currentPage,
    totalPages,
    from,
    to,
    setCurrentPage,
  } = usePagination({
    totalItems: members.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const paginatedMembers = members.slice(from, to + 1);

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[600px] w-full rounded-md">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-accent1"></div>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {paginatedMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                userRole={userRole}
                onPaymentClick={() => onPaymentClick(member.id)}
                onEditClick={() => onEditClick(member.id)}
              />
            ))}
          </Accordion>
        )}
      </ScrollArea>
      
      {!isLoading && members.length > 0 && (
        <div className="py-4">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default MembersListContent;