'use client';
import Section from '../ui/Section';
import Container from '../ui/Container';
import AttendanceCard from '../membership/AttendanceCard';
import CampaignCard from '../membership/CampaignCard';
import { useUser } from '@/hooks/queries/useUser';
import { getActiveCampaign } from '@/lib/challenges/campaigns';

const MembershipProgress = () => {
  const { data: userData, isLoading } = useUser();

  if (isLoading || !userData) return null;

  // Only members with an active plan can generate gym visits / earn days.
  const isMember = Boolean(userData.isMember);
  if (!isMember) return null;

  const visitStats = userData?.statistics?.visitStats;
  const totalVisits = visitStats?.totalVisits || 0;
  const visitHistory = visitStats?.visitHistory || [];
  const campaign = getActiveCampaign();

  return (
    <>
      {campaign && (
        <Section title="Izaicinājums">
          <Container>
            <div className="px-5 py-5">
              <CampaignCard campaign={campaign} visitHistory={visitHistory} />
            </div>
          </Container>
        </Section>
      )}

      <Section title="Progress">
        {/* AttendanceCard manages its own padding + full-bleed level banner. */}
        <Container>
          <AttendanceCard totalVisits={totalVisits} visitHistory={visitHistory} />
        </Container>
      </Section>
    </>
  );
};

export default MembershipProgress;
