import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Storage } from '@ionic/storage-angular';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private storage: Storage) {} //Inicializamos Storage

  async ngOnInit() { //Se añade metodo OnInit
    await this.storage.create() // Creamos Storage
  }
}
