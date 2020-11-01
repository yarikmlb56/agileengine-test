import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImagesResponse, SingleImage } from '../../../types';

@Injectable()

export class ImageHttpService {
  private readonly imageUri: string = 'http://interview.agileengine.com/images';

  constructor(private httpClient: HttpClient) {
  }

  public getImagesResponse(pageIndex: number): Observable<ImagesResponse> {
    const requestParams: HttpParams = new HttpParams().set('page', String(pageIndex++));

    return this.httpClient.get<ImagesResponse>(this.imageUri, {
      params: requestParams,
    });
  }

  public getSingleImage(imageId: number): Observable<SingleImage> {
    return this.httpClient.get<SingleImage>(`${this.imageUri}/${imageId}`);
  }
}
