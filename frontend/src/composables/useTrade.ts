import { InjectionKey, Ref, ref } from 'vue'
import { StreamTrade } from '@/lib/types'
import { GetLatestTrade } from '../../wailsjs/go/main/App'

export const TradeKey = Symbol('Trade') as InjectionKey<Ref<StreamTrade | undefined>>

export const useTrade = () => {
  const trade = ref<StreamTrade>()
  const tradeLoading = ref(false)

  const tradeLoad = async (symbol: string) => {
    tradeLoading.value = true
    try {
      trade.value = await GetLatestTrade(symbol)
    } finally {
      tradeLoading.value = false
    }
  }

  return {
    trade,
    tradeLoading,
    tradeLoad,
  }
}
