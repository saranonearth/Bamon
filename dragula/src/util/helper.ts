export const getFixedRate = (amount: number) => {
  if (amount >= 0 && amount <= 100) {
    return 8
  } else if (amount >= 101 && amount <= 200) {
    return 16
  } else if (amount >= 201 && amount <= 300) {
    return 32
  } else if (amount >= 301 && amount <= 400) {
    return 32
  } else if (amount >= 401 && amount <= 500) {
    return 40
  } else {
    return 40
  }
}
