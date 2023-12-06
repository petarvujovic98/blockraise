"use client";

import Link from "next/link";
import { Icon } from "~/components/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { type Profile } from "~/lib/validation/common";
import { NUMBER } from "~/lib/format";

export function ProjectCard({ accountId }: { accountId: string }) {
  const { data, status } = api.near.profile.useQuery({ accountId });

  if (status === "loading") {
    return <ProjectCardSkeleton />;
  }

  if (status === "error") {
    return <ProjectCardEmpty />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Link
            href={`/projects/${accountId}`}
            className="flex flex-row items-center justify-start gap-3"
          >
            <Icon
              name={data.name}
              image={data.image}
              className="h-12 w-12 rounded-full"
            />
            <b>{data.name ?? accountId}</b>
          </Link>
        </CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>{data.timeline}</CardContent>
      <CardFooter className="flex-col">
        <Progress
          value={Math.min(
            (Number(data.current_funding) * 100) / Number(data.funding_goal),
            100,
          )}
        />
        <div className="flex flex-row items-center justify-center gap-2">
          {NUMBER.compact(Number(data.current_funding))}/
          {NUMBER.compact(Number(data.funding_goal))}
        </div>
      </CardFooter>
    </Card>
  );
}

export function ProjectCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-start gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-64" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-80" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-80" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-full" />
      </CardFooter>
    </Card>
  );
}

export function ProjectCardEmpty() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Could not find project.</CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-64 animate-none" />
          <Skeleton className="h-4 w-48 animate-none" />
          <Skeleton className="h-4 w-80 animate-none" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-80 animate-none" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-full animate-none" />
      </CardFooter>
    </Card>
  );
}

export function ProjectCardMock({ profile }: { profile: Profile }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Link
            href={`/projects/${profile.account_id}`}
            className="flex flex-row items-center justify-start gap-3"
          >
            <Icon
              name={profile.name}
              image={profile.image}
              className="h-12 w-12 rounded-full"
            />
            <b>{profile.name ?? profile.account_id}</b>
          </Link>
        </CardTitle>
        <CardDescription>{profile.description}</CardDescription>
      </CardHeader>
      <CardContent>{profile.timeline}</CardContent>
      <CardFooter className="flex-col">
        <Progress
          value={Math.min(
            (Number(profile.current_funding) * 100) /
            Number(profile.funding_goal),
            100,
          )}
        />
        <div className="flex flex-row items-center justify-center gap-2">
          {NUMBER.compact(Number(profile.current_funding))}/
          {NUMBER.compact(Number(profile.funding_goal))}
        </div>
      </CardFooter>
    </Card>
  );
}
