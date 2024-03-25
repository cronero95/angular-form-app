import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    name:       [''],
    price:      [0],
    inStorage:  [0]
  })

  constructor(
    private formBuilder: FormBuilder
  ) {}

  onSave(): void {
    console.log(this.myForm.value);
  }

}
