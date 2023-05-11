import { alpaca } from '../../wailsjs/go/models'
import { InjectionKey, Ref, ref } from 'vue'
import { GetAsset } from '../../wailsjs/go/main/App'

export const AssetKey = Symbol('Asset') as InjectionKey<Ref<alpaca.Asset | undefined>>

export const useAsset = () => {
  const asset = ref<alpaca.Asset>()
  const assetLoading = ref<boolean>(false)
  const assetLoad = async (symbol: string) => {
    try {
      assetLoading.value = true
      asset.value = await GetAsset(symbol)
    } finally {
      assetLoading.value = false
    }
  }

  return {
    asset,
    assetLoad,
    assetLoading,
  }
}
