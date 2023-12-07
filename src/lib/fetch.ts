import { providers } from "near-api-js";
import { type CodeResult } from "near-api-js/lib/providers/provider";
import {
  placeholderImage,
  type Profile,
  profileSchema,
} from "./validation/common";
import {
  INITIAL_ACCOUNT_STORAGE_BALANCE,
  MIN_STORAGE_BALANCE,
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
    "social.near",
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
    blockraise: {
      description: "",
      funding_goal: "",
      current_funding: "",
      timeline: "",
      team: {},
    },
  } satisfies Profile;
}

export async function viewStorageBalance(account_id: string) {
  const response = await viewCall<{
    total: string;
    available: string;
  }>("social.near", "storage_balance_of", {
    account_id,
  });

  return (
    response
      ? [BigInt(response.available), 0n, 0n]
      : [0n, INITIAL_ACCOUNT_STORAGE_BALANCE, MIN_STORAGE_BALANCE]
  ) as [bigint, bigint, bigint];
}

export async function viewCampaigns() {
  const response = await viewCall<{
    "nearhorizon.near": {
      profile: { blockraise: { campaigns: Record<string, boolean> } };
    };
  }>("social.near", "keys", {
    keys: [`nearhorizon.near/profile/blockraise/campaigns/*`],
  });

  return Object.keys(response["nearhorizon.near"].profile.blockraise.campaigns);
}
