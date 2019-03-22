const e10 = Math.sqrt(50)
const e5 = Math.sqrt(10)
const e2 = Math.sqrt(2)

export default (start, stop, count) => {
  if (start === stop && count > 0) return [start]

  const reverse = stop < start
  let n
  if (reverse) {
    n = start
    start = stop
    stop = n
  }
  const step = tickIncrement(start, stop, count)
  if (step === 0 || !isFinite(step)) return []

  let i = -1
  let ticks
  if (step > 0) {
    start = Math.ceil(start / step)
    stop = Math.floor(stop / step)
    ticks = new Array(n = Math.ceil(stop - start + 1))
    while (++i < n) ticks[i] = (start + i) * step
  } else {
    start = Math.floor(start * step)
    stop = Math.ceil(stop * step)
    ticks = new Array(n = Math.ceil(start - stop + 1))
    while (++i < n) ticks[i] = (start - i) / step
  }

  if (reverse) ticks.reverse()

  return ticks
}

export function tickIncrement (start, stop, count) {
  const step = (stop - start) / Math.max(0, count)
  const power = Math.floor(Math.log(step) / Math.LN10)
  const error = step / Math.pow(10, power)
  return power >= 0
    ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
    : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1)
}

export function tickStep (start, stop, count) {
  const step0 = Math.abs(stop - start) / Math.max(0, count)
  let step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10))
  const error = step0 / step1
  if (error >= e10) step1 *= 10
  else if (error >= e5) step1 *= 5
  else if (error >= e2) step1 *= 2
  return stop < start ? -step1 : step1
}
