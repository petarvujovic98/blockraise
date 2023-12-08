import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { ProjectCard } from "./card";
import { viewCampaignsWithDetails } from "~/lib/fetch";
import { type Campaign } from "~/lib/validation/common";

export default async function ProjectsPage() {
  const campaigns = await viewCampaignsWithDetails();

  const groupings = campaigns.reduce(
    (acc, campaign) => {
      const [, { category }] = campaign;
      const categoryArray:
        | (readonly [readonly [string, number], Campaign])[]
        | undefined = acc[category];

      if (!categoryArray) {
        acc[category] = [campaign];
        return acc;
      }

      categoryArray.push(campaign);
      return acc;
    },
    {} as Record<
      Campaign["category"],
      (readonly [readonly [string, number], Campaign])[]
    >,
  );

  return (
    <div className="pt-10">
      <h1 className="text-4xl font-bold text-deep-navy-blue">Projects</h1>
      {Object.entries(groupings).map(([category, campaigns]) => (
        <Section key={category} title={category}>
          <ScrollArea>
            <div className="flex flex-row items-stretch justify-start gap-4 pb-5">
              {campaigns.map(([[owner, id]]) => (
                <div key={`${owner}-${id}`} className="w-96">
                  <ProjectCard owner_account_id={owner} campaign_number={id} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Section>
      ))}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="py-10">
      <h2 className="pb-10 text-3xl font-semibold text-deep-navy-blue">
        {title}
      </h2>
      {children}
    </section>
  );
}
