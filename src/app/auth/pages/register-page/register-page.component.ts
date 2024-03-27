import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder
  ) {}

  isValidField(field: string) {
    //TODO: Get validation from a service
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();
  }

}
