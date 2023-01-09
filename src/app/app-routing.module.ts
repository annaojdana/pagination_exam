
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExamPaginationCountriesComponent } from './components/exam-pagination-countries/exam-pagination-countries.component';
import { ExamPaginationCountriesComponentModule } from './components/exam-pagination-countries/exam-pagination-countries.component-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'exam-pagination-countries', component: ExamPaginationCountriesComponent }]), ExamPaginationCountriesComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
