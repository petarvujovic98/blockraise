import { type Campaign } from "~/lib/validation/common";

export const MOCK_PROJECTS: Campaign[] = Array.from({ length: 4 }, () => ({
  account_id: "blockraise.near",
  owner: "petarvujovic.near",
  name: "Blockraise",
  image: "https://blockraise-petarvujovic-near.vercel.app/blockraise.png",
  description: "Blockraise is a decentralized crowdfunding platform.",
  deadline: Date.now() + 100000000,
  goal: 10000000,
  contributors: { sam: 300000 },
  status: "Active",
  category: "Charity",
  team: {
    petar: {
      name: "Petar Vujovic",
      account_id: "petarvujovic.near",
      image: "",
      background: "Horizon dev",
    },
    chetana: {
      name: "Chetana Desai",
      account_id: "chetana.near",
      image: "",
      background: "Pagoda PM",
    },
    pierre: {
      name: "Pierre Le Guen",
      account_id: "pierreleguen.near",
      image: "",
      background: "Finance dev",
    },
  },
}));
