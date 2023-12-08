"use client";

import { Button } from "~/components/ui/button";
import { type Campaign } from "~/lib/validation/common";
import { useAccountId, useSignTx } from "~/stores/global";

export function CTAs({
  owner_account_id,
  campaign_number,
  campaign,
}: {
  owner_account_id: string;
  campaign_number: number;
  campaign: Campaign;
}) {
  const accountId = useAccountId();
  const signTx = useSignTx();
  const isOwner = accountId === owner_account_id;
  const expired = campaign.deadline < Date.now();

  if (
    !isOwner ||
    campaign.status === "Completed" ||
    campaign.status === "Failed" ||
    expired
  ) {
    return <></>;
  }

  if (campaign.status === "Inactive") {
    if (!expired) {
      return (
        <Button
          type="button"
          variant="default"
          onClick={() =>
            signTx(
              "activate_campaign",
              { owner_account_id, campaign_number },
              1n,
            )
          }
        >
          Activate
        </Button>
      );
    }

    return <></>;
  }

  if (expired) {
    return (
      <Button
        type="button"
        variant="destructive"
        onClick={() =>
          signTx("fail_campaign", { owner_account_id, campaign_number }, 1n)
        }
      >
        Mark as failed
      </Button>
    );
  }

  const current = Object.values(campaign.contributors).reduce(
    (sum, c) => sum + c,
    0,
  );

  if (campaign.goal <= current) {
    return (
      <Button
        type="button"
        variant="default"
        onClick={() =>
          signTx("complete_campaign", { owner_account_id, campaign_number }, 1n)
        }
      >
        Mark as complete
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={() =>
        signTx("deactivate_campaign", { owner_account_id, campaign_number }, 1n)
      }
    >
      Deactivate
    </Button>
  );
}
