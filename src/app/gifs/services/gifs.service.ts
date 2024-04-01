import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public GifList: Gif[] = [];

  private _Taghistory: string[] = [];
  private apiKey: string = 'h3vKAUUqxs3RBvwK9764nk66pi6DAyKI';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

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
    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this._Taghistory));
  }

  loadLocalStorage() {
    if (!localStorage.getItem('history')) return;
    this._Taghistory = JSON.parse(localStorage.getItem('history')!);

    if (this._Taghistory.length === 0) return;
    this.searchTag(this._Taghistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', 10);
    this.http
      .get<SearchResponse>(`${this.serviceURL}/search`, { params: params })
      .subscribe((resp) => {
        this.GifList = resp.data;
      });
  }
}
