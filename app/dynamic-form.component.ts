import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
/**
 * DynamicFormComponent is the entry point and the main container for the form.
 * Create components to represent the dynamic form.
 * presents a list of questions, each question bound to a <df-question> component element. 
 * The <df-question> tag matches the DynamicFormQuestionComponent, the component responsible for 
 * rendering the details of each individual question based on values in the data-bound question object.
 * modul.Id means Component-Relative Paths are used so we don't need to full path to the template.
 */
@Component({
  moduleId: module.id,
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService) {  }
  
  /**
   * (property) DynamicFormComponent.qcs: QuestionControlService  
   */
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
