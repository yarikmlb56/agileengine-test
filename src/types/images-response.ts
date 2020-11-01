import { Image } from './image';

export interface ImagesResponse {
  hasMore: boolean;
  page: number;
  pageCount: number;
  pictures: Array<Image>;
}
