import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Dashboard } from "../dashboard/dashboard";
import { FakeBoard } from "./fake-board/fake-board";


@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, Dashboard, FakeBoard],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginFormular!: FormGroup
  formBuilder = inject(FormBuilder)
  router = inject(Router)
  submitted = false

  ngOnInit(){
    this.buildFormular()
  }

  buildFormular() {
    return this.loginFormular = this.formBuilder.nonNullable.group({
      username : ["", [Validators.required, Validators.maxLength(30), Validators.email]],
      password : ["", [Validators.required, Validators.minLength(10)]]
    })
  }

  isUnlocked = false
  onSubmit() {
    this.isUnlocked = true // Bild auf "offen" setzen
    setTimeout(() => {
      this.submitted = true
      if (this.loginFormular.valid) {
        const userData = this.loginFormular.getRawValue()
        console.log(userData)
        this.router.navigate(['dashboard'])
      }
      
    }, 500)
  }
}
