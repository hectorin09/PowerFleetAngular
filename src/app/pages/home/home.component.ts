import { Component, ViewChild  } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe, NgFor } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType, ChartEvent, ChartData } from "chart.js";
import { CommonModule } from '@angular/common';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';

import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component'; // Importar SidebarComponent

import { BaseChartDirective } from 'ng2-charts';

// import { DarkModeService } from '../../services/dark-mode.service';

import { NgbdTableComplete } from './table-complete';
import { Router } from '@angular/router';

import { DarkModeService } from '../../services/dark-mode.service';

import {TranslateModule, TranslateLoader, TranslateService, TranslatePipe} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Función para cargar archivos de traducción


interface Country {
	id: number;
	gravedad: string;
	fecha: string;
	vehiculo: string;
	grupo: string;
	conductor: string;
	tipo: string;
	nombre:string;
	description:string;
}

const COUNTRIES: Country[] = [
  { id: 1, gravedad: 'Bajo', fecha: '31/01/2025 16:27:37', vehiculo: 'LEO06989', grupo: 'Oeste León', conductor: 'Juan Perez', tipo: 'Geo-cerca', nombre: 'U.0 Oriente León', description: 'Entrada a Geo-cerca' },
  { id: 2, gravedad: 'Bajo', fecha: '31/01/2025 16:28:00', vehiculo: 'LEO06990', grupo: 'Oeste León', conductor: 'Carlos Garcia', tipo: 'Geo-cerca', nombre: 'U.1 Oeste León', description: 'Salida de Geo-cerca' },
  { id: 3, gravedad: 'Medio', fecha: '31/01/2025 16:29:10', vehiculo: 'LEO06991', grupo: 'Norte León', conductor: 'Maria Lopez', tipo: 'Geo-cerca', nombre: 'U.2 Centro León', description: 'Entrada a Geo-cerca' },
  { id: 4, gravedad: 'Alto', fecha: '31/01/2025 16:30:25', vehiculo: 'LEO06992', grupo: 'Sur León', conductor: 'Luis Torres', tipo: 'Geo-cerca', nombre: 'U.3 Sur León', description: 'Aparcamiento fuera de zona' },
  { id: 5, gravedad: 'Bajo', fecha: '31/01/2025 16:32:10', vehiculo: 'LEO06993', grupo: 'Este León', conductor: 'Ana Martín', tipo: 'Geo-cerca', nombre: 'U.4 Este León', description: 'Entrada a Geo-cerca' },
  { id: 6, gravedad: 'Medio', fecha: '31/01/2025 16:34:00', vehiculo: 'LEO06994', grupo: 'Oeste León', conductor: 'Pedro Sánchez', tipo: 'Geo-cerca', nombre: 'U.5 Oeste León', description: 'Salida de Geo-cerca' },
  { id: 7, gravedad: 'Alto', fecha: '31/01/2025 16:35:45', vehiculo: 'LEO06995', grupo: 'Centro León', conductor: 'Laura García', tipo: 'Geo-cerca', nombre: 'U.6 Centro León', description: 'Entrada a Geo-cerca' },
  { id: 8, gravedad: 'Bajo', fecha: '31/01/2025 16:37:20', vehiculo: 'LEO06996', grupo: 'Norte León', conductor: 'Jorge Romero', tipo: 'Geo-cerca', nombre: 'U.7 Norte León', description: 'Salida de Geo-cerca' },
  { id: 9, gravedad: 'Medio', fecha: '31/01/2025 16:40:00', vehiculo: 'LEO06997', grupo: 'Este León', conductor: 'Isabel Ruiz', tipo: 'Geo-cerca', nombre: 'U.8 Este León', description: 'Entrada a Geo-cerca' },
  { id: 10, gravedad: 'Alto', fecha: '31/01/2025 16:42:25', vehiculo: 'LEO06998', grupo: 'Sur León', conductor: 'Ricardo Pérez', tipo: 'Geo-cerca', nombre: 'U.9 Sur León', description: 'Aparcamiento fuera de zona' },
  { id: 11, gravedad: 'Bajo', fecha: '31/01/2025 16:45:00', vehiculo: 'LEO06999', grupo: 'Oeste León', conductor: 'Felipe Díaz', tipo: 'Geo-cerca', nombre: 'U.10 Oeste León', description: 'Entrada a Geo-cerca' },
  { id: 12, gravedad: 'Medio', fecha: '31/01/2025 16:47:30', vehiculo: 'LEO07000', grupo: 'Norte León', conductor: 'Marta Sánchez', tipo: 'Geo-cerca', nombre: 'U.11 Norte León', description: 'Salida de Geo-cerca' },
  { id: 13, gravedad: 'Alto', fecha: '31/01/2025 16:50:00', vehiculo: 'LEO07001', grupo: 'Centro León', conductor: 'Eduardo Ramírez', tipo: 'Geo-cerca', nombre: 'U.12 Centro León', description: 'Entrada a Geo-cerca' },
  { id: 14, gravedad: 'Bajo', fecha: '31/01/2025 16:52:30', vehiculo: 'LEO07002', grupo: 'Este León', conductor: 'Claudia Ortega', tipo: 'Geo-cerca', nombre: 'U.13 Este León', description: 'Salida de Geo-cerca' },
  { id: 15, gravedad: 'Medio', fecha: '31/01/2025 16:55:00', vehiculo: 'LEO07003', grupo: 'Sur León', conductor: 'Antonio López', tipo: 'Geo-cerca', nombre: 'U.14 Sur León', description: 'Entrada a Geo-cerca' },
  { id: 16, gravedad: 'Alto', fecha: '31/01/2025 16:57:45', vehiculo: 'LEO07004', grupo: 'Oeste León', conductor: 'José Martínez', tipo: 'Geo-cerca', nombre: 'U.15 Oeste León', description: 'Aparcamiento fuera de zona' },
  { id: 17, gravedad: 'Bajo', fecha: '31/01/2025 17:00:00', vehiculo: 'LEO07005', grupo: 'Norte León', conductor: 'Verónica Castro', tipo: 'Geo-cerca', nombre: 'U.16 Norte León', description: 'Entrada a Geo-cerca' },
  { id: 18, gravedad: 'Medio', fecha: '31/01/2025 17:02:10', vehiculo: 'LEO07006', grupo: 'Centro León', conductor: 'Ricardo Torres', tipo: 'Geo-cerca', nombre: 'U.17 Centro León', description: 'Salida de Geo-cerca' },
  { id: 19, gravedad: 'Alto', fecha: '31/01/2025 17:05:00', vehiculo: 'LEO07007', grupo: 'Este León', conductor: 'Lucía Gómez', tipo: 'Geo-cerca', nombre: 'U.18 Este León', description: 'Entrada a Geo-cerca' },
  { id: 20, gravedad: 'Bajo', fecha: '31/01/2025 17:07:30', vehiculo: 'LEO07008', grupo: 'Sur León', conductor: 'Francisco Martínez', tipo: 'Geo-cerca', nombre: 'U.19 Sur León', description: 'Salida de Geo-cerca' },
];

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],

  imports: [
    CommonModule,
    NgChartsModule, // Importa ng-bootstrap aquí
    NgbdTableComplete, TranslateModule, SidebarComponent
  ],
    standalone: true
})
export class HomeComponent {

