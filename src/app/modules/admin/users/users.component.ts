import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from 'app/modules/admin/users/users.service';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add/addUser.component';

function getSpanishPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    paginatorIntl.nextPageLabel = 'Página siguiente';
    paginatorIntl.previousPageLabel = 'Página anterior';
    paginatorIntl.firstPageLabel = 'Primera página';
    paginatorIntl.lastPageLabel = 'Última página';

    paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 de ${length}`;
        }
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
    };

    return paginatorIntl;
}


@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        NgApexchartsModule,
        MatTableModule,
        MatSortModule,
        NgClass,
        MatProgressBarModule,
        CurrencyPipe,
        DatePipe,
        MatFormField,
        ReactiveFormsModule,
        MatInput,
        MatPaginator,
    ],
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    searchInputControl = new FormControl();
    isLoading: boolean = false;
    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    usersTableColumns: string[] = [
        'nombre',
        'tipoDocumento',
        'numeroDocumento',
        'correo',
        'apartamento',
        'torre',
        'rol',
        'estado',
        'acciones',
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private usersService: UsersService, private dialog: MatDialog) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the data
        this.usersService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                // Store the data
                this.data = data;

                // Store the table data
                this.recentTransactionsDataSource.data =
                    data.users;

            });
        // Refrescar los datos al iniciar
        this.usersService.refreshData();
        this.recentTransactionsDataSource.paginator = this.paginator;
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        // Agrega el ordenamiento
        this.recentTransactionsDataSource.sort = this.sort;
        //Conectar la paginación
        this.recentTransactionsDataSource.paginator = this.paginator;
        //Conectar el buscador
        this.searchInputControl.valueChanges
            .pipe(debounceTime(300)) // Espera 300 ms después de que el usuario deje de escribir
            .subscribe(value => {
                this.recentTransactionsDataSource.filter = value.trim().toLowerCase();
            });
        // Configurar la función de filtro
        this.recentTransactionsDataSource.filterPredicate = (data, filter) => {
            const dataStr = Object.values(data).join(' ').toLowerCase();
            return dataStr.includes(filter);
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    openDialog(action: string, user?: any): void {
        const dialogRef = this.dialog.open(AddUserComponent, {
            width: '90%',
            maxWidth: '1200px',
            data: { action, user }, // Enviamos los datos al dialog
            panelClass: 'custom-dialog-container' // Clase personalizada para estilos adicionales
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.usersService.refreshData(); // Suponiendo que tienes un método para refrescar los datos
            }
        });
    }

    editUser(user: any): void {
        this.openDialog('edit', user);
    }

    addUser(): void {
        this.openDialog('add');
    }

    deleteUser(user: any): void {
        this.usersService.deleteUser(user.id).subscribe({
            next: () => console.log('Usuario eliminado correctamente'),
            error: (err) => console.error('Error al eliminar el usuario', err)
        });
    }
}
