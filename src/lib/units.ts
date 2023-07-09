export const byteFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
  style: 'unit',
  unit: 'byte',
  unitDisplay: 'narrow',
})
