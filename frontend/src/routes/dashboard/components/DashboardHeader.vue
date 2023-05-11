<script setup lang="ts">
import { computed, inject } from 'vue'
import { TradeKey } from '@/composables/useTrade'
import { AssetKey } from '@/composables/useAsset'
import { SnapshotKey, SnapshotPrevDailyBarKey } from '@/composables/useSnapshot'
import numeral from 'numeral'
import { numberDiff } from '@/lib/numberDiff'

const trade = inject(TradeKey)
const asset = inject(AssetKey)
const snapshot = inject(SnapshotKey)
const prevDailyBar = inject(SnapshotPrevDailyBarKey)

interface PriceInfo {
  price: string
  previousClose: string
  changeAbs: string
  changePctAbs: string
  signSymbol: string
  isUp: boolean
  isDown: boolean
}

const priceInfo = computed<PriceInfo | undefined>(() => {
  if (snapshot?.value && prevDailyBar?.value && trade?.value?.p) {
    const diff = numberDiff(prevDailyBar.value.c, trade.value.p)

    return {
      price: numeral(trade?.value?.p).format('$0,0.00'),
      changeAbs: numeral(diff.changeAbs).format('0,0.00'),
      changePctAbs: numeral(diff.changePctAbs).format('0,0.00%'),
      previousClose: numeral(prevDailyBar.value.c).format('$0,0.00'),
      signSymbol: diff.signSymbol,
      isUp: diff.sign > 0,
      isDown: diff.sign < 0,
    }
  }

  return undefined
})
</script>

<template>
  <header v-if="trade && asset && snapshot" class="header">
    <div class="symbol">{{ asset?.symbol }}</div>
    <div class="price">{{ priceInfo?.price }}</div>
    <div class="price-change" :class="{ up: priceInfo?.isUp, down: priceInfo?.isDown }">
      <div class="change">{{ priceInfo?.signSymbol }} {{ priceInfo?.changeAbs }}</div>
      <div class="change-percent">({{ priceInfo?.changePctAbs }})</div>
      <div class="previous-close pl-2">
        Prev. close <span class="font-bold">{{ priceInfo?.previousClose }}</span>
      </div>
    </div>
    <div class="asset">
      <div class="name">{{ asset?.name }}</div>
      <div class="exchange">{{ asset?.exchange }}</div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  @apply grid gap-1 justify-start;
  grid-template-columns: 8rem 10rem auto;
  grid-template-areas:
    'symbol price price-change previous-close'
    'asset asset asset asset';

  .symbol {
    grid-area: symbol;
    @apply font-bold tracking-widest;
  }

  .price {
    grid-area: price;
  }

  .price-change {
    grid-area: price-change;
  }

  .previous-close {
    grid-area: previous-close;
    @apply text-base-content;
  }

  .asset {
    grid-area: asset;
    @apply flex flex-row gap-1 text-sm;

    .name {
    }

    .exchange {
      @apply opacity-75;
    }
  }

  .symbol,
  .price {
    @apply text-4xl;
  }

  .price-change {
    @apply flex gap-1 items-end text-xl;
  }

  .price,
  .change,
  .change-percent,
  .previous-close {
    @apply tabular-nums;
  }

  .up {
    @apply text-success;
  }

  .down {
    @apply text-error;
  }
}
</style>
