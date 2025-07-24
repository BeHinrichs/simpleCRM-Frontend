import { Component } from '@angular/core';
import { FakeNav } from "../fake-nav/fake-nav";

@Component({
  selector: 'app-fake-board',
  imports: [FakeNav],
  templateUrl: './fake-board.html',
  styleUrl: './fake-board.css'
})
export class FakeBoard {

}
