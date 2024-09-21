/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/home'
    },
    {
        id   : 'users',
        title: 'Usuarios',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : '/users'
    },
    {
        id   : 'units',
        title: 'Unidadaes Residenciales',
        type : 'basic',
        icon : 'heroicons_outline:building-office-2',
        link : '/units'
    },
    {
        id   : 'accounting',
        title: 'Contabilidad',
        type : 'basic',
        icon : 'heroicons_outline:book-open',
        link : '/accounting'
    },
    {
        id   : 'reservations',
        title: 'Reservas',
        type : 'basic',
        icon : 'heroicons_outline:rectangle-stack',
        link : '/reservations'
    },
    {
        id   : 'documents',
        title: 'Documentos',
        type : 'basic',
        icon : 'heroicons_outline:document',
        link : '/documents'
    },
    {
        id   : 'visitors',
        title: 'Visitantes',
        type : 'basic',
        icon : 'heroicons_outline:user-group',
        link : '/visitors'
    },
    {
        id   : 'parking',
        title: 'Parqueadero',
        type : 'basic',
        icon : 'heroicons_outline:rectangle-group',
        link : '/parking'
    },
    {
        id   : 'parking',
        title: 'Gestión de Personal',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : '/parking'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
