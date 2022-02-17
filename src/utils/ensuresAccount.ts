import { Address, BigInt, BigDecimal, log, ethereum, json } from '@graphprotocol/graph-ts';

import { ADDRESS_ZERO, ZERO_BI, ZERO_BD, ONE_BI, TEN_BI, INI_SCORE, INI_ALLOWDELEGATES, CORE_ADDRESS, coreContract } from './constants';

import { getMintPrice, getMaxAvailableIndex, getEthemeralSupply } from './contractCallsCore';

import { AccountAction, Transaction, Account } from '../../generated/schema';

import { ensureTransaction } from './ensuresCommon';
import { transactionId } from './helpers';

export function ensureAccount(event: ethereum.Event, id: string): Account {
	let account = Account.load(id);
	if (account) {
		return account;
	}

	account = new Account(id);
	account.elfBalance = ZERO_BI;
	account.timestamp = event.block.timestamp;
	account.blockNumber = event.block.number;
	account.save();

	return account;
}

export function ensureAccountAction(event: ethereum.Event, accountId: string): AccountAction {
	let id = transactionId(event.transaction) + '/' + accountId;
	let action = AccountAction.load(id);
	if (action) {
		return action;
	}

	action = new AccountAction(id);
	action.account = accountId;
	action.timestamp = event.block.timestamp;
	action.transaction = ensureTransaction(event).id;
	action.type = 'Default';
	action.save();

	return action;
}
