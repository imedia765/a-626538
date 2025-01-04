import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";

const MembershipInformation = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-dashboard-accent1 hover:text-dashboard-accent2 transition-colors inline-flex items-center gap-2">
        <Info className="w-4 h-4" />
        <span>View Membership Information</span>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-[#F1F0FB]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-[#221F26]">Pakistan Welfare Association - Membership Information</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="text-center mb-6 text-[#403E43]">
              <p className="font-semibold">Pakistan Welfare Association</p>
              <p>Burton Upon Trent</p>
              <p>December 2024</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#221F26]">1. Members Eligibility</h3>
                <p className="text-[#333333]">Only Muslims can be members of Pakistan Welfare Association (PWA).</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">2. Membership Fee</h3>
                <p className="text-[#333333]">Any new members must pay a membership fee plus the collection amount for that calendar year. Currently the membership fee is £150 as of January 2024. This may change with inflation and is reviewed periodically to reflect the costs incurred.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">3. Dependents Registration</h3>
                <p className="text-[#333333]">All members will be given a membership number and will need to register their dependents so that the PWA Committee can gain an accurate picture of the actual number of people covered. Dependents include stepchildren and adopted children.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">4. Health Declaration</h3>
                <p className="text-[#333333]">New members must be in good health, with no known terminal illnesses. Any long-term illnesses must be disclosed to the Committee for consideration during the membership process.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">5. Confidentiality</h3>
                <p className="text-[#333333]">All data is confidentially stored under GDPR rules and will not be shared except for necessary processes when death occurs or for use within PWA.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">6. Payment Terms</h3>
                <p className="text-[#333333]">Payments will need to be made within 28 days from collection date. This will take place annually from 1st January and no later than 29th January. Any non-paying members will have a warning, and have seven days to make payment which is up until 5th February, in this seven day period they are not covered as members and nor are their dependents.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">7. Non-payment Consequences</h3>
                <p className="text-[#333333]">Any further nonpayment will result in cancellation of membership, and will have to re-register as a member, and must pay a new membership fee of £150. All costs are reviewed periodically to reflect inflation, changes will be communicated to members via their Collector Members or directly through a communication mechanism.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">8-11. Registration Requirements</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-[#333333]">Every married man will need to ensure they are registered separately from their parents or guardian.</li>
                  <li className="text-[#333333]">Every young male over the age of 18 must have membership in the association regardless to the fact they are employed/unemployed or disabled except for being in full time education until their 22nd birthday.</li>
                  <li className="text-[#333333]">No membership charges will apply to migrating members up until their 23rd birthday, where a new membership charge is applicable. Apprenticeships do not count as being in education.</li>
                  <li className="text-[#333333]">As and when a members child leaves full time education, they must also register as an individual member.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">12-16. Special Cases</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-[#333333]">Unmarried females are covered under their parents' membership until marriage.</li>
                  <li className="text-[#333333]">In case of separation or divorce, both parties must have separate memberships.</li>
                  <li className="text-[#333333]">Widowed ladies must maintain regular fee payments as head of family.</li>
                  <li className="text-[#333333]">Additional wives require separate membership registration.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">17-18. Assistance Offered</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-[#333333]">£500 payment to widow/orphans (under 18) upon death of head member (£1,000 if death occurs in Pakistan).</li>
                  <li className="text-[#333333]">Coverage for both viable and non-viable foetus.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">19-21. Residency Requirements</h3>
                <p className="text-[#333333]">Members must be residents of East Staffordshire Borough Council (ESBC). Proof of residency may be required. Special conditions apply for legacy members (pre-2024) who move out of ESBC.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">22. Visitor Membership</h3>
                <p className="text-[#333333]">Visitors can apply for temporary membership at £50 plus last collection (non-refundable).</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">23-24. Repatriation Costs</h3>
                <p className="text-[#333333]">Maximum repatriation costs are based on average of last 4 UK burials. Specific conditions apply for both foreign and UK repatriation.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">25. Financial Buffer</h3>
                <p className="text-[#333333]">A minimum buffer of £16,000 (cost of 4 deaths) must be maintained in the PWA bank account.</p>
              </div>

              <div>
                <h3 className="font-semibold text-[#221F26]">26-27. Additional Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-[#333333]">Extra funeral arrangement costs are the family's responsibility.</li>
                  <li className="text-[#333333]">Committee must vote on payment and rule changes.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#403E43]/10">
              <p className="italic text-[#403E43]">By becoming a member of the Pakistan Welfare Association, you agree to abide by these terms and conditions outlined above.</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipInformation;
