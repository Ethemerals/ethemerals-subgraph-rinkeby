import { Address, BigInt, BigDecimal, log, ethereum, json } from '@graphprotocol/graph-ts';
import { WildLand, WildStake, WildLCP, WildsScoreCard } from '../../generated/schema';
import { ZERO_BI } from './constants';

export function ensureWildLand(event: ethereum.Event, landId: string): WildLand {
	let id = landId;
	let land = WildLand.load(id);
	if (land) {
		return land;
	}

	land = new WildLand(id);
	land.timestamp = event.block.timestamp;
	land.raidStatus = ZERO_BI;
	land.save();

	return land;
}

export function ensureWildStake(tokenId: string): WildStake {
	let id = tokenId;
	let stake = WildStake.load(id);
	if (stake) {
		return stake;
	}

	stake = new WildStake(id);
	stake.active = true;
	stake.ethemeral = tokenId;

	return stake;
}

export function ensureWildLCP(landId: string, tokenId: string): WildLCP {
	let id = landId + '-' + tokenId;
	let lcp = WildLCP.load(id);
	if (lcp) {
		return lcp;
	}

	lcp = new WildLCP(id);
	lcp.points = ZERO_BI;
	lcp.land = landId;
	lcp.ethemeral = tokenId;

	return lcp;
}
