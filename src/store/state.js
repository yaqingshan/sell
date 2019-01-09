let defaultFavorite = false
try {
  if (localStorage.isFavorite) {
    defaultFavorite = localStorage.isFavorite
  }
} catch (e) {}
export default {
  isFavorite: defaultFavorite
}
