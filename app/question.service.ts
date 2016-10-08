import { Injectable }       from '@angular/core';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
@Injectable()
export class QuestionService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {
    let questions: QuestionBase<any>[] = [
      new DropdownQuestion({
        key: 'brave',
        label: 'Favorite character',
        options: [
          {key: 'myra',  value: 'Myra'},
          {key: 'hakea',  value: 'Hakea Blossumn'},
          {key: 'stingray',   value: 'The Stringray'},
          {key: 'serrata', value: 'Serrata'},
          {key: 'tim', value: 'Tim'},
          {key: 'wallaby', value: 'The Wallaby'}
        ],
        order: 3
      }),
      new TextboxQuestion({
        key: 'firstName',
        label: 'Name',
        value: '',
        required: true,
        order: 1
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
