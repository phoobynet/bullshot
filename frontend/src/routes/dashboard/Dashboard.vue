<script setup lang="ts">
import { TradeKey, useTrade } from '@/composables/useTrade'
import { computed, onMounted, provide } from 'vue'
import { EventsOn } from '../../../wailsjs/runtime'
import { StreamTrade } from '@/lib/types'
import { Subscribe } from '../../../wailsjs/go/main/App'
import { AssetKey, useAsset } from '@/composables/useAsset'
import { SnapshotKey, SnapshotPrevDailyBarKey, useSnapshot } from '@/composables/useSnapshot'
import { marketdata } from '../../../wailsjs/go/models'
import DashboardHeader from '@/routes/dashboard/components/DashboardHeader.vue'

const symbol = 'AAPL'

const { trade, tradeLoading, tradeLoad } = useTrade()
provide(TradeKey, trade)

const { asset, assetLoad, assetLoading } = useAsset()
provide(AssetKey, asset)

const { snapshot, snapshotLoading, snapshotLoad, prevDailyBar } = useSnapshot()
provide(SnapshotKey, snapshot)
provide(SnapshotPrevDailyBarKey, prevDailyBar)

const loading = computed(() =>
  [tradeLoading.value, assetLoading.value, snapshotLoading.value].every(l => l),
)

onMounted(async () => {
  await tradeLoad(symbol)
  await assetLoad(symbol)
  await snapshotLoad(symbol)

  EventsOn('trade', (t: StreamTrade) => {
    trade.value = t
  })

  EventsOn('snapshot', (s: marketdata.Snapshot) => {
    snapshot.value = s
  })

  await Subscribe(symbol)
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <DashboardHeader />
  </div>
</template>

<style scoped></style>
