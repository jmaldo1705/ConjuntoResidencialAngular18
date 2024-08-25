import { Component, Inject } from '@angular/core';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AccountingService } from 'app/modules/admin/accounting/accounting.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

export const MY_FORMATS = {
    parse: {
        dateInput: 'dd/MM/yyyy', // Formato de entrada
    },
    display: {
        dateInput: 'dd/MM/yyyy', // Formato de visualización
        monthYearLabel: 'MMM yyyy', // Formato del selector de mes y año
        dateA11yLabel: 'dd/MM/yyyy', // Formato de accesibilidad
        monthYearA11yLabel: 'MMMM yyyy', // Formato de accesibilidad del selector de mes y año
    },
};

@Component({
    selector: 'app-account-form',
    templateUrl: './addAccount.component.html',
    standalone: true,
    imports: [
        MatIcon,
        MatDialogContent,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        MatDialogActions,
        MatIconButton,
        MatDialogTitle,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Configura el locale a español
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class AddAccountComponent {
    accounting: any = {};  // Inicializa la cuenta como un objeto vacío
    action: string;

    constructor(
        public dialogRef: MatDialogRef<AddAccountComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private accountingService: AccountingService,  // Inyecta el servicio
        private dateAdapter: DateAdapter<Date>  // Inyecta el DateAdapter
    ) {
        this.dateAdapter.setLocale('es-ES');  // Establece el locale a español
        this.action = data.action;  // 'add' o 'edit'
        this.accounting = data.account || {};  // Si es agregar, inicia con un objeto vacío
        this.accounting.fecha = this.accounting.fecha || new Date();  // Inicializa con la fecha actual si no hay valor
    }

    save(): void {
        if (this.action === 'add') {
            this.addAccount();
        } else if (this.action === 'edit') {
            this.updateAccount();
        }
    }

    close(): void {
        this.dialogRef.close();  // Cierra el diálogo
    }

    private addAccount(): void {
        this.accountingService.addAccount(this.accounting).subscribe(response => {
            this.dialogRef.close(response);  // Cierra el diálogo y envía los datos de vuelta
        });
    }

    private updateAccount(): void {
        this.accountingService.updateAccount(this.accounting).subscribe(response => {
            this.dialogRef.close(response);  // Cierra el diálogo y envía los datos de vuelta
        });
    }
}
