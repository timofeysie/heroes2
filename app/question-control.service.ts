import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from './question-base';

/**
 * A service for transforming questions to a FormGroup. 
 * The form group consumes the metadata from the question model and 
 * allows us to specify default values and validation rules.
 */
@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
