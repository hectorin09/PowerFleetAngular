import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vista-operador',
  imports: [],
  templateUrl: './vista-operador.component.html',
  styleUrl: './vista-operador.component.scss'
})
export class VistaOperadorComponent implements OnInit {
  
  driverData: any;  // Aquí almacenamos los datos dinámicos

  constructor(
    private driverService: DriverService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener el parámetro driverId de la URL
    this.route.queryParams.subscribe(params => {
      const driverId = params['driverId'] || '1473999'; // Valor por defecto si no hay parámetro
      console.log(driverId)

      // Llamar al servicio con el ID obtenido
      this.driverService.getDriverData(driverId).subscribe(
        (data) => {
          this.driverData = data;
          console.log('Datos del conductor:', this.driverData);
        },
        (error) => {
          console.error('Error fetching driver data', error);
        }
      );
    });
  }
}