import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const searchBooks = '/api/books'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getBooks(): Observable<any> {
    return this.http.get(searchBooks, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  searchBooks(filter): Observable<any> {
    let urlParams;
    if (filter.by == 'title') {
      urlParams = '?title=';
    } else if (filter.by == 'author') {
      urlParams = '?author=';
    } else if (filter.by == 'isbn') {
      urlParams = '?isbn=';
    } else {
      console.log("This never happens !")
    }
    console.log(urlParams + filter.find)
    return this.http.get(searchBooks + urlParams + filter.find, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  issueBook(id, issueTo): Observable<any> {
    var issuance = {
      "bookid":id,
      "name": issueTo,
      "borrowedOn": new Date().toISOString()
    }
    return this.http.post(searchBooks + "/issue", issuance, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  returnBook(id,lastIssueId): Observable<any> {
    var issuance = {
      "returnedOn": new Date().toISOString(),
      "lastIssueId" : lastIssueId
    }

    return this.http.put(searchBooks + "/" + id + "/issue", issuance, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  issueHistory(id): Observable<any> {
    return this.http.get(searchBooks + "/" + id + "/issue-history", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