	navigateToHome() {
    this.router.navigate(['/RH']);
  }

  onSidebarToggled(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

	isDarkMode: boolean = false;
	
	title = 'ng2-charts-demo';
  
	public lineChartData: ChartConfiguration['data'] = {
	  labels: [
		'Exceso de velocidad',
		'Movimientos bruscos',
		'Eventos de alerta de vehículos',
		'Safety Frenado brusco (022g)',
		'Safety Exceso de velocidad',
		'Safety Giro brusco',
		'Safety Acelera...',
		'Safety Exceso velocidad',
		'Safety exceso de velocidad',
		'Safety Aceleracion brusca en curva',
	  ],
	
	  datasets: [
		{
		  data: [410590, 174731, 134732,124733,114734,104735,94736,84737, 74738, 64732 ],  // 🔹 Datos del eje Y (totales de eventos)
		
		  backgroundColor: ['#E4002B', '#E4002B', '#E4002B'],  // 🔹 Colores de cada barra
			borderColor: ['#F40009', '#F40009', '#F40009'],
			borderWidth: 1
		}
		
	  ]
	};
  
	public lineChartOptions: ChartOptions = {
	  responsive: true,
	  maintainAspectRatio: false, // Permite que se adapte al contenedor
	  scales: {
		x: {
		  ticks: {
			display: true // 🔹 Oculta los números del eje X
		  },
		  grid: {
			drawTicks: false // 🔹 Evita el espacio de los ticks
		  }
		},
		y: {
		  ticks: {
			display: false // 🔹 Oculta los números del eje Y
		  },
		  grid: {
			drawTicks: false // 🔹 Evita el espacio de los ticks
		  }
		}
	  },
	  plugins: {
		legend: {
			display: false,
		  },
		 
		title: {
		  display: true,
		  text: 'Total de alertas',  // 🔹 Aquí colocas el título
		  font: {
			size: 16,  // Tamaño de la fuente
			// weight: 'bold'
		  },
		  padding: 5
		},

    datalabels: {
      anchor: 'end', // Posiciona el texto en la parte superior de la barra
      align: 'top',  // Asegura que esté encima de la barra
      formatter: (value) => value, // Formato de los valores mostrados
      font: {
        size: 12,
        weight: 'bold',
      },
      color: '#000', // Color del texto
    },
	  },
	 
	};
	
	public lineChartLegend = true;

  countries = COUNTRIES;

   // Etiquetas para el gráfico
   public doughnutChartLabels: string[] = [
    'Alto',
    'Medio',
    'Bajo',
  ];

  public totalValue: number = 900;

  // Datos para el gráfico de severidad
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    
    datasets: [
		{
			data: [ 350, 450, 100 ],
			backgroundColor: [
			  '#E4002B', //rojo
			  //'#FFD66B', //naranja
			  '#FFDD66',
			  '#66D19B',
			  '#ffC0CB'
			],
			borderWidth: 2
		  },
    ],
    
    
  };

  
  // Tipo de gráfico
  public doughnutChartType: ChartType = 'doughnut';

  // Función para manejar los clics en el gráfico
  public chartClicked({
	event = {} as ChartEvent,  // Aseguramos que `event` sea siempre un ChartEvent
	active = [],
  }: {
	event?: ChartEvent;
	active?: object[];
  }): void {
	console.log(event, active);
  }
  // Función para manejar el hover sobre el gráfico
  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  // Definir las opciones del gráfico
  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Usamos 'as const' para asegurarnos de que el valor sea correcto
      },
      title: {
        display: true,
        text: 'Por Severidad',
        font: {
          size: 16,  // Tamaño de la fuente
          // weight: 'bold'
          },
        
      },
      tooltip: {
        enabled: true
      },
      datalabels: {
        display: true,
        color: '#fff'
      }
    },
  };

  // Crear un plugin personalizado para agregar el texto en el centro
  public chartPlugins = [{
    id: 'centerText',
    beforeDraw: (chart: any) => {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
      const fontSize = height / 10;

      // Establecer el estilo y el texto
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000'; // Color del texto

      // Dibujar el total en el centro
      ctx.fillText(this.totalValue.toString(), width / 2, height / 1.6);
    }
  }];

// Doughnut

  @ViewChild(NgbTooltip) tooltip!: NgbTooltip; // Usando el operador ! de TypeScript

  constructor(private translate: TranslateService, private router: Router, private darkModeService: DarkModeService) {
	Chart.register(ChartDataLabels);
    this.darkModeService.darkMode$.subscribe(mode => this.isDarkMode = mode);

    // this.darkModeService.darkMode$.subscribe(mode => this.isDarkMode = mode);


    // Configura el idioma por defecto y los idiomas soportados
    this.translate.setDefaultLang('en');
    this.translate.use('en');

  }

  // Método para cambiar el idioma
  switchLanguage(language: string) {
    this.translate.use(language);
  }  

 
  isSidebarCollapsed: boolean = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}