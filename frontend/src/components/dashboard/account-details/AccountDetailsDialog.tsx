import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";

import { normalizeStructTag } from "@mysten/sui.js/utils";
import BigNumber from "bignumber.js";
import { cloneDeep } from "lodash";
import { FileClock, RotateCw, TrendingUp } from "lucide-react";

import { WAD } from "@suilend/sdk/constants";
import {
  ApiBorrowEvent,
  ApiClaimRewardEvent,
  ApiDepositEvent,
  ApiLiquidateEvent,
  ApiObligationDataEvent,
  ApiRepayEvent,
  ApiReserveAssetDataEvent,
  ApiWithdrawEvent,
} from "@suilend/sdk/types";

import SubaccountDropdownMenu from "@/components/dashboard/account/SubaccountDropdownMenu";
import EarningsTabContent from "@/components/dashboard/account-details/EarningsTabContent";
import HistoryTabContent from "@/components/dashboard/account-details/HistoryTabContent";
import Dialog from "@/components/dashboard/Dialog";
import Button from "@/components/shared/Button";
import Tabs from "@/components/shared/Tabs";
import TokenLogo from "@/components/shared/TokenLogo";
import Tooltip from "@/components/shared/Tooltip";
import { TBody } from "@/components/shared/Typography";
import { AppData, useAppContext } from "@/contexts/AppContext";
import { isSuilendPoints } from "@/lib/coinType";
import { EventType, eventSortAsc } from "@/lib/events";
import { formatPoints, formatToken } from "@/lib/format";
import { API_URL } from "@/lib/navigation";
import { shallowPushQuery, shallowReplaceQuery } from "@/lib/router";

const QUERY_PARAMS_PREFIX = "accountDetails";
export enum QueryParams {
  ACCOUNT_DETAILS = QUERY_PARAMS_PREFIX,
  TAB = `${QUERY_PARAMS_PREFIX}-tab`,
}

export enum Tab {
  EARNINGS = "earnings",
  HISTORY = "history",
}

export const getCtokenExchangeRate = (event: ApiReserveAssetDataEvent) =>
  new BigNumber(event.ctokenSupply).eq(0)
    ? new BigNumber(1)
    : new BigNumber(event.supplyAmount).div(WAD).div(event.ctokenSupply);

export type EventsData = {
  reserveAssetData: ApiReserveAssetDataEvent[];
  deposit: ApiDepositEvent[];
  borrow: ApiBorrowEvent[];
  withdraw: ApiWithdrawEvent[];
  repay: ApiRepayEvent[];
  liquidate: ApiLiquidateEvent[];
  claimReward: ApiClaimRewardEvent[];
  obligationData: ApiObligationDataEvent[];
};

interface TokenAmountProps {
  amount?: BigNumber;
  coinType: string;
  symbol: string;
  src?: string | null;
  decimals: number;
}

export function TokenAmount({
  amount,
  coinType,
  symbol,
  src,
  decimals,
}: TokenAmountProps) {
  return (
    <div className="flex w-max flex-row items-center gap-2">
      <TokenLogo
        className="h-4 w-4"
        coinType={coinType}
        symbol={symbol}
        src={src}
      />

      <Tooltip
        title={
          amount !== undefined && isSuilendPoints(coinType) ? (
            <>
              {formatPoints(amount, { dp: decimals })} {symbol}
            </>
          ) : undefined
        }
      >
        <TBody className="uppercase">
          {amount === undefined
            ? "N/A"
            : isSuilendPoints(coinType)
              ? formatPoints(amount)
              : formatToken(amount, { dp: decimals })}{" "}
          {symbol}
        </TBody>
      </Tooltip>
    </div>
  );
}

