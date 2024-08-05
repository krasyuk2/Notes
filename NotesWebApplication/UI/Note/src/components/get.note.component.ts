
import {Component, OnInit} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgFor} from "@angular/common";
import {GetNotesResponse, NoteService} from "../Services/note.service";
import {Note} from "../Models/Note";



@Component({
  selector: "get-note",
  standalone: true,
  imports: [FormsModule,NgFor ],
  template: `
    <div>
      <h2>Список заметок</h2>

      <div>
        <input type="text" placeholder="Поиск..." [(ngModel)]="searchText" (ngModelChange)="loadNotes(searchText, sortItem, sortOrder)">
      </div>


      <div>
        <label>Сортировать по:</label>
        <select [(ngModel)]="sortItem" (ngModelChange)="loadNotes(searchText, sortItem, sortOrder)">
          <option value="title">Заголовку</option>
          <option value="createdAt">Дате создания</option>
        </select>
      </div>


      <div>
        <label>Порядок сортировки:</label>
        <select [(ngModel)]="sortOrder" (ngModelChange)="loadNotes(searchText, sortItem, sortOrder)">
          <option value="asc">Сначала старые</option>
          <option value="desc">Сначала новые</option>
        </select>
      </div>


      <ul>
        <li *ngFor="let note of notes">
          <h3>{{ note.title }}</h3>
          <p>{{ note.description }}</p>
        </li>
      </ul>
    </div>
  `
})
export class NotesWebApplication implements OnInit {

  notes: Note[] = [];
  searchText: string = '';
  sortItem: string = 'title';
  sortOrder: string = 'asc';

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes(search?: string, sortItem?: string, sortOrder?: string) {
    this.noteService.getNotes(search, sortItem, sortOrder)
      .subscribe((response: GetNotesResponse) => {
        this.notes = response.notes;
      });
  }
}
