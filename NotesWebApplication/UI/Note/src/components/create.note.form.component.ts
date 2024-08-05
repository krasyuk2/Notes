import { Component } from "@angular/core";
import {NoteService} from "../Services/note.service";
import {Note} from "../Models/Note";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";



@Component({
  selector: "my-note-create",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `<form (ngSubmit)="CreateNote()" [formGroup]="noteForm" class="w-full flex flex-col gap-5">
    <h3 class="font-black text-xl">Создание заметки</h3>
    <input type="text" name="title" formControlName="title"  placeholder="Название" class="h-12 pl-1.5">
    <input formControlName="description" type="text"  placeholder="Описание" class="h-24 word pl-1.5" >
    <button  class="bg-teal-800 rounded-lg h-12 text-gray-300 font-bold hover:bg-teal-600 ">Создать</button>
  </form>`,

})
export class CreateNoteFormComponent {
  constructor(private noteService: NoteService) {}

  noteForm : FormGroup = new FormGroup({
    title: new FormControl<string>("", [Validators.required]),
    description: new FormControl<string>("", [Validators.required]),
  })


  public  CreateNote() {
    const addNote = {
      title : this.noteForm.value.title,
      description : this.noteForm.value.description
    }

    this.noteService.create(addNote).subscribe(
      {
        next: value => console.log(value),
        error: value => console.log(value),
      }
    )
  }
}
