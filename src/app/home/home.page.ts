import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  providers: [DatePipe]
})
export class HomePage implements OnInit {
  userName: string | any;

  @ViewChild('nombreInput', { read: ElementRef }) nombreInputRef!: ElementRef;
  @ViewChild('apellidoInput', { read: ElementRef }) apellidoInputRef!: ElementRef;

  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: Date | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private datePipe: DatePipe 
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras && navigation.extras.state) {
        this.userName = navigation.extras.state['user'];
        console.log('Datos del usuario recibidos en Home:', this.userName);
      } else {
        console.warn('No se encontraron datos de usuario en extras.state.');
        this.router.navigate(['/login']);
      }
    });
  }

  limpiarForm() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacion = '';
    this.fechaNacimiento = null;

    if (this.nombreInputRef) {
      this.nombreInputRef.nativeElement.classList.add('shake-left-right');
      setTimeout(() => {
        this.nombreInputRef.nativeElement.classList.remove('shake-left-right');
      }, 1000);
    }

    if (this.apellidoInputRef) {
      this.apellidoInputRef.nativeElement.classList.add('shake-left-right');
      setTimeout(() => {
        this.apellidoInputRef.nativeElement.classList.remove('shake-left-right');
      }, 1000);
    }
  }

  async mostrarDatos() {
    let fechaFormateada = 'No especificada';
    if (this.fechaNacimiento) {
      fechaFormateada = this.datePipe.transform(this.fechaNacimiento, 'dd/MM/yyyy') || 'No especificada';
    }

    const mensaje = 
  `Usuario: ${this.userName}\n` +
  `Nombre: ${this.nombre}\n` +
  `Apellido: ${this.apellido}\n` +
  `Nivel de Educación: ${this.nivelEducacion || 'No especificado'}\n` +
  `Fecha de Nacimiento: ${fechaFormateada}`;


    await this.presentAlert('Datos del Formulario', mensaje);
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