/* eslint-disable prefer-const */
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts';
import { Ethemerals } from '../../generated/Ethemerals/Ethemerals';

export let INI_SCORE = BigInt.fromString('300');

export let ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let TEN_BI = BigInt.fromI32(10);
export let TENTHOUSAND_BI = BigInt.fromI32(10000);
export let ZERO_BD = BigDecimal.fromString('0');
export let ONE_BD = BigDecimal.fromString('1');
export let BI_18 = BigInt.fromI32(18);

export let CORE_ADDRESS = '0xcdb47e685819638668ff736d1a2ae32b68e76ba5';
export let ETERNALBATTLE_ADDRESS = '0x883170aaceb39a23642f5aaaab083f5684d3ffb1';
export let BURN_ADDRESS = '0x3b3d085078e3daead342a89bb2a3c2b45bc18828';
export let coreContract = Ethemerals.bind(Address.fromString(CORE_ADDRESS));
