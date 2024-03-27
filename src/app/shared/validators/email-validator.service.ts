import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {

      console.log({email});

      if(email === 'juan@gmail.com') {
        subscriber.next({
          emailTaken: true
        });
      } else subscriber.next(null);

      subscriber.complete()
    }).pipe(
      delay(2000)
    )

    return httpCallObservable;
  }

}
