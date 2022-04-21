import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from './Constant';
export const getPage = page => parseInt(page) - 1 || DEFAULT_PAGE;
export const getPageSize = size => parseInt(size) || DEFAULT_PAGE_SIZE;
