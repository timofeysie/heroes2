import { QuestionBase } from './question-base';
/**
 * DropdownQuestion presents a list of choices in a select box.
 */
export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
