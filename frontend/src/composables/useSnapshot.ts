import { computed, InjectionKey, Ref, ref } from 'vue'
import { marketdata } from '../../wailsjs/go/models'
import { GetSnapshot } from '../../wailsjs/go/main/App'
import { formatISO } from 'date-fns'

export const SnapshotKey = Symbol('Snapshot') as InjectionKey<Ref<marketdata.Snapshot | undefined>>
export const SnapshotPrevDailyBarKey = Symbol('SnapshotPrevDailyBar') as InjectionKey<
  Ref<marketdata.Bar | undefined>
>

export const useSnapshot = () => {
  const snapshot = ref<marketdata.Snapshot>()
  const snapshotLoading = ref(false)
  const snapshotLoad = async (symbol: string) => {
    snapshotLoading.value = true
    try {
      snapshot.value = await GetSnapshot(symbol)
    } finally {
      snapshotLoading.value = false
    }
  }

  const today = formatISO(Date.now(), { representation: 'date' })

  // correct for pre-market
  const prevDailyBar = computed(() => {
    if (!snapshot.value) {
      return undefined
    }

    if ((snapshot.value?.dailyBar?.t).substring(0, 10) === today) {
      return snapshot.value?.prevDailyBar
    } else {
      return snapshot.value?.dailyBar
    }
  })

  return {
    snapshot,
    snapshotLoading,
    snapshotLoad,
    prevDailyBar,
  }
}
