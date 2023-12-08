import { Icon } from "~/components/icon";
import { Progress } from "~/components/ui/progress";
import { NUMBER } from "~/lib/format";
import { api } from "~/trpc/server";
import { ContributeSheet } from "./contribution-sheet";
import { CTAs } from "./ctas";

export default async function ProjectPage({
  params: { owner_account_id, campaign_number },
}: {
  params: { owner_account_id: string; campaign_number: string };
}) {
  const campaign = await api.near.campaign.query({
    owner_account_id,
    campaign_number: Number(campaign_number),
  });

  const current = Object.values(campaign.contributors).reduce(
    (sum, c) => sum + c,
    0,
  );
  const goal = campaign.goal;

  return (
    <div>
      <div>
        <Progress value={Math.min((current * 100) / goal, 100)} />
        <div className="flex flex-row items-center justify-center gap-2">
          {NUMBER.compact(current)}/{NUMBER.compact(goal)}
        </div>
        {campaign.status === "Active" && (
          <ContributeSheet
            campaign_number={Number(campaign_number)}
            owner_account_id={owner_account_id}
            name={campaign.name}
            missing={Math.max(goal - current, 1)}
          />
        )}
        <CTAs
          campaign={campaign}
          campaign_number={Number(campaign_number)}
          owner_account_id={owner_account_id}
        />
      </div>
      <div className="flex flex-row items-start justify-start gap-4">
        <Icon
          name={campaign.name}
          image={{ ipfs_cid: campaign.image }}
          className="h-24 w-24 rounded-2xl"
        />
        <h1 className="text-4xl font-bold text-deep-navy-blue">
          {campaign.name ?? owner_account_id}
        </h1>
      </div>
      <p>{campaign.description}</p>
      <div>
        <h2 className="pb-8 text-2xl font-semibold text-deep-navy-blue">
          Project timeline:
        </h2>
        {new Date(campaign.deadline).toLocaleDateString()}
      </div>
      <div>
        <h2 className="pb-8 text-2xl font-semibold text-deep-navy-blue">
          Team members:
        </h2>
        {Object.values(campaign.team).map((member) => (
          <div
            key={member.name}
            className="flex flex-row items-center justify-start gap-4"
          >
            <Icon
              name={member.name}
              image={{ ipfs_cid: member.image }}
              className="h-12 w-12 rounded-full"
            />
            <b>{member.name ?? member.account_id}</b>
            <p>{member.background}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
