import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryModel } from '../models/country.model';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<CountryModel[]> {
    return this._httpClient.get<CountryModel[]>(
      'https://636ce2d8ab4814f2b2712854.mockapi.io/countries'
    );
  }
}
