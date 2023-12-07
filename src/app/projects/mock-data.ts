import { type Profile } from "~/lib/validation/common";

export const MOCK_PROJECTS: Profile[] = Array.from({ length: 4 }, () => ({
  account_id: "blockraise.near",
  name: "Blockraise",
  image: {
    url: "https://blockraise-petarvujovic-near.vercel.app/blockraise.png",
  },
  blockraise: {
    description: "Blockraise is a decentralized crowdfunding platform.",
    timeline: "2024",
    funding_goal: "10000000",
    current_funding: "5000000",
    team: {
      petar: {
        name: "Petar Vujovic",
        account_id: "petarvujovic.near",
        image: {
          url: "/petar.png",
        },
        background: "Horizon dev",
      },
      chetana: {
        name: "Chetana Desai",
        account_id: "chetana.near",
        image: {
          url: "/chetana.png",
        },
        background: "Pagoda PM",
      },
      pierre: {
        name: "Pierre Le Guen",
        account_id: "pierreleguen.near",
        image: {
          url: "/pierre.png",
        },
        background: "Finance dev",
      },
    },
  },
}));
