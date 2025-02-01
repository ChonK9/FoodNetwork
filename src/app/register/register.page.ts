import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;
  FormErrors = {
    email: [
      {type: 'required', message:'El correo es obligatorio' },
      {type: 'email', message:'El correo no es valido' },
    ],
    name: [
      {type: 'required', message: 'El nombre es obligatorio' },
      {type: 'pattern', message: 'El nombre solo puede contener letras y espacios'},
    ],
    last_name: [
      {type: 'required', message: 'El apellido es obligatorio' },
      {type: 'pattern', message: 'El apellido solo puede contener letras y espacios'},
    ],
    username: [
      {type: 'required', message: 'El nombre de usuario es obligatorio' },
      {type: 'minlength', message: 'El nombre de usuario debe poseer 3 o mas caracteres'}
    ],
    password:[
      {type: 'required', message: 'La contraseña es obligatoria'},
      {type: 'minlength', message: 'La contraseña debe poseer mas de 6 caracteres'},
      {type: 'pattern', message: 'La costraseña debe poseer una letra en miniscula, una en mayuscula y algun numero'},
    ],
    password_confirmation:[
      {type: 'required', message: 'Confirmar la contraseña es obligatorio'},
      {type: 'minlength', message: 'La contraseña debe poseer mas de 6 caracteres'},
      {type: 'pattern', message: 'La costraseña debe poseer una letra en miniscula, una en mayuscula y algun numero'},
    ]

  }
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController)
   {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.email
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ])),
      last_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])),
      password_confirmation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ]))
   })
}

  ngOnInit() {
  }

  registerUser(registerData: any){
    this.authService.register(registerData).then(res =>{
      console.log(res);
      this.errorMessage = '';
      this.navCtrl.navigateForward('/login');
    }).catch(err =>{
      console.log(err);
      this.errorMessage = err;
    })
  }
  
  finish(){
    this.router.navigateByUrl('/login');
  }

  

}
