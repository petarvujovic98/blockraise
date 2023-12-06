import { Icon } from "~/components/icon";
import { Progress } from "~/components/ui/progress";
import { NUMBER } from "~/lib/format";
import { MOCK_PROJECTS } from "../mock-data";
import { Card, CardDescription, CardHeader } from "~/components/ui/card";

export default function ProjectPage() {
  const project = MOCK_PROJECTS[0]!;

  return (
    <div className="pt-10">
      <div>
        <Progress
          value={Math.min(
            (Number(project.current_funding) * 100) /
            Number(project.funding_goal),
            100,
          )}
        />
        <div className="flex flex-row items-center justify-center gap-2">
          {NUMBER.compact(Number(project.current_funding))}/
          {NUMBER.compact(Number(project.funding_goal))}
        </div>
      </div>
      <div className="flex flex-row items-start justify-start gap-4">
        <Icon name={project.name} image={project.image} />
        <h1 className="text-4xl font-bold text-deep-navy-blue">
          {project.name ?? project.account_id}
        </h1>
      </div>
      <p>{project.description}</p>
      <div>
        <h2 className="pb-8 text-2xl font-semibold text-deep-navy-blue">
          Project timeline:
        </h2>
        {project.timeline}
      </div>
      <div>
        <h2 className="pb-8 text-2xl font-semibold text-deep-navy-blue">
          Team members:
        </h2>
        <div className="flex w-full flex-row items-center gap-4">
          {Object.values(project.team).map((member) => (
            <Card
              key={member.name}
              className="flex flex-col items-center justify-start gap-4"
            >
              <CardHeader>
                <Icon
                  name={member.name}
                  image={member.image}
                  className="h-12 w-12 rounded-full"
                />
                <b>{member.name ?? member.account_id}</b>
                <CardDescription>{member.background}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
