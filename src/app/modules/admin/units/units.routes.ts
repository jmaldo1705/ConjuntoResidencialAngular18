import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UnitsComponent } from './units.component';
import { UnitsService } from './units.service';


export default [
    {
        path     : '',
        component: UnitsComponent,
        resolve: {
            data: () => inject(UnitsService).getData(),
        },
    },
] as Routes;
