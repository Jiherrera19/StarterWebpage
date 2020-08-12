import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatSortModule
  ],
  exports: [
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatSortModule
  ]
})
export class MaterialModule {}