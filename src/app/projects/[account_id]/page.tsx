import { Icon } from "~/components/icon";
import { Progress } from "~/components/ui/progress";
import { NUMBER } from "~/lib/format";
import { api } from "~/trpc/server";

export default async function ProjectPage({
  params: { account_id },
}: {
  params: { account_id: string };
}) {
  const project = await api.near.profile.query({ account_id });

  return (
    <div>
      <div>
        <Progress
          value={Math.min(
            (Number(project.blockraise.current_funding) * 100) /
            Number(project.blockraise.funding_goal),
            100,
          )}
        />
        <div className="flex flex-row items-center justify-center gap-2">
          {NUMBER.compact(Number(project.blockraise.current_funding))}/
          {NUMBER.compact(Number(project.blockraise.funding_goal))}
        </div>
      </div>
      <div className="flex flex-row items-start justify-start gap-4">
        <Icon
          name={project.name}
          image={project.image}
          className="h-24 w-24 rounded-2xl"
        />
        <h1 className="text-4xl font-bold text-deep-navy-blue">
          {project.name ?? account_id}
        </h1>
      </div>
      <p>{project.blockraise.description}</p>
      <div>
        <h2 className="pb-8 text-2xl font-semibold text-deep-navy-blue">
          Project timeline:
        </h2>
        {project.blockraise.timeline}
      </div>
      <div>
        <h2 className="pb-8 text-2xl font-semibold text-deep-navy-blue">
          Team members:
        </h2>
        {Object.values(project.blockraise.team).map((member) => (
          <div
            key={member.name}
            className="flex flex-row items-center justify-start gap-4"
          >
            <Icon
              name={member.name}
              image={member.image}
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
