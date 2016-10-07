import { QuestionBase } from './question-base';
/**
 * TextboxQuestion supports multiple html5 types like text, email, url etc via the type property.
 */
export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
