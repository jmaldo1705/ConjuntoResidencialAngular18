import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AccountingComponent } from './accounting.component';
import { AccountingService } from './accounting.service';


export default [
    {
        path     : '',
        component: AccountingComponent,
        resolve: {
            data: () => inject(AccountingService).getData(),
        },
    },
] as Routes;
