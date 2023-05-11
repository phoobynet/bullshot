import { InjectionKey, ref } from 'vue'
import { IsReady } from '../../wailsjs/go/main/App'

export const ReadyKey = Symbol('Ready') as InjectionKey<boolean>

export const useReady = () => {
  const ready = ref<boolean>(false)

  function sleep(time = 1_000): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }

  const wait = async (): Promise<void> => {
    console.log('waiting for app to be ready')
    ready.value = await IsReady()
    const maxAttempts = 10

    if (!ready.value) {
      for (let i = 0; i < maxAttempts; i++) {
        console.log(`waiting for app to be ready...#${i}`)
        await sleep(1_000)
        ready.value = await IsReady()

        if (ready.value) {
          break
        }
      }

      if (!ready.value) {
        throw new Error(`App is not ready after ${maxAttempts} seconds`)
      }
    }
  }

  return {
    ready,
    wait,
  }
}
