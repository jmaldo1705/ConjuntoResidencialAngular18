import { Component, OnInit } from '@angular/core';
import { ColumnDefinition, dataTableComponent } from '../dataTable/dataTable.component';

@Component({
    selector: 'units',
    templateUrl: './units.component.html',
    standalone: true,
    imports: [
        dataTableComponent,
    ],
})

export class UnitsComponent implements OnInit {
    data = [
        {
            unidadHabitacional: '2-907',
            tipo: 'Apartamento',
            habitaciones: '3',
            banios: '2',
            tamanio: '82',
            estado: 'Ocupado',
            residente: 'Jonathan Maldonado',
            propietario: 'Jonathan Maldonado',
        },
        {
            unidadHabitacional: 'Casa 2',
            tipo: 'Casa',
            habitaciones: '4',
            banios: '3',
            tamanio: '120',
            estado: 'Ocupado',
            residente: 'Fulanito de Tal',
            propietario: 'Juan Pérez',
        },
    ];

    columns: ColumnDefinition[] = [
        { key: 'unidadHabitacional', header: 'Unidad habitacional' },
        { key: 'tipo', header: 'Tipo' },
        { key: 'habitaciones', header: 'Habitaciones' },
        { key: 'banios', header: 'Baños' },
        {
            key: 'tamanio',
            header: 'Tamaño',
            displayFn: (element) => `${element.tamanio} m²`
        },
        { key: 'estado', header: 'Estado' },
        { key: 'residente', header: 'Residente' },
        { key: 'propietario', header: 'Propietario' },
        // 'acciones' se añadirá automáticamente en displayedColumns
    ];

    displayedColumns = this.columns.map(c => c.key).concat(['acciones']);

    title = 'Unidades Residenciales';
    isLoading = false;


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    addUnit(): void {
        //this.openDialog('add');
    }

    editUnit(user: any): void {
        //this.openDialog('edit', user);
    }

    deleteUnit(user: any): void {
        /*this.residentsService.deleteResident(user.id).subscribe({
            next: () => console.log('Usuario eliminado correctamente'),
            error: (err) => console.error('Error al eliminar el usuario', err)
        });*/
    }

    viewUnit(user: any){

    }
}
