import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ExamPaginationCountriesComponent } from './exam-pagination-countries.component';

@NgModule({
  imports: [MatCardModule, MatChipsModule, CommonModule, MatButtonToggleModule, ReactiveFormsModule, MatButtonModule],
  declarations: [ExamPaginationCountriesComponent],
  providers: [],
  exports: [ExamPaginationCountriesComponent]
})
export class ExamPaginationCountriesComponentModule {
}
