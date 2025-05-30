import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  usuario: {
    user: string;
    password: string
  } = {
    user: '',
    password: ''
  };

  constructor(private alertController: AlertController, private router: Router) { }


  async login() {
    if (!this.usuario.user || !this.usuario.password) {
      await this.presentAlert('Error al iniciar sesión', 'Por favor, complete todos los campos.');
      return
    }

    if (this.usuario.user.length < 3 || this.usuario.user.length > 8) {
      await this.presentAlert('Error en el usuario', 'El usuario debe tener entre 3 y 8 caracteres.');
      return
    }

    if (this.usuario.password.length != 4 || isNaN(Number(this.usuario.password))) {
      await this.presentAlert('Error en la contraseña', 'La contraseña deben ser números y tener 4 caracteres.');
      return
    }

    console.log(`Login Exitoso:
      User: ${this.usuario.user}
      Password: ${this.usuario.password}`)

    let navigationExtras: NavigationExtras = {
      state: {
        user: this.usuario.user
      }
    };

    await this.presentAlert('Login Exitoso', 'Bienvenido a la aplicación!');
    this.router.navigate(['/home'], navigationExtras);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
