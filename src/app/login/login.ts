import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginFormular!: FormGroup
  formBuilder = inject(FormBuilder)
  router = inject(Router)

  ngOnInit(){
    this.buildFormular()
  }

  buildFormular() {
    return this.loginFormular = this.formBuilder.nonNullable.group({
      username : ["", [Validators.required, Validators.maxLength(30), Validators.email]],
      password : ["", [Validators.required, Validators.minLength(10)]]
    })
  }
  onSubmit() {
    const userData = this.loginFormular.getRawValue()
    console.log(userData)
    this.router.navigate(['dashboard'])
  }
}
