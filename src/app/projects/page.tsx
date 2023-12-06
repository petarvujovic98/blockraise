import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { MOCK_PROJECTS } from "./mock-data";
import { ProjectCardMock } from "./card";

export default function ProjectsPage() {
  return (
    <div className="pt-10">
      <h1 className="text-4xl font-bold text-deep-navy-blue">Projects</h1>
      <Section title="Technology">
        <ScrollArea>
          <div className="flex flex-row items-stretch justify-start gap-4 pb-5">
            {MOCK_PROJECTS.map((project) => (
              <div key={project.account_id} className="w-96">
                <ProjectCardMock profile={project} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Section>

      <Section title="Art">
        <ScrollArea>
          <div className="flex flex-row items-stretch justify-start gap-4 pb-5">
            {MOCK_PROJECTS.map((project) => (
              <div key={project.account_id} className="w-96">
                <ProjectCardMock profile={project} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Section>

      <Section title="Social impact">
        <ScrollArea>
          <div className="flex flex-row items-stretch justify-start gap-4 pb-5">
            {MOCK_PROJECTS.map((project) => (
              <div key={project.account_id} className="w-96">
                <ProjectCardMock profile={project} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Section>
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
