import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Hitman Blood Money', [Validators.required]],
      ['Project Zomboid', [Validators.required]]
    ])
  });

  public addFavoriteForm: FormControl =
    new FormControl('', [Validators.required, Validators.minLength(2)]);

  constructor(
    private formBuilder: FormBuilder
  ) {}

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
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

  onAddToFavorites(): void {
    if(this.addFavoriteForm.invalid) return;

    const newGame = this.addFavoriteForm.value;

    this.favoriteGames.push(
      this.formBuilder.control(newGame, Validators.required)
    );

    this.addFavoriteForm.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return
    };

    console.log(this.myForm.value);

    this.favoriteGames.clear();

    this.myForm.reset();
  }

}
