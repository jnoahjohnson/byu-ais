import ActivityOverview from "~/components/activities/activity-overview";
import ContentContainer from "~/components/layout/content-container";
import PageHeader from "~/components/page-header";

export default function ActivitesPage() {
  return (
    <div className="py-8">
      <ContentContainer>
        <PageHeader
          title="Activities"
          subtitle="There are a variety of different activities that AIS puts on to
                help students grow their network and skills. Best of all, there
                is almost always food!"
        />
        <ActivityOverview />
      </ContentContainer>
    </div>
  );
}
