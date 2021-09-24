export const formatNumber = (number: number | string) => {
  //const stringify = '$' + number
  return '$' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
