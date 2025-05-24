import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  private emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async login() {
    if (!this.email || !this.password) {
      await this.presentAlert('Error al iniciar sesión', 'Por favor, complete todos los campos.');
      return
    }

    if (!this.emailRegex.test(this.email)) {
      await this.presentAlert('Error en el correo', 'Ingrese un correo electrónico válido.');
      return
    }

    if (this.password.length < 4) {
      await this.presentAlert('Error en la contraseña', 'La contraseña debe tener al menos 4 caracteres.');
      return
    }

    console.log(`Login Exitoso:
      Email: ${this.email}
      Password: ${this.password}`)

      await this.presentAlert('Login Exitoso', 'Bienvenido a la aplicación!');
      this.email = '';
      this.password = '';
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
