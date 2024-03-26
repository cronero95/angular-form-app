import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const xboxSeriesX = {
  name: 'Xbox Series X',
  price: 3200000,
  inStorage: 17
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  public myForm: FormGroup = this.formBuilder.group({
    name:       ['', [Validators.required, Validators.minLength(3)]],
    price:      [0, [Validators.required, Validators.min(0)]],
    inStorage:  [0, [Validators.required, Validators.min(0)]]
  })

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
  // this.myForm.reset(xboxSeriesX);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';

        case 'minlength':
          return `The text must have at least ${errors['minlength'].requiredLength} characters.`;

        case 'min':
          return `The value must be greater or equal to ${errors['min'].min}.`;

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
