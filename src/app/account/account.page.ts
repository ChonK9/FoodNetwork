import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ModalController } from '@ionic/angular';
import { EditAccountModalPage } from '../edit-account-modal/edit-account-modal.page';

defineCustomElements(window);
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit {
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
    private modalController: ModalController,
  ) { }

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

  async editAccount(){
    console.log('Editar Perfil');
    const modal = await this.modalController.create({
      component: EditAccountModalPage,
      componentProps:{},
    });
    return await modal.present();
  }

  clickup(){
    location.reload();
  }

}
