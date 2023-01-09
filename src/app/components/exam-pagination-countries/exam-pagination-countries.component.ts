import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { CountryModel } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-exam-pagination-countries',
  templateUrl: './exam-pagination-countries.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamPaginationCountriesComponent {
  readonly paginationData$: Observable<{
    pageSize: number;
    pageNumber: number;
  }> = this._activatedRoute.queryParams.pipe(
    map((data) => {
      return {
        pageSize: data['pageSize'] === undefined ? 5 : +data['pageSize'],
        pageNumber: data['pageNumber'] === undefined ? 1 : +data['pageNumber'],
      };
    })
  );

  readonly countries$: Observable<CountryModel[]> = combineLatest([
    this.paginationData$,
    this._countriesService.getAll(),
  ]).pipe(
    map(([pagination, countries]) => {
      return countries.filter((c, i) => {
        return (
          i >= (pagination.pageNumber - 1) * pagination.pageSize &&
          i <=
            (pagination.pageNumber - 1) * pagination.pageSize +
              (pagination.pageSize - 1)
        );
      });
    })
  );

  public pageSizeOptions$: Observable<number[]> = of([5, 10, 15]);
  public pageNumberOptions$: Observable<number[]> = combineLatest([
    this.paginationData$,
    this._countriesService.getAll(),
  ]).pipe(
    map(([pagination, countries]) => {
      let countPage: number = Math.ceil(countries.length / pagination.pageSize);
      let pageNumArr: number[] = [];
      if (pagination.pageNumber === 1)
        return (pageNumArr = [1, pagination.pageNumber + 1, countPage]);
      if (pagination.pageNumber === 2)
        return (pageNumArr = [
          1,
          pagination.pageNumber,
          pagination.pageNumber + 1,
          countPage,
        ]);
      if (pagination.pageNumber > 2 && pagination.pageNumber < countPage - 1)
        return (pageNumArr = [
          1,
          pagination.pageNumber - 1,
          pagination.pageNumber,
          pagination.pageNumber + 1,
          countPage,
        ]);
      if (pagination.pageNumber === countPage - 1)
        return (pageNumArr = [
          1,
          pagination.pageNumber - 1,
          pagination.pageNumber,
          countPage,
        ]);
      // for (let index = 1; index <= countPage; index++) {
      //   pageNumArr.push(index);
      // }
      return (pageNumArr = [1, pagination.pageNumber - 1, countPage]);
    })
  );

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _countriesService: CountriesService,
    private _router: Router
  ) {}

  onPageChanged(item: number): void {
    this.paginationData$
      .pipe(
        take(1),
        tap((data) => {
          this._router.navigate([], {
            queryParams: {
              pageNumber: item,
              pageSize: data.pageSize,
            },
          });
        })
      )
      .subscribe();
  }
  onSizeChanged(item: number): void {
    this.paginationData$
      .pipe(
        take(1),
        tap((data) => {
          if (item === 10) {
            this._router.navigate([], {
              queryParams: {
                pageNumber: data.pageNumber > 10 ? 10 : data.pageNumber,
                pageSize: item,
              },
            });
            return;
          }
          if (item === 15) {
            this._router.navigate([], {
              queryParams: {
                pageNumber: data.pageNumber > 7 ? 7 : data.pageNumber,
                pageSize: item,
              },
            });
            return;
          }
          this._router.navigate([], {
            queryParams: {
              pageNumber: data.pageNumber,
              pageSize: item,
            },
          });
        })
      )
      .subscribe();
  }
}
