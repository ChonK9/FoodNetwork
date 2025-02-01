import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;
  formErrors= {
    email: [
      {type: 'required', message:'El correo es obligatorio' },
      {type: 'email', message:'El correo no es valido' },
    ],
    password: [
      {type: 'required', message:'La contraseña es obligatoria' },
      {type: 'minlength', message:'La contraseña es muy corta' },
    ]
  }


  constructor(
    private FormBuilder: FormBuilder, 
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage,
    private router: Router,
  ) { 
    this.loginForm = this.FormBuilder.group({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    })
  }
  

  ngOnInit() {
  }

  loginUser(credentials: any){
    this.authService.login(credentials).then((res: any) => {
      console.log(res);
      this.errorMessage = '';
      this.storage.set('user', res.user)
      this.storage.set('isUserLoggedIn', true)
      this.navCtrl.navigateForward('/menu/home')
    }).catch(err => {
      console.log(err);
      this.errorMessage = err;
    })
  }

  finish(){
    console.log('finish');
    this.router.navigateByUrl('/register');
  }

}