export default function AccountDetailsDialog() {
  const router = useRouter();
  const queryParams = {
    [QueryParams.ACCOUNT_DETAILS]: router.query[QueryParams.ACCOUNT_DETAILS] as
      | string
      | undefined,
    [QueryParams.TAB]: router.query[QueryParams.TAB] as Tab | undefined,
  };

  const { refreshData, obligation, ...restAppContext } = useAppContext();
  const data = restAppContext.data as AppData;

  // Tabs
  const tabs = [
    { id: Tab.EARNINGS, icon: <TrendingUp />, title: "Earnings" },
    { id: Tab.HISTORY, icon: <FileClock />, title: "History" },
  ];

  const selectedTab =
    queryParams[QueryParams.TAB] &&
    Object.values(Tab).includes(queryParams[QueryParams.TAB])
      ? queryParams[QueryParams.TAB]
      : Object.values(Tab)[0];
  const onSelectedTabChange = (tab: Tab) => {
    shallowPushQuery(router, { ...router.query, [QueryParams.TAB]: tab });
  };

  // Events
  const [eventsData, setEventsData] = useState<EventsData | undefined>(
    undefined,
  );

  const clearEventsData = useCallback(() => {
    setEventsData(undefined);
  }, []);

  const fetchEventsData = useCallback(
    async (obligationId: string) => {
      clearEventsData();

      try {
        const url1 = `${API_URL}/events?${new URLSearchParams({
          eventTypes: [
            EventType.DEPOSIT,
            EventType.BORROW,
            EventType.WITHDRAW,
            EventType.REPAY,
            EventType.LIQUIDATE,
          ].join(","),
          obligationId,
          joinEventTypes: EventType.RESERVE_ASSET_DATA,
        })}`;
        const res1 = await fetch(url1);
        const json1 = await res1.json();

        const url2 = `${API_URL}/events?${new URLSearchParams({
          eventTypes: EventType.CLAIM_REWARD,
          obligationId,
        })}`;
        const res2 = await fetch(url2);
        const json2 = await res2.json();

        const url3 = `${API_URL}/events?${new URLSearchParams({
          eventTypes: EventType.OBLIGATION_DATA,
          obligationId,
        })}`;
        const res3 = await fetch(url3);
        const json3 = await res3.json();

        // Parse
        const data = { ...json1, ...json2, ...json3 } as EventsData;
        for (const event of [
          ...data.reserveAssetData,
          ...data.deposit,
          ...data.borrow,
          ...data.withdraw,
          ...data.repay,
          ...data.claimReward,
        ]) {
          event.coinType = normalizeStructTag(event.coinType);
        }

        setEventsData({
          reserveAssetData: (data.reserveAssetData ?? [])
            .slice()
            .sort(eventSortAsc),
          deposit: (data.deposit ?? []).slice().sort(eventSortAsc),
          borrow: (data.borrow ?? []).slice().sort(eventSortAsc),
          withdraw: (data.withdraw ?? []).slice().sort(eventSortAsc),
          repay: (data.repay ?? []).slice().sort(eventSortAsc),
          liquidate: (data.liquidate ?? []).slice().sort(eventSortAsc),
          claimReward: (data.claimReward ?? []).slice().sort(eventSortAsc),
          obligationData: (data.obligationData ?? [])
            .slice()
            .sort(eventSortAsc),
        });
      } catch (err) {
        console.error(err);
      }
    },
    [clearEventsData],
  );

  // Refresh
  const getNowS = () => Math.floor(new Date().getTime() / 1000);
  const [nowS, setNowS] = useState<number>(getNowS);

  const refresh = () => {
    if (!obligation?.id) return;

    if (selectedTab === Tab.EARNINGS) refreshData();
    fetchEventsData(obligation.id);
    setNowS(getNowS());
  };

  // State
  const isOpen = queryParams[QueryParams.ACCOUNT_DETAILS] !== undefined;
  const fetchedDataObligationIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!obligation?.id) return;

    if (isOpen) {
      if (fetchedDataObligationIdRef.current === obligation.id) return;

      fetchEventsData(obligation.id);
      fetchedDataObligationIdRef.current = obligation.id;
    }
  }, [obligation?.id, isOpen, fetchEventsData]);

  const onOpenChange = (_isOpen: boolean) => {
    if (_isOpen) return;

    const restQuery = cloneDeep(router.query);
    delete restQuery[QueryParams.ACCOUNT_DETAILS];
    shallowPushQuery(router, restQuery);

    setTimeout(() => {
      const restQuery2 = cloneDeep(restQuery);
      delete restQuery2[QueryParams.TAB];
      shallowReplaceQuery(router, restQuery2);

      clearEventsData();
      fetchedDataObligationIdRef.current = undefined;
    }, 250);
  };

  if (!obligation) return null;
  return (
    <Dialog
      rootProps={{ open: isOpen, onOpenChange }}
      contentProps={{ className: "max-w-6xl" }}
      headerClassName="border-b-0"
      title="Account"
      headerEndContent={
        <>
          {data.obligations && data.obligations.length > 1 && (
            <SubaccountDropdownMenu />
          )}

          <Button
            className="text-muted-foreground"
            icon={<RotateCw />}
            variant="ghost"
            size="icon"
            onClick={refresh}
          >
            Refresh
          </Button>
        </>
      }
    >
      <div className="px-4">
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => onSelectedTabChange(tab as Tab)}
          listClassName="mb-0"
        />
      </div>

      {selectedTab === Tab.EARNINGS && (
        <EarningsTabContent eventsData={eventsData} nowS={nowS} />
      )}
      {selectedTab === Tab.HISTORY && (
        <HistoryTabContent eventsData={eventsData} />
      )}
    </Dialog>
  );
}
