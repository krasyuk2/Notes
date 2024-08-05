import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CreateNoteFormComponent} from "../components/create.note.form.component";
import {NoteService} from "../Services/note.service";
import {HttpClientModule} from "@angular/common/http";
import {NotesWebApplication} from "../components/get.note.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateNoteFormComponent, HttpClientModule, NotesWebApplication],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [NoteService]
})
export class AppComponent {
  title = 'Note';
}
