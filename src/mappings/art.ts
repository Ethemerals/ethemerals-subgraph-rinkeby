import { BigInt } from '@graphprotocol/graph-ts';
import { EthemeralArt, AllowDelegatesChange, Approval, ApprovalForAll, DelegateChange, OwnershipTransferred, Transfer } from '../../generated/EthemeralArt/EthemeralArt';
import { Art } from '../../generated/schema';
import { ensureAccount } from '../utils/ensuresCore';
import { ensureArt } from '../utils/ensureArt';
import { ensureTransaction } from '../utils/ensuresCommon';
import { addressId, transactionId } from '../utils/helpers';
import { ADDRESS_ZERO } from '../utils/constants';

export function handleAllowDelegatesChange(event: AllowDelegatesChange): void {}

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleDelegateChange(event: DelegateChange): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {
	// SKIP ZERO INDEX

	let token = ensureArt(event, event.params.tokenId);
	// TOKEN ACTIONS

	// NORMAL TRANSFER TO
	let accountTo = ensureAccount(event, addressId(event.params.to));

	// NORMAL TRANSFER FROM
	let accountFrom = ensureAccount(event, addressId(event.params.from));

	// MINT
	if (accountFrom.id == ADDRESS_ZERO) {
		token.creator = accountTo.id;
		token.owner = accountTo.id;
	}

	accountTo.save();
	accountFrom.save();

	token.save();
}
