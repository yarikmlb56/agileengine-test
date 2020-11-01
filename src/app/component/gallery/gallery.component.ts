import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageHttpService } from '../../shared/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Image, ImagesResponse } from '../../../types';
import { ImagePreviewComponent } from '../image-preview';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-gallery-component',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})

export class GalleryComponent implements OnInit, OnDestroy {
  public images: Array<Image> = [];
  public imageResponse: ImagesResponse;
  public totalResults: number;

  private destroy$$: Subject<void> = new Subject<void>();

  constructor(private imageHttpService: ImageHttpService, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.getImages();
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  public handlePageChanged(event: PageEvent): void {
    this.getImages(event.pageIndex);
  }

  public handleImageSelection(imageId: string): void {
    this.dialog.open(ImagePreviewComponent, {
      width: '600px',
      height: '500px',
      data: { imageId }
    });
  }

  private getImages(pageIndex: number = 0): void {
    this.imageHttpService.getImagesResponse(pageIndex).pipe(
      takeUntil(this.destroy$$)
    ).subscribe((imagesResponse: ImagesResponse): void => {
      this.imageResponse = imagesResponse;
      this.images = imagesResponse.pictures;
      this.totalResults = imagesResponse.pageCount * 10;
    });
  }
}
