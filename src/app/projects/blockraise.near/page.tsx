import { Icon } from "~/components/icon";
import { Progress } from "~/components/ui/progress";
import { DATE, NUMBER } from "~/lib/format";
import { MOCK_PROJECTS } from "../mock-data";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function ProjectPage() {
  const project = MOCK_PROJECTS[0]!;
  const current = Object.values(project.contributors).reduce(
    (sum, c) => sum + c,
    0,
  );
  const goal = project.goal;

  return (
    <div className="pt-10">
      <div>
        <Progress value={Math.min((current * 100) / goal, 100)} />
        <div className="flex flex-row items-center justify-center gap-2">
          {NUMBER.compact(current)}/{NUMBER.compact(goal)}
        </div>
      </div>
      <div className="flex flex-row items-start justify-start gap-4">
        <Icon name={project.name} image={{ ipfs_cid: project.image }} />
        <h1 className="text-4xl font-bold text-deep-navy-blue">
          {project.name ?? project.account_id}
        </h1>
      </div>
      <p>{project.description}</p>
      <div>
        <h2 className="pb-8 text-2xl font-semibold text-deep-navy-blue">
          Project timeline:
        </h2>
        {DATE.date(project.deadline)}
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
                  image={{ ipfs_cid: member.image }}
                  className="h-12 w-12 rounded-full"
                />
                <CardTitle>{member.name ?? member.account_id}</CardTitle>
                <CardDescription>{member.background}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
