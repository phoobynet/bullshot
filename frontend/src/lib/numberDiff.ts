export interface INumberDiff {
  change: number
  changeAbs: number
  changePct: number
  changePctAbs: number
  sign: 1 | -1
  signSymbol: '+' | '-' | ''
}

export const numberDiff = (originalValue: number, newValue: number): INumberDiff => {
  const change = newValue - originalValue

  return {
    change,
    changeAbs: Math.abs(change),
    changePctAbs: Math.abs(change / originalValue),
    changePct: change / originalValue,
    sign: change >= 0 ? 1 : -1,
    signSymbol: change === 0 ? '' : change > 0 ? '+' : '-',
  }
}
