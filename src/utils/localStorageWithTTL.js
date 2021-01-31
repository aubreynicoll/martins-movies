const setItem = (key, value, hoursToLive) => {
  const date = new Date()
  const expiry = date.setHours(date.getHours() + hoursToLive)

  const item = {
    value,
    expiry
  }

  localStorage.setItem(key, JSON.stringify(item))
}

const getItem = (key) => {
  const item = JSON.parse(localStorage.getItem(key))
  const date = new Date()

  if (!item || date > item.expiry) {
    return null
  }

  return item.value
}

const localStorageWithTTL = {
  setItem,
  getItem
}

export default localStorageWithTTL