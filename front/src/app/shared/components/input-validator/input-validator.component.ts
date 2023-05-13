import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
} from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'input-validator',
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.scss'],
})
export class InputValidatorComponent implements OnInit, AfterContentInit {
  message = '';
  input: NgModel | FormControlName;
  constructor() {}

  ngOnInit(): void {}

  get errorMessage(): string {
    try {
      if (this.input.errors == null) return null;
      else {
        var key = Object.keys(this.input.errors)[0];
        switch (key) {
          case 'required':
            this.message = 'O campo é obrigatório';
            break;
          case 'minlength':
            this.message = 'Campo deve ter no mínimo 3 caracteres';
            break;
          case 'maxlength':
            this.message = 'Campo deve ter no máximo 100 caracteres';
            break;
        }
        return this.message;
      }
    } catch (error) {
      return null;
    }
  }

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  ngAfterContentInit() {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error(
        'Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName'
      );
    }
  }
}
