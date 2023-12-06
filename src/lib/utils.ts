import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ipfsURL(cid: string) {
  return `https://ipfs.near.social/ipfs/${cid}`;
}
