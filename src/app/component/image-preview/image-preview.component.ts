import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageHttpService } from '../../shared/services';
import { Image, SingleImage } from '../../../types';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageItem } from 'ng-gallery';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-image-preview-component',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnInit, OnDestroy {
  public imageId: number;
  public singleImage: SingleImage;

  private destroy$$: Subject<void> = new Subject<void>();

  public constructor(
    public dialogRef: MatDialogRef<ImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      imageId: number,
      images: Array<Image>,
    },
    private imageHttpService: ImageHttpService,
  ) {
  }

  public ngOnInit(): void {
    this.imageId = this.data.imageId;
    this.getSingleImage();
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  private getSingleImage(): void {
    this.imageHttpService.getSingleImage(this.imageId).pipe(
      takeUntil(this.destroy$$)
    ).subscribe((singleImage: SingleImage): void => {
      this.singleImage = singleImage;
    });
  }
}
