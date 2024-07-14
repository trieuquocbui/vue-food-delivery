export default interface PagenationResponseModel<T> {
    content: T
    total: number,
    page: number,
    totalPages: number,
    isLastPage: boolean
}