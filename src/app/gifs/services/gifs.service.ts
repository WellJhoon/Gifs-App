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

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._Taghistory.includes(tag)) {
      this._Taghistory = this._Taghistory.filter((oldTag) => oldTag !== tag);
    }
    this._Taghistory.unshift(tag);
    this._Taghistory = this._Taghistory.splice(0, 10);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
  }
}
