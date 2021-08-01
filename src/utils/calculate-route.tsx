import FloorRequest from '../types/FloorRequest'

export default (route: Array<FloorRequest>, _currentFloor: number): Array<FloorRequest> => {
  const result = [...route]
  const direction = result[0].floor > _currentFloor ? 'up' : 'down'
  result.sort((a, b) => {
    if (direction === 'up') {
      if (a < b) return -1
      else if (a > b) return 1
      return 0
    }
    if (a > b) return -1
    else if (a < b) return 1
    return 0
  })
  return result
}