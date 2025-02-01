import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


defineCustomElements(window);
@Component({
  selector: 'app-edit-account-modal',
  templateUrl: './edit-account-modal.page.html',
  styleUrls: ['./edit-account-modal.page.scss'],
  standalone: false,
})
export class EditAccountModalPage implements OnInit {
  editForm: FormGroup;
  errorMessage: any;
  FormErrors = {
    name: [
      {type: 'required', message: 'El nombre es obligatorio' },
      {type: 'pattern', message: 'El nombre solo puede contener letras y espacios'},
    ],
    last_name: [
      {type: 'required', message: 'El apellido es obligatorio' },
      {type: 'pattern', message: 'El apellido solo puede contener letras y espacios'},
    ],
  };
  user_data: any = {
    name: '',
    last_name: '',
    email: '',
    username: '',
    image: '',
    followers: [],
    followees: [],
  };
  constructor(
    private userService: UserService,
    private storage: Storage, 
    public alertController: AlertController,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
  ) { 
    this.editForm = this.formBuilder.group({
    name: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ])),
    last_name: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ])),
 })
}

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user, "usuario")
    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  updateUser(registerData: any){
    this.user_data.name = registerData.name;
    this.user_data.last_name = registerData.last_name;
    this.update();
  }

  async takePhoto(source: CameraSource) {
    console.log('Take Photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });
    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }

  async update(){
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  async presentPhotoOptions(){
    const alert = await this.alertController.create({
      header: "Seleccione una Opción",
      message: "¿De donde desea obtener la imagen?",
      buttons:[
        {
          text: "Camera",
          handler: ()=> {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text: "Galería",
          handler: ()=>{
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: ()=>{
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
  }
  cedit(){
    this.modalController.dismiss();
    location.reload();
  }

}
