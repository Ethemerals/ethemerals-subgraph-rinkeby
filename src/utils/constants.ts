/* eslint-disable prefer-const */
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts';
import { Ethemerals } from '../../generated/Ethemerals/Ethemerals';
// import { EternalBattle } from '../../generated/EternalBattle/EternalBattle';
import { EthemeralLifeForce } from '../../generated/EthemeralLifeForce/EthemeralLifeForce';

// export let MIN_ID = BigInt.fromString('10');
// export let MAX_ID = BigInt.fromString('6909');
export let INI_SCORE = BigInt.fromString('300');
// export let INI_REWARDS = BigInt.fromString('1000000000000000000000');
export let INI_ALLOWDELEGATES = false;

export let ELF_ADDRESS = '0x22b56e6687e6b4ea8dd58b468ee3913cfa4185e3';
export let CORE_ADDRESS = '0xcdb47e685819638668ff736d1a2ae32b68e76ba5';
// export let ETERNALBATTLE_ADDRESS = '0x163cb1c87b75fd5b12f6a77bb955dc6cc69cf1d0';
export let PRICEFEED_ADDRESS = '0x1e704437f1323fda08358cedf5a3f9619fa11fc1';
export let EQUIPABLE_ADDRESS = '0xc2cd83998d5d76f64830fbd1df2e8b221c4f31a2';
// export let ETERNALBATTLE_ADDRESS = '0x163cb1c87b75fd5b12f6a77bb955dc6cc69cf1d0';
// export let PRICEFEED_ADDRESS = '0x1e704437f1323fda08358cedf5a3f9619fa11fc1';

export let elfContract = EthemeralLifeForce.bind(Address.fromString(ELF_ADDRESS));
export let coreContract = Ethemerals.bind(Address.fromString(CORE_ADDRESS));
// export let eternalBattleContract = EternalBattle.bind(Address.fromString(ETERNALBATTLE_ADDRESS));

export let ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let TEN_BI = BigInt.fromI32(10);
export let TENTHOUSAND_BI = BigInt.fromI32(10000);
export let ZERO_BD = BigDecimal.fromString('0');
export let ONE_BD = BigDecimal.fromString('1');
export let BI_18 = BigInt.fromI32(18);
