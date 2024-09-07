import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ResidentsComponent } from './residents.component';
import { ResidentsService } from './residents.service';


export default [
    {
        path     : '',
        component: ResidentsComponent,
        resolve: {
            data: () => inject(ResidentsService).getData(),
        },
    },
] as Routes;
