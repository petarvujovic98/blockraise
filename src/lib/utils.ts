import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fileUploadSchema } from "./validation/fetching";

const IPFS_URL = "https://ipfs.near.social";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ipfsURL(cid: string) {
  return `${IPFS_URL}/ipfs/${cid}`;
}

export async function generateImage(
  prompt = "Stock image for a anonymous founder in a startup in a blockchain ecosystem. In a cartoonish style - not realistic",
) {
  const response = await fetch("/images/generate", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
  return fileUploadSchema.parse(await response.json()).cid;
}

export async function uploadImage(file?: File) {
  if (!file) return;
  const response = await fetch(`${IPFS_URL}/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: file,
  });
  return fileUploadSchema.parse(await response.json()).cid;
}
