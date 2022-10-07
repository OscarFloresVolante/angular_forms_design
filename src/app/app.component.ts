import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  
  private onlyLettersPattern = '^[A-Za-z\\s]+$';
  private onlyNumbersLettersPattern = '^[A-Za-z0-9]+$';

  title = 'reactive-forms-final';

  loginFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.onlyLettersPattern)]],
      username: ['', [Validators.required, Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      passwd1: ['', [Validators.required, Validators.maxLength(8), Validators.pattern(this.onlyNumbersLettersPattern)]],
      passwd2: ['', [Validators.required, Validators.maxLength(8), Validators.pattern(this.onlyNumbersLettersPattern)]],
      agreeTerms: [, [Validators.required]],
    }, {
      validators: this.passwordsValidation
    });
  }

  ngOnInit(): void {}

  // Getters
  get nameField() {
    return this.loginFormGroup.get('name');
  }

  get usernameField() {
    return this.loginFormGroup.get('username');
  }

  get emailField() {
    return this.loginFormGroup.get('email');
  }

  get passwd1Field() {
    return this.loginFormGroup.get('passwd1');
  }

  get passwd2Field() {
    return this.loginFormGroup.get('passwd2');
  }

  get agreeTermsField() {
    return this.loginFormGroup.get('agreeTerms');
  }

  // Events
  onlyLetters(e: KeyboardEvent): Boolean {
    let res = e.key.match(this.onlyLettersPattern);
    return res === null ? false : true;
  }

  onlyNumbersAndLetters(e: KeyboardEvent): Boolean {
    let res = e.key.match(this.onlyNumbersLettersPattern);
    return res === null ? false : true;
  }

  // Own validators
  passwordsValidation(control: AbstractControl): ValidationErrors | null {
    const passwd1 = control.get('passwd1')?.value;
    const passwd2 = control.get('passwd2')?.value;
    return passwd1 === passwd2 ? null : {error_passwords_match: 'No matches'}
  }

  // Functions
  createAccount(): void {
    alert("We will send the data, I promised you!!!");
  }

}
