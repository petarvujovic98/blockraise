import {
  setupWalletSelector,
  type WalletSelector,
} from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

export const setupSelector = () => {
  return setupWalletSelector({
    network: "mainnet",
    modules: [setupMyNearWallet()],
  });
};

export const setupModalSelector = (selector: WalletSelector) => {
  return setupModal(selector, { contractId: "social.near" });
};