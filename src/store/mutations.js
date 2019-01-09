export default {
  tagFavorite (state, isFavorite) {
    state.isFavorite = isFavorite
    try {
      localStorage.isFavorite = isFavorite
    } catch (e) {}
  }
}
