import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrixBuilderComponent } from './matrix-builder.component';
import { BuilderComponent } from './builder/builder.component';
import { MatrixComponent } from './matrix/matrix.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MatrixBuilderComponent,
    BuilderComponent,
    MatrixComponent
  ],
  exports: [
    MatrixBuilderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class MatrixBuilderModule { }
