import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Note} from "../Models/Note";

@Injectable()
export class NoteService {
  constructor(private http: HttpClient) {
  }

  url: string = "http://localhost:5127/api/Notes";



  public create(note: Note): Observable<Note> {
    return this.http.post<Note>(this.url, note)
  }

  getNotes(search?: string, sortItem?: string, sortOrder?: string): Observable<GetNotesResponse> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    if (sortItem) {
      params = params.set('sortItem', sortItem);
    }

    if (sortOrder) {
      params = params.set('sortOrder', sortOrder);
    }

    return this.http.get<GetNotesResponse>(`${this.url}`, { params });
  }
}

export interface GetNotesResponse {
  notes: Note[];
}
