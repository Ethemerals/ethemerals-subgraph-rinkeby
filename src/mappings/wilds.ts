import { BigInt } from '@graphprotocol/graph-ts';
import { Wilds, DeathKissed, LCPChange, LandChange, RaidAction, RaidStatusChange, Staked, Swapped, Unstaked } from '../../generated/Wilds/Wilds';
import { ensureDelegate, ensureDelegateAction, ensureAccount, ensureAccountAction, ensureCore, ensureCoreAction } from '../utils/ensuresCore';
import { ensureEthemeral, ensureEthemeralAction, ensureMetadata, ensureScorecard, ensureWildsScoreCard } from '../utils/ensuresMerals';

import { bonusStats } from '../metadata/meralBonusStats';

import { getMintPrice, getMaxAvailableIndex, getEthemeralSupply } from '../utils/contractCallsCore';
import { ADDRESS_ZERO, ZERO_BI, ZERO_BD, ONE_BI, TEN_BI, INI_SCORE, CORE_ADDRESS, coreContract } from '../utils/constants';
import { Approval, ApprovalForAll, OwnershipTransferred, DelegateChange, PriceChange, AllowDelegatesChange, Transfer, Mint, ChangeRewards, ChangeScore } from '../../generated/Ethemerals/Ethemerals';

import { WildLand, WildStake, WildLCP } from '../../generated/schema';
import { ensureWildLand, ensureWildLCP, ensureWildStake } from '../utils/ensuresWilds';

export function handleDeathKissed(event: DeathKissed): void {
	let wildsCardRevived = ensureWildsScoreCard(event.params.tokenId.toString());
	let wildsCardReviver = ensureWildsScoreCard(event.params.deathId.toString());

	wildsCardRevived.revived = wildsCardRevived.revived.plus(ONE_BI);
	wildsCardReviver.reviver = wildsCardReviver.reviver.plus(ONE_BI);

	wildsCardRevived.save();
	wildsCardReviver.save();

	// The following functions can then be called on this contract to access
	// state variables and other data:
	//
	// - contract.actions(...)
	// - contract.admin(...)
	// - contract.adminActions(...)
	// - contract.calculateChange(...)
	// - contract.calculateDamage(...)
	// - contract.calculateDarkMagicDamage(...)
	// - contract.calculateDefendedDamage(...)
	// - contract.calculateLightMagicDamage(...)
	// - contract.calculateSpdDamage(...)
	// - contract.calculateStamina(...)
	// - contract.getLCP(...)
	// - contract.getSlots(...)
	// - contract.getStake(...)
	// - contract.getStakeEvent(...)
	// - contract.landPlots(...)
	// - contract.onERC721Received(...)
	// - contract.paused(...)
	// - contract.safeScale(...)
	// - contract.stakeEvents(...)
	// - contract.stakes(...)
	// - contract.staking(...)
	// - contract.staminaCosts(...)
}

export function handleLandChange(event: LandChange): void {
	let land = ensureWildLand(event, event.params.id.toString());

	land.lastEvent = event.params.timestamp;
	land.baseDefence = BigInt.fromI32(event.params.baseDefence);

	land.save();
}

export function handleRaidAction(event: RaidAction): void {}

export function handleRaidStatusChange(event: RaidStatusChange): void {
	let land = ensureWildLand(event, event.params.id.toString());

	land.raidStatus = BigInt.fromI32(event.params.RaidStatus);

	land.save();
}

export function handleStaked(event: Staked): void {
	let stake = ensureWildStake(event.params.tokenId.toString());
	let wildsCard = ensureWildsScoreCard(event.params.tokenId.toString());

	stake.active = true;
	stake.land = event.params.landId.toString();
	stake.stakeType = BigInt.fromI32(event.params.stakeAction);
	stake.startedAt = event.block.timestamp;
	stake.lastActionAt = event.block.timestamp;
	stake.damage = ZERO_BI;
	stake.health = ZERO_BI;

	if (event.params.stakeAction == 1) {
		wildsCard.defend = wildsCard.defend.plus(ONE_BI);
	}
	if (event.params.stakeAction == 2) {
		wildsCard.loot = wildsCard.loot.plus(ONE_BI);
	}
	if (event.params.stakeAction == 3) {
		wildsCard.birth = wildsCard.birth.plus(ONE_BI);
	}
	if (event.params.stakeAction == 4) {
		wildsCard.attack = wildsCard.attack.plus(ONE_BI);
	}

	stake.save();
	wildsCard.save();
}

export function handleSwapped(event: Swapped): void {
	let unStaked = ensureWildStake(event.params.tokenId.toString());
	let staked = ensureWildStake(event.params.swapperId.toString());
	let wildsCard = ensureWildsScoreCard(event.params.swapperId.toString());

	unStaked.active = false;

	staked.active = true;
	staked.land = unStaked.land;
	staked.stakeType = ONE_BI;
	staked.startedAt = event.block.timestamp;
	staked.lastActionAt = event.block.timestamp;
	staked.damage = ZERO_BI;
	staked.health = ZERO_BI;

	wildsCard.defend = wildsCard.defend.plus(ONE_BI);

	unStaked.save();
	staked.save();
	wildsCard.save();
}

export function handleUnstaked(event: Unstaked): void {
	let stake = ensureWildStake(event.params.tokenId.toString());
	stake.active = false;
	stake.save();
}

export function handleLCPChange(event: LCPChange): void {
	let LCP = ensureWildLCP(event.params.landId.toString(), event.params.tokenId.toString());
	LCP.points = LCP.points.plus(event.params.change);
	LCP.save();
}
