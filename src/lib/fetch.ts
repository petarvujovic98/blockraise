import { providers } from "near-api-js";
import { type CodeResult } from "near-api-js/lib/providers/provider";
import {
  campaignSchema,
  placeholderImage,
  type Profile,
  profileSchema,
} from "./validation/common";
import {
  BLOCK_RAISE_CONTRACT_ID,
  INITIAL_ACCOUNT_STORAGE_BALANCE,
  MIN_STORAGE_BALANCE,
  SOCIAL_CONTRACT_ID,
} from "./constants/tx";

function getProvider() {
  return new providers.JsonRpcProvider({
    url: "https://rpc.mainnet.near.org",
  });
}

export function encodeArgs(args: Record<string, unknown>) {
  return Buffer.from(JSON.stringify(args)).toString("base64");
}

export async function viewCall<T>(
  contract: string,
  method: string,
  args: Record<string, unknown>,
) {
  const provider = getProvider();

  const result = await provider.query<CodeResult>({
    request_type: "call_function",
    finality: "final",
    account_id: contract,
    method_name: method,
    args_base64: encodeArgs(args),
  });

  return JSON.parse(Buffer.from(result.result).toString()) as T;
}

export async function viewProfile(account_id: string) {
  const response = await viewCall<Record<string, { profile: Profile }>>(
    SOCIAL_CONTRACT_ID,
    "get",
    {
      keys: [`${account_id}/profile/**`],
    },
  );

  if (account_id in response) {
    return profileSchema.parse({
      ...response[account_id]?.profile,
      account_id,
    });
  }

  return {
    account_id,
    name: "",
    image: { url: placeholderImage },
  } satisfies Profile;
}

export async function viewStorageBalance(account_id: string) {
  const response = await viewCall<{
    total: string;
    available: string;
  }>(SOCIAL_CONTRACT_ID, "storage_balance_of", {
    account_id,
  });

  return (
    response
      ? [BigInt(response.available), 0n, 0n]
      : [0n, INITIAL_ACCOUNT_STORAGE_BALANCE, MIN_STORAGE_BALANCE]
  ) as [bigint, bigint, bigint];
}

export async function viewUsers() {
  const response = await viewCall<string[]>(
    BLOCK_RAISE_CONTRACT_ID,
    "get_users",
    {},
  );

  return response;
}

export async function viewUserCampaigns(account_id: string) {
  const response = await viewCall<number[]>(
    BLOCK_RAISE_CONTRACT_ID,
    "get_campaigns",
    {
      account_id,
    },
  );

  return response;
}

export async function viewCampaigns() {
  const users = await viewUsers();

  const campaigns = await Promise.all(
    users.map((user) =>
      viewUserCampaigns(user).then((campaigns) =>
        campaigns.map((campaign) => [user, campaign] as const),
      ),
    ),
  );

  return campaigns.flat(1);
}

export async function viewCampaignsWithDetails() {
  const campaigns = await viewCampaigns();

  return await Promise.all(
    campaigns.map(([user, campaign_number]) =>
      viewCampaign(user, campaign_number).then(
        (campaign) => [[user, campaign_number], campaign] as const,
      ),
    ),
  );
}

export enum CampaignStatus {
  Active = "Active",
  Completed = "Completed",
  Failed = "Failed",
  Inactive = "Inactive",
}

export enum CampaignCategory {
  Business = "Business",
  Charity = "Charity",
  Education = "Education",
  Medical = "Medical",
}

export interface Campaign {
  account_id: string;
  owner: string;
  name: string;
  description: string;
  contributors: Record<string, number>;
  goal: number;
  deadline: number;
  image: string;
  status: CampaignStatus;
  category: CampaignCategory;
}

export async function viewCampaign(
  owner_account_id: string,
  campaign_number: number,
) {
  const response = await viewCall<Campaign>(
    BLOCK_RAISE_CONTRACT_ID,
    "get_campaign",
    {
      owner_account_id,
      campaign_number,
    },
  );

  return campaignSchema.parse(response);
}
