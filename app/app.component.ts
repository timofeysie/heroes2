import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { QuestionService } from './question.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers:  [QuestionService]
})
export class AppComponent {
  questions: any[];
  title = 'Myra the ferryboat';
  constructor(service: QuestionService) {
    this.questions = service.getQuestions();
  }
}
