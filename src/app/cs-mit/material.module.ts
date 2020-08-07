import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    MatTableModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    MatTableModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class MaterialModule {}