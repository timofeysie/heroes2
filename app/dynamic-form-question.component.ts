import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from './question-base';
/**
 * formGroup connects the template HTML to the underlying control objects, 
 * populated from the question model with display and validation rules.
 */
@Component({
  moduleId: module.id,
  selector: 'df-question',
  templateUrl: 'dynamic-form-question.component.html',
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}
