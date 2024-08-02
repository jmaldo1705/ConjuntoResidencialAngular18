import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UsersComponent } from 'app/modules/admin/users/users.component';
import { UsersService } from 'app/modules/admin/users/users.service';
import { InventoryListComponent } from 'app/modules/admin/users/list/users.component';

export default [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
    },
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '',
                component: InventoryListComponent,
                resolve: {
                    brands: () => inject(UsersService).getBrands(),
                    categories: () => inject(UsersService).getCategories(),
                    products: () => inject(UsersService).getProducts(),
                    tags: () => inject(UsersService).getTags(),
                    vendors: () => inject(UsersService).getVendors(),
                },
            },
        ],
    },
] as Routes;
