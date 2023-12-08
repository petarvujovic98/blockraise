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
import { DATE, NUMBER } from "~/lib/format";
import { Badge } from "~/components/ui/badge";
import { type Campaign } from "~/lib/validation/common";

export function ProjectCard({
  owner_account_id,
  campaign_number,
}: {
  owner_account_id: string;
  campaign_number: number;
}) {
  const { data, status } = api.near.campaign.useQuery({
    owner_account_id,
    campaign_number,
  });

  if (status === "loading") {
    return <ProjectCardSkeleton />;
  }

  if (status === "error") {
    return <ProjectCardEmpty />;
  }

  const current = Object.values(data.contributors).reduce(
    (sum, c) => sum + c,
    0,
  );
  const goal = data.goal;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Link
            href={`/projects/${owner_account_id}/${campaign_number}`}
            className="flex flex-row items-center justify-start gap-3"
          >
            <Icon
              name={data.name}
              image={{ ipfs_cid: data.image }}
              className="h-12 w-12 rounded-full"
            />
            <b>{data.name ?? `${owner_account_id}-${campaign_number}`}</b>
          </Link>
          <CampaignStatusBadge status={data.status} />
        </CardTitle>
        <CardDescription className="truncate">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent>{DATE.date(data.deadline)}</CardContent>
      <CardFooter className="flex-col">
        <Progress value={Math.min((current * 100) / goal, 100)} />
        <div className="flex flex-row items-center justify-center gap-2">
          {NUMBER.compact(current)}/{NUMBER.compact(goal)}
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

export function CampaignStatusBadge({
  status,
}: {
  status: Campaign["status"];
}) {
  return (
    <Badge
      variant={
        status === "Active"
          ? "outline"
          : status === "Inactive"
            ? "secondary"
            : status === "Completed"
              ? "default"
              : "destructive"
      }
    >
      {status}
    </Badge>
  );
}
