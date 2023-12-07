import { CreateCampaignInput } from "~/components/inputs/create";

export default function ProjectsPage() {
  return (
    <div className="pt-10">
      <h1 className="text-4xl font-bold text-deep-navy-blue">Create</h1>
      <CreateCampaignInput />
    </div>
  );
}

/**
 * 1. Select a project category
 * 2. Who are you fundraising for? yourself or someone else
 * 3. setup goal amount
 * 4. add photo
 * 5. Title -> description
 */
