import { Component, Inject } from '@angular/core';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput, MatLabel } from '@angular/material/input';
import { UsersService } from 'app/modules/admin/users/users.service';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
    selector: 'app-user-form',
    templateUrl: './addUnit.component.html',
    styleUrls: ['./addUnit.component.scss'],
    standalone: true,
    imports: [
        MatIcon,
        MatDialogContent,
        MatFormField,
        FormsModule,
        MatButton,
        MatDialogActions,
        MatIconButton,
        MatDialogTitle,
        MatInput,
        MatLabel,
        MatSelect,
        MatOption,
    ],
})
export class AddUnitComponent {
    resident: any = {};  // Inicializa el usuario como un objeto vacío
    action: string;

    constructor(
        public dialogRef: MatDialogRef<AddUnitComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UsersService  // Inyecta el servicio de usuarios
    ) {
        this.action = data.action;  // 'add' o 'edit'
        this.resident = data.residents || {};  // Si es agregar, inicia con un objeto vacío
    }

    save(): void {
        if (this.action === 'add') {
            // Lógica para agregar un nuevo usuario
            this.addUser();
        } else if (this.action === 'edit') {
            // Lógica para editar un usuario existente
            this.updateUser();
        }
    }

    close(): void {
        this.dialogRef.close();  // Cierra el diálogo
    }

    // Método para agregar un nuevo usuario
    private addUser(): void {
        this.userService.addUser(this.resident).subscribe(response => {
            this.dialogRef.close(response);  // Cierra el diálogo y envía los datos de vuelta
        });
    }

    // Método para actualizar un usuario existente
    private updateUser(): void {
        this.userService.updateUser(this.resident).subscribe(response => {
            this.dialogRef.close(response);  // Cierra el diálogo y envía los datos de vuelta
        });
    }
}
