import {
  ESTIMATED_KEY_VALUE_SIZE,
  ESTIMATED_NODE_SIZE,
  EXTRA_STORAGE_BALANCE,
  STORAGE_COST_PER_BYTE,
} from "./constants/tx";
import { viewProfile, viewStorageBalance } from "./fetch";

export async function calculateDeposit(
  account_id: string,
  changes: Record<string, unknown>,
): Promise<bigint> {
  const [
    currentProfile,
    [storageBalance, initialAccountStorageBalance, minStorageBalance],
  ] = await Promise.all([
    viewProfile(account_id),
    viewStorageBalance(account_id),
  ]);

  const dataCost =
    estimateDataCost(changes, currentProfile) * STORAGE_COST_PER_BYTE;
  let totalCost =
    dataCost + initialAccountStorageBalance + EXTRA_STORAGE_BALANCE;

  if (totalCost < 0n) {
    totalCost = 0n;
  }

  totalCost -= storageBalance;

  if (totalCost < 0n) {
    totalCost = 0n;
  }

  if (totalCost < minStorageBalance) {
    return minStorageBalance;
  }

  return totalCost;
}

function isPrimitive(
  value: unknown,
): value is string | number | bigint | symbol | boolean {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}

export function estimateDataCost(
  data: unknown,
  previousData?: unknown,
): bigint {
  if (!data) {
    return 0n;
  }

  if (isPrimitive(data)) {
    const stringData = data.toString();
    const minCost = Math.max(stringData.length, 8);

    if (isPrimitive(previousData)) {
      return BigInt(minCost - previousData.toString().length);
    }

    return BigInt(minCost);
  }

  if (typeof data !== "object") {
    return 0n;
  }

  const innerDataCost = Object.entries(data).reduce((acc, [key, value]) => {
    if (
      typeof previousData === "object" &&
      !!previousData &&
      key in previousData
    ) {
      return (
        acc +
        estimateDataCost(value, previousData[key as keyof typeof previousData])
      );
    }

    return (
      acc +
      BigInt(key.length * 2) +
      ESTIMATED_KEY_VALUE_SIZE +
      estimateDataCost(value)
    );
  }, 0n);

  if (typeof previousData === "object" && !!previousData) {
    return innerDataCost;
  }

  return innerDataCost + ESTIMATED_NODE_SIZE;
}
