export interface PaginationProps {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  rowsPerPage: number;
  sortBy: string;
  descending?: boolean;
}
