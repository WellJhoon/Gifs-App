import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _Taghistory: string[] = [];
  constructor() {}

  get tagHistory() {
    return [...this._Taghistory];
  }

  searchTag(tag: string): void {
    this._Taghistory.unshift(tag);
  }
}
