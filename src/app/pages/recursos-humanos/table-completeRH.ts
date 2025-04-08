import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { TableRH } from './tableRH';
import { CountryServiceRH } from './table.serviceRH';
import { NgbdSortableHeader, SortEvent } from './sortable.directiveRH';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';

import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
	selector: 'ngbd-table-completeRH',
	imports: [DecimalPipe, FormsModule, AsyncPipe, NgbHighlight, NgbdSortableHeader, NgbPaginationModule, CommonModule, NgbDatepickerModule, NgbAlertModule, FormsModule ],
	templateUrl: './table-completeRH.html',
	providers: [CountryServiceRH, DecimalPipe],
})
export class NgbdTableCompleteRH {
	countries$: Observable<TableRH[]>;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

	constructor(public service: CountryServiceRH) {
		this.countries$ = service.rhs$;
		this.total$ = service.total$;
	}

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}


	selectedStep = 0; // Almacena el paso actual
	progress = 0; // Barra de progreso
	steps = [
	  { title: '1.Datos del Operador', content: 'Contenido del primer paso...' },
	  { title: '2.Información de Certificación', content: 'Contenido del segundo paso...' },
	  { title: '3.Detalles del Vehículo', content: 'Contenido del tercer paso...' },
	  { title: '4.Licencia de Conducir', content: 'Contenido del cuarto paso...' },
	  { title: '5.Historial y Usuarios Responsables', content: 'Contenido del cuarto paso...' },
	];
  
	// Seleccionar paso manualmente
	selectStep(stepIndex: number): void {
	  this.selectedStep = stepIndex;
	  this.updateProgress();
	}
  
	// Ir al siguiente paso
	nextStep(): void {
	  if (this.selectedStep < this.steps.length - 1) {
		this.selectedStep++;
		this.updateProgress();
	  }
	}
  
	// Finalizar flujo de pasos
	finishStep(): void {
	  alert('¡Proceso completado!');
	}
  
	// Actualizar la barra de progreso
	private updateProgress(): void {
	  this.progress = (this.selectedStep + 1) * (100 / this.steps.length);
	}



	 // Modelo de datos para el formulario
	 model = {
		fullName: '',
		idAser: null,
		idColaborador: null,
		zona: '',
		region: '',
		unidadOperativa: '',
		photo: null
	  };
	
	  // Opciones para las zonas, regiones y unidades operativas
	  zones = ['Zona VDM', 'Zona Norte', 'Zona Sur'];
	 // Definir una firma de índice para los objetos
	 regions: { [key: string]: string[] } = {
		'Zona VDM': ['Región 1', 'Región 2'],
		'Zona Norte': ['Región 3', 'Región 4'],
		'Zona Sur': ['Región 5', 'Región 6'],
	  };
	  unidadesOperativas: { [key: string]: string[] } = {
		'Región 1': ['Unidad A', 'Unidad B'],
		'Región 2': ['Unidad C', 'Unidad D'],
		// Agrega las demás regiones y unidades
	  };
	
	  selectedZone: string = '';
	  selectedRegion: string = '';
	  selectedUnidadOperativa: string = '';
	
	  // Funciones para manejar la selección
	  onZoneSelect(zone: string) {
		this.selectedZone = zone;
		this.selectedRegion = '';
		this.selectedUnidadOperativa = '';
	  }
	
	  onRegionSelect(region: string) {
		this.selectedRegion = region;
		this.selectedUnidadOperativa = '';
	  }
	
	  onUnidadOperativaSelect(unidad: string) {
		this.selectedUnidadOperativa = unidad;
	  }
	  fileName: string = '';

	  onFileChange(event: any) {
		const file = event.target.files[0];
		if (file) {
		  this.model.photo = file;
		  this.fileName = file.name; // Actualiza el nombre mostrado
		} else {
		  this.fileName = '';
		}
	  }
	  
	  
	
	  onSubmit(form: any) {
		if (form.valid) {
		  console.log(this.model);
		}
	  }


	selectedItems: any[] = [];

	toggleSelection(event: Event, item: any) {
	const isChecked = (event.target as HTMLInputElement).checked;
	if (isChecked) {
		this.selectedItems.push(item);
	} else {
		this.selectedItems = this.selectedItems.filter((selected) => selected !== item);
	}
	}

	deleteSelectedItems() {
		// Aquí puedes implementar la lógica para eliminar los seleccionados
		console.log('Eliminando registros:', this.selectedItems);
		this.selectedItems = []; // Limpia la selección después de eliminar
		
	}
	  
}
