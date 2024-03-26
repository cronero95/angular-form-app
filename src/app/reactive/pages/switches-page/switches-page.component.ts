import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true, [Validators.required]],
    termsAndConditions: [false, [Validators.requiredTrue]]
  })

  constructor(
    private formBuilder: FormBuilder
  ) {}

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'You should accept the terms of use.';

        default:
          return '';
      }
    }

    return '';
  }

  onSave(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return
    };

    console.log(this.myForm.value);

  }

}
