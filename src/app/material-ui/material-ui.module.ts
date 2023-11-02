import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import {MatExpansionModule, matExpansionAnimations} from '@angular/material/expansion'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatExpansionModule
  ]
})
export class MaterialUiModule { }
