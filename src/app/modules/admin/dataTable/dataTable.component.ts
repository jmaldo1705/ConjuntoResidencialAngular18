import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable,
    MatTableDataSource,
} from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'data-table',
    templateUrl: './dataTable.component.html',
    styleUrls: ['./dataTable.component.scss'],
    standalone: true,
    providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
    imports: [
        MatProgressBar,
        MatFormField,
        MatIcon,
        MatTable,
        MatColumnDef,
        MatSortHeader,
        MatHeaderCell,
        MatCell,
        MatSort,
        MatHeaderRow,
        MatRow,
        MatPaginator,
        ReactiveFormsModule,
        MatInput,
        MatButton,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
    ],
})
export class dataTableComponent implements OnInit, AfterViewInit {
    // Inputs para personalizar el componente
    @Input() data: any[] = [];
    @Input() columns: ColumnDefinition[] = [];
    @Input() displayedColumns: string[] = [];
    @Input() title: string = '';
    @Input() isLoading: boolean = false;
    @Input() pageSizeOptions: number[] = [5, 10, 20];
    @Input() pageSize: number = 5;
    @Input() filterPlaceholder: string = 'Buscar';
    @Input() addButtonLabel: string = 'Agregar';
    @Input() showAddButton: boolean = true;
    @Input() addButtonIcon: string = 'heroicons_outline:plus';

    // Outputs para manejar eventos
    @Output() add = new EventEmitter<void>();
    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
    @Output() view = new EventEmitter<any>();

    dataSource: MatTableDataSource<any>;
    searchInputControl = new FormControl('');

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.data);
    }

    ngAfterViewInit(): void {
        // Configurar ordenamiento y paginación
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        // Configurar buscador con debounce
        this.searchInputControl.valueChanges
            .pipe(debounceTime(300))
            .subscribe(value => {
                this.dataSource.filter = value.trim().toLowerCase();
            });

        // Configurar función de filtro
        this.dataSource.filterPredicate = (data, filter) => {
            const dataStr = Object.values(data).join(' ').toLowerCase();
            return dataStr.includes(filter);
        };
    }

    trackByFn(index: number, item: any) {
        return item.id || index;
    }

    // Métodos para emitir eventos
    onAdd() {
        this.add.emit();
    }

    onEdit(item: any) {
        this.edit.emit(item);
    }

    onDelete(item: any) {
        this.delete.emit(item);
    }

    onView(item: any) {
        this.view.emit(item);
    }
}

// Definición de la interfaz para las columnas
export interface ColumnDefinition {
    key: string;
    header: string;
    sortable?: boolean;
    displayFn?: (element: any) => string;
}

// Función para configurar el paginador en español
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
        const endIndex = Math.min(startIndex + pageSize, length);
        return `${startIndex + 1} - ${endIndex} de ${length}`;
    };

    return paginatorIntl;
}
