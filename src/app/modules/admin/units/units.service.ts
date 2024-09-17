import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnitsService {
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any> {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // Método para refrescar los datos
    refreshData(): void {
        this.getData().subscribe(); // Hacer la solicitud y actualizar la data
    }

    // Método para eliminar
    deleteResident(userId: number): Observable<any> {
        return this._httpClient.delete(`/api/residents/${userId}`).pipe(
            tap(() => {
                this.refreshData(); // Refrescar los datos después de eliminar un usuario
            })
        );
    }

    /**
     * Get data
     */
    getData(): Observable<any> {
        return this._httpClient.get('api/dashboards/finance').pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
    }

    addResident(user: any): Observable<any> {
        return this._httpClient.post('/api/users', user);
    }

    updateResident(user: any): Observable<any> {
        return this._httpClient.put(`/api/users/${user.id}`, user);
    }
}
