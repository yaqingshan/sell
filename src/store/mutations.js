export default {
  tagFavorite (state, isFavorite) {
    state.isFavorite = isFavorite
    try {
      localStorge.isFavorite = isFavorite
    } catch (e) {}
  }
}