import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Page } from './page';

@Injectable()
export class PageService {
      private pagesUrl = 'app/pages';  // URL to web api

  constructor(private http: Http) { }

  getPages(): Promise<Page[]> {
    return this.http.get(this.pagesUrl)
               .toPromise()
               .then(response => response.json().data as Page[])
               .catch(this.handleError);
  }

    getPage(id: number): Promise<Page> {
        return this.getPages()
                    .then(pages => pages.find(page => page.id === id));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private headers = new Headers({'Content-Type': 'application/json'});
    update(page: Page): Promise<Page> {
        const url = `${this.pagesUrl}/${page.id}`;
        return this.http
            .put(url, JSON.stringify(page), {headers: this.headers})
            .toPromise()
            .then(() => page)
            .catch(this.handleError);
    }

    create(name: string): Promise<Page> {
        return this.http
            .post(this.pagesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        let url = `${this.pagesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }


}
