export default class PagenationModel<T> {
  currentPageNumber!: number
  totalPageNumber!: number
  offset!: number
  sortField!: string
  sortOrder!: string
  searchQuery?: string
  startDate?: string
  endDate?: string
  isLastPage?: boolean
  data!: T
}
