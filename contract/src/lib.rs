use std::collections::HashMap;
use std::str::FromStr;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::env;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::store::UnorderedMap;
use near_sdk::{assert_one_yocto, near_bindgen, require, AccountId};

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, PartialEq, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum CampaignStatus {
    Active,
    Inactive,
    Completed,
    Failed,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum CampaignCategory {
    Business,
    Charity,
    Education,
    Medical,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Campaign {
    account_id: AccountId,
    owner: AccountId,
    name: String,
    description: String,
    contributors: HashMap<AccountId, u128>,
    goal: u128,
    deadline: u64,
    image: String,
    status: CampaignStatus,
    category: CampaignCategory,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct CreateCampaign {
    name: String,
    description: String,
    goal: u128,
    deadline: u64,
    image: String,
    category: CampaignCategory,
}

impl From<CreateCampaign> for Campaign {
    fn from(campaign: CreateCampaign) -> Self {
        Self {
            account_id: env::current_account_id(),
            owner: env::signer_account_id(),
            name: campaign.name,
            description: campaign.description,
            contributors: HashMap::new(),
            goal: campaign.goal,
            deadline: campaign.deadline,
            image: campaign.image,
            status: CampaignStatus::Inactive,
            category: campaign.category,
        }
    }
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    campaigns: UnorderedMap<AccountId, UnorderedMap<AccountId, Campaign>>,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            campaigns: UnorderedMap::new(b"c".to_vec()),
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn get_users(&self) -> Vec<AccountId> {
        self.campaigns.keys().cloned().collect()
    }

    #[payable]
    pub fn register(&mut self) {
        assert_one_yocto();
        let account_id = env::signer_account_id();
        require!(
            !self.campaigns.contains_key(&account_id),
            "ERR_ALREADY_REGISTERED"
        );
        self.campaigns
            .insert(account_id.clone(), UnorderedMap::new(account_id.as_bytes()));
    }

    fn assert_registered(&self, account_id: &AccountId) {
        require!(
            self.campaigns.contains_key(account_id),
            "ERR_NOT_REGISTERED"
        );
    }

    fn create_campaign_account(signer_account_id: AccountId, campaign_number: u32) -> AccountId {
        let account_id = env::current_account_id();
        let signer_account_id = signer_account_id.to_string().replace(".", "");
        AccountId::from_str(&format!(
            "{campaign_number}-{signer_account_id}.{account_id}"
        ))
        .expect("ERR_INVALID_ACCOUNT_ID")
    }

    pub fn create_campaign(&mut self, campaign: CreateCampaign) {
        let account_id = env::signer_account_id();
        self.assert_registered(&account_id);
        let campaigns = self.campaigns.get_mut(&account_id).unwrap();
        let campaign_account_id =
            Contract::create_campaign_account(account_id, campaigns.len() as u32 + 1);
        require!(
            !campaigns.contains_key(&campaign_account_id),
            "ERR_ALREADY_REGISTERED"
        );
        campaigns.insert(campaign_account_id, campaign.into());
    }

    pub fn get_campaigns(&self, account_id: AccountId) -> Vec<AccountId> {
        let campaigns = self.campaigns.get(&account_id).unwrap();
        campaigns.keys().cloned().collect()
    }

    pub fn get_campaign(&self, owner_account_id: AccountId, campaign_number: u32) -> Campaign {
        let campaigns = self
            .campaigns
            .get(&owner_account_id)
            .expect("ERR_OWNER_NOT_FOUND");
        let campaign_account_id =
            Contract::create_campaign_account(owner_account_id, campaign_number);
        campaigns
            .get(&campaign_account_id)
            .expect("ERR_CAMPAIGN_NOT_FOUND")
            .clone()
    }

    #[payable]
    pub fn fail_campaign(&mut self, campaign_number: u32) {
        assert_one_yocto();
        let account_id = env::signer_account_id();
        self.assert_registered(&account_id);
        let campaigns = self.campaigns.get_mut(&account_id).unwrap();
        let campaign_account_id = Contract::create_campaign_account(account_id, campaign_number);
        require!(
            campaigns.contains_key(&campaign_account_id),
            "ERR_CAMPAIGN_NOT_FOUND"
        );
        let campaign = campaigns.get_mut(&campaign_account_id).unwrap();
        require!(
            campaign.status == CampaignStatus::Active,
            "ERR_CAMPAIGN_NOT_ACTIVE"
        );
        require!(
            env::block_timestamp_ms() > campaign.deadline,
            "ERR_CAMPAIGN_NOT_EXPIRED"
        );
        campaign.status = CampaignStatus::Failed;
    }

    #[payable]
    pub fn complete_campaign(&mut self, campaign_number: u32) {
        assert_one_yocto();
        let account_id = env::signer_account_id();
        self.assert_registered(&account_id);
        let campaigns = self.campaigns.get_mut(&account_id).unwrap();
        let campaign_account_id = Contract::create_campaign_account(account_id, campaign_number);
        require!(
            campaigns.contains_key(&campaign_account_id),
            "ERR_CAMPAIGN_NOT_FOUND"
        );
        let campaign = campaigns.get_mut(&campaign_account_id).unwrap();
        require!(
            campaign.status == CampaignStatus::Active,
            "ERR_CAMPAIGN_NOT_ACTIVE"
        );
        require!(
            campaign.contributors.values().sum::<u128>() >= campaign.goal,
            "ERR_CAMPAIGN_GOAL_NOT_MET"
        );
        campaign.status = CampaignStatus::Completed;
    }

    #[payable]
    pub fn activate_campaign(&mut self, campaign_number: u32) {
        assert_one_yocto();
        let account_id = env::signer_account_id();
        self.assert_registered(&account_id);
        let campaigns = self.campaigns.get_mut(&account_id).unwrap();
        let campaign_account_id = Contract::create_campaign_account(account_id, campaign_number);
        require!(
            campaigns.contains_key(&campaign_account_id),
            "ERR_CAMPAIGN_NOT_FOUND"
        );
        let campaign = campaigns.get_mut(&campaign_account_id).unwrap();
        require!(
            campaign.status == CampaignStatus::Inactive,
            "ERR_CAMPAIGN_NOT_INACTIVE"
        );
        campaign.status = CampaignStatus::Active;
    }

    #[payable]
    pub fn deactivate_campaign(&mut self, campaign_number: u32) {
        assert_one_yocto();
        let account_id = env::signer_account_id();
        self.assert_registered(&account_id);
        let campaigns = self.campaigns.get_mut(&account_id).unwrap();
        let campaign_account_id = Contract::create_campaign_account(account_id, campaign_number);
        require!(
            campaigns.contains_key(&campaign_account_id),
            "ERR_CAMPAIGN_NOT_FOUND"
        );
        let campaign = campaigns.get_mut(&campaign_account_id).unwrap();
        require!(
            campaign.status == CampaignStatus::Active,
            "ERR_CAMPAIGN_NOT_ACTIVE"
        );
        campaign.status = CampaignStatus::Inactive;
    }

    #[payable]
    pub fn contribute(&mut self, owner_account_id: AccountId, campaign_number: u32, amount: u128) {
        assert_one_yocto();
        let signer_account_id = env::signer_account_id();
        self.assert_registered(&signer_account_id);
        let campaigns = self
            .campaigns
            .get_mut(&owner_account_id)
            .expect("ERR_OWNER_NOT_FOUND");
        let campaign_account_id =
            Contract::create_campaign_account(owner_account_id, campaign_number);
        require!(
            campaigns.contains_key(&campaign_account_id),
            "ERR_CAMPAIGN_NOT_FOUND"
        );
        let campaign = campaigns.get_mut(&campaign_account_id).unwrap();
        require!(
            campaign.status == CampaignStatus::Active,
            "ERR_CAMPAIGN_NOT_ACTIVE"
        );
        campaign
            .contributors
            .entry(signer_account_id)
            .and_modify(|e| *e += amount)
            .or_insert(amount);
    }
}
