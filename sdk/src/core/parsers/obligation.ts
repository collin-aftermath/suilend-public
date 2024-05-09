import { normalizeStructTag } from "@mysten/sui.js/utils";
import BigNumber from "bignumber.js";

import { WAD } from "../constants";

import { Deps } from "./deps";
import { ParsedReserve } from "./reserve";

export type ParsedObligation = ReturnType<typeof parseObligation>;
export type ParsedPosition =
  | ParsedObligation["deposits"][0]
  | ParsedObligation["borrows"][0];

export const parseObligation = (
  { Obligation }: Pick<Deps, "Obligation">,
  obligation: typeof Obligation,
  parsedReserveMap: { [coinType: string]: ParsedReserve },
) => {
  let totalDepositedAmountUsd = new BigNumber(0);
  let totalBorrowedAmountUsd = new BigNumber(0);

  let weightedBorrowsUsd = new BigNumber(0);
  let maxPriceWeightedBorrowsUsd = new BigNumber(0);
  let borrowLimitUsd = new BigNumber(0);
  let minPriceBorrowLimitUsd = new BigNumber(0);
  let unhealthyBorrowValueUsd = new BigNumber(0);

  let positionCount = 0;

  const deposits = (obligation.deposits as any[]).map((deposit) => {
    const coinType = normalizeStructTag(deposit.coinType.name);
    const reserve = parsedReserveMap[coinType];
    if (!reserve)
      throw new Error(
        `Reserve with coinType ${deposit.coinType.name} not found`,
      );

    positionCount++;

    const depositedCtokenAmount = new BigNumber(
      deposit.depositedCtokenAmount.toString(),
    ).div(10 ** reserve.mintDecimals);
    const depositedAmount = depositedCtokenAmount.times(
      reserve.cTokenExchangeRate,
    );
    const depositedAmountUsd = depositedAmount.times(reserve.price);

    totalDepositedAmountUsd = totalDepositedAmountUsd.plus(depositedAmountUsd);

    borrowLimitUsd = borrowLimitUsd.plus(
      depositedAmountUsd.times(reserve.config.openLtvPct / 100),
    );
    minPriceBorrowLimitUsd = minPriceBorrowLimitUsd.plus(
      depositedAmount
        .times(reserve.minPrice)
        .times(reserve.config.openLtvPct / 100),
    );
    unhealthyBorrowValueUsd = unhealthyBorrowValueUsd.plus(
      depositedAmountUsd.times(reserve.config.closeLtvPct / 100),
    );

    const reserveArrayIndex = deposit.reserveArrayIndex;
    const userRewardManagerIndex = Number(
      deposit.userRewardManagerIndex.toString(),
    );
    const userRewardManager =
      obligation.userRewardManagers[userRewardManagerIndex];

    return {
      coinType,
      reserveArrayIndex,
      userRewardManagerIndex,
      userRewardManager,
      depositedAmount,
      depositedAmountUsd,
      reserve,
      original: obligation,
    };
  });

  const borrows = (obligation.borrows as any[]).map((borrow) => {
    const coinType = normalizeStructTag(borrow.coinType.name);
    const reserve = parsedReserveMap[coinType];
    if (!reserve)
      throw new Error(
        `Reserve with coinType ${borrow.coinType.name} not found`,
      );

    positionCount++;

    const cumulativeBorrowRate = new BigNumber(
      borrow.cumulativeBorrowRate.value.toString(),
    ).div(WAD.toString());
    const borrowedAmountInitial = new BigNumber(
      borrow.borrowedAmount.value.toString(),
    )
      .div(WAD.toString())
      .div(10 ** reserve.mintDecimals);
    const borrowInterestIndex =
      reserve.cumulativeBorrowRate.div(cumulativeBorrowRate);

    const borrowedAmount = borrowedAmountInitial.times(borrowInterestIndex);
    const borrowedAmountUsd = borrowedAmount.times(reserve.price);
    const borrowWeight = reserve.config.borrowWeightBps / 10000;

    totalBorrowedAmountUsd = totalBorrowedAmountUsd.plus(borrowedAmountUsd);

    weightedBorrowsUsd = weightedBorrowsUsd.plus(
      borrowedAmountUsd.times(borrowWeight),
    );
    maxPriceWeightedBorrowsUsd = maxPriceWeightedBorrowsUsd.plus(
      borrowedAmount.times(reserve.maxPrice).times(borrowWeight),
    );

    const reserveArrayIndex = borrow.reserveArrayIndex;
    const userRewardManagerIndex = Number(
      borrow.userRewardManagerIndex.toString(),
    );
    const userRewardManager =
      obligation.userRewardManagers[userRewardManagerIndex];

    return {
      coinType,
      reserveArrayIndex,
      userRewardManagerIndex,
      userRewardManager,
      borrowedAmount,
      borrowedAmountUsd,
      reserve,
      original: obligation,
    };
  });

  const netValueUsd = totalDepositedAmountUsd.minus(totalBorrowedAmountUsd);

  const weightedConservativeBorrowUtilizationPercent =
    minPriceBorrowLimitUsd.isZero()
      ? new BigNumber(0)
      : maxPriceWeightedBorrowsUsd.div(minPriceBorrowLimitUsd).times(100);

  return {
    id: obligation.id,
    depositedAmountUsd: totalDepositedAmountUsd,
    borrowedAmountUsd: totalBorrowedAmountUsd,
    netValueUsd,
    weightedBorrowsUsd,
    maxPriceWeightedBorrowsUsd,
    borrowLimitUsd,
    minPriceBorrowLimitUsd,
    unhealthyBorrowValueUsd,

    positionCount,
    deposits,
    borrows,
    weightedConservativeBorrowUtilizationPercent,
    original: obligation,

    // Deprecated
    /**
     * @deprecated since version 1.0.3. Use `depositedAmountUsd` instead.
     */
    totalSupplyUsd: totalDepositedAmountUsd,
    /**
     * @deprecated since version 1.0.3. Use `borrowedAmountUsd` instead.
     */
    totalBorrowUsd: totalBorrowedAmountUsd,
    /**
     * @deprecated since version 1.0.3. Use `weightedBorrowsUsd` instead.
     */
    totalWeightedBorrowUsd: weightedBorrowsUsd,
    /**
     * @deprecated since version 1.0.3. Use `maxPriceWeightedBorrowsUsd` instead.
     */
    maxPriceTotalWeightedBorrowUsd: maxPriceWeightedBorrowsUsd,
    /**
     * @deprecated since version 1.0.3. Use `borrowLimitUsd` instead.
     */
    borrowLimit: borrowLimitUsd,
    /**
     * @deprecated since version 1.0.3. Use `minPriceBorrowLimitUsd` instead.
     */
    minPriceBorrowLimit: minPriceBorrowLimitUsd,
  };
};
