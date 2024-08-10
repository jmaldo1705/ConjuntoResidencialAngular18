import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';


export default [
    {
        path     : '',
        component: UsersComponent,
        resolve: {
            data: () => inject(UsersService).getData(),
        },
    },
] as Routes;
