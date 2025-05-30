import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  userName: string | any

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

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
}
