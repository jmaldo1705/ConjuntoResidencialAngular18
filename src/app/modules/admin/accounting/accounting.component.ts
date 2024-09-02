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
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddAccountComponent } from './add/addAccount.component';
import { AccountingService } from './accounting.service';

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
    selector: 'accounting',
    templateUrl: './accounting.component.html',
    styleUrls: ['./accounting.component.scss'],
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
export class AccountingComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    searchInputControl = new FormControl();
    isLoading: boolean = false;
    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    accountingTableColumns: string[] = [
        'fecha',
        'descripcion',
        'tipo',
        'categoria',
        'monto',
        'estado',
        'acciones',
    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private accountingService: AccountingService, private dialog: MatDialog) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the data
        this.accountingService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                // Store the data
                this.data = data;

                // Store the table data
                this.recentTransactionsDataSource.data =
                    data.accounting;

                // Prepare the chart data
                this._prepareChartData();
            });
        // Refrescar los datos al iniciar
        this.accountingService.refreshData();
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

    openDialog(action: string, account?: any): void {
        const dialogRef = this.dialog.open(AddAccountComponent, {
            width: '90%',
            maxWidth: '1200px',
            data: { action, account }, // Enviamos los datos al dialog
            panelClass: 'custom-dialog-container' // Clase personalizada para estilos adicionales
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.accountingService.refreshData(); // Suponiendo que tienes un método para refrescar los datos
            }
        });
    }

    editAccount(account: any): void {
        this.openDialog('edit', account);
    }

    addAccount(): void {
        this.openDialog('add');
    }

    deleteAccount(account: any): void {
        this.accountingService.deleteAccount(account.id).subscribe({
            next: () => console.log('Cuenta eliminada correctamente'),
            error: (err) => console.error('Error al eliminar la cuenta', err)
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void {
        // Account balance
        this.accountBalanceOptions = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                width: '100%',
                height: '100%',
                type: 'area',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#A3BFFA', '#667EEA'],
            fill: {
                colors: ['#CED9FB', '#AECDFD'],
                opacity: 0.5,
                type: 'solid',
            },
            series: this.data.accountBalance.series,
            stroke: {
                curve: 'straight',
                width: 2,
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
                x: {
                    format: 'dd MMM, yyyy',
                },
                y: {
                    formatter: (value): string => value + '%',
                },
            },
            xaxis: {
                type: 'datetime',
            },
        };
    }
}
