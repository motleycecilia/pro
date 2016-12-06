export function getChoseBePeople(beInsureList) {
  return beInsureList.filter((val, index) => {
    return val.id === this.state.insurerId
  })
}
