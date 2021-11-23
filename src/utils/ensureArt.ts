import { Address, BigInt, BigDecimal, log, ethereum, json } from '@graphprotocol/graph-ts';

import { ADDRESS_ZERO, ZERO_BI, ZERO_BD, ONE_BI, TEN_BI, INI_SCORE, INI_ALLOWDELEGATES, CORE_ADDRESS, coreContract } from './constants';

import { Art } from '../../generated/schema';

export function ensureArt(event: ethereum.Event, tokenId: BigInt): Art {
	let id = tokenId.toString();
	let art = Art.load(id);
	if (art) {
		return art;
	}

	art = new Art(id);
	art.timestamp = event.block.timestamp;
	art.blockNumber = event.block.number;
	art.creator = ADDRESS_ZERO;
	art.owner = ADDRESS_ZERO;
	art.baseId = ZERO_BI;

	art.save();

	return art;
}
