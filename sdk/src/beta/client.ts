import { SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";

import { SuilendClient as BaseSuilendClient } from "../core/client";

import { phantom } from "./_generated/_framework/reified";
import { PACKAGE_ID, PUBLISHED_AT } from "./_generated/suilend";
import {
  addPoolReward,
  addReserve,
  borrow,
  cancelPoolReward,
  claimRewards,
  claimRewardsAndDeposit,
  closePoolReward,
  depositCtokensIntoObligation,
  depositLiquidityAndMintCtokens,
  liquidate,
  migrate,
  refreshReservePrice,
  repay,
  updateRateLimiterConfig as updateRateLimiterConfigFunction,
  updateReserveConfig as updateReserveConfigFunction,
  withdrawCtokens,
} from "./_generated/suilend/lending-market/functions";
import {
  LendingMarket,
  ObligationOwnerCap,
} from "./_generated/suilend/lending-market/structs";
import { createLendingMarket } from "./_generated/suilend/lending-market-registry/functions";
import { Obligation } from "./_generated/suilend/obligation/structs";
import { newConfig as createRateLimiterConfig } from "./_generated/suilend/rate-limiter/functions";
import { createReserveConfig } from "./_generated/suilend/reserve-config/functions";

export const LENDING_MARKET_ID =
  "0x354a8d00fe7e9f46f60d79a6ecd9adf2bbf6d648f6e5855e172ac9601fc1bbcb";
export const LENDING_MARKET_TYPE = "0x2::sui::SUI";

const deps = {
  phantom,
  PACKAGE_ID,
  PUBLISHED_AT,
  LendingMarket,
  Obligation,
  ObligationOwnerCap,
  createLendingMarket,
  createReserveConfig,
  updateReserveConfig: updateReserveConfigFunction,
  addReserve,
  addPoolReward,
  cancelPoolReward,
  closePoolReward,
  claimRewards,
  claimRewardsAndDeposit,
  createRateLimiterConfig,
  updateRateLimiterConfig: updateRateLimiterConfigFunction,
  refreshReservePrice,
  depositLiquidityAndMintCtokens,
  depositCtokensIntoObligation,
  withdrawCtokens,
  borrow,
  repay,
  liquidate,
  migrate,
};

export class SuilendClient<T extends string> extends BaseSuilendClient {
  constructor(lendingMarket: LendingMarket<T>, client: SuiClient) {
    super(lendingMarket, client, deps);
  }

  static async initialize(
    lendingMarketId: string,
    lendingMarketType: string,
    client: SuiClient,
  ) {
    return super.initialize(lendingMarketId, lendingMarketType, client, deps);
  }

  static async initializeWithLendingMarket(
    lendingMarket: LendingMarket<string>,
    client: SuiClient,
  ) {
    return super.initializeWithLendingMarket(lendingMarket, client, deps);
  }

  static async createNewLendingMarket(
    registryId: string,
    lendingMarketType: string,
    txb: TransactionBlock,
  ) {
    return super.createNewLendingMarket(registryId, lendingMarketType, txb, {
      LendingMarket,
      createLendingMarket,
    });
  }

  static async getObligationOwnerCaps(
    ownerId: string,
    lendingMarketTypeArgs: string[],
    client: SuiClient,
  ) {
    return super.getObligationOwnerCaps(
      ownerId,
      lendingMarketTypeArgs,
      client,
      { phantom, PACKAGE_ID, ObligationOwnerCap },
    );
  }

  static async getObligation(
    obligationId: string,
    lendingMarketTypeArgs: string[],
    client: SuiClient,
  ) {
    return super.getObligation(obligationId, lendingMarketTypeArgs, client, {
      phantom,
      Obligation,
    });
  }

  static async getLendingMarketOwnerCapId(
    ownerId: string,
    lendingMarketTypeArgs: string[],
    client: SuiClient,
  ) {
    return super.getLendingMarketOwnerCapId(
      ownerId,
      lendingMarketTypeArgs,
      client,
      { PACKAGE_ID },
    );
  }
}
