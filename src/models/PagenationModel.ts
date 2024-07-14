export default interface PagenationModel<T> {
  currentPageNumber: number
  totalPageNumber: number
  offset: number
  sortField: string
  sortOrder: string
  searchQuery: string
  data: T
}
