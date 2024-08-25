import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountingService {
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

    // Método para eliminar un usuario
    deleteAccount(accountId: number): Observable<any> {
        return this._httpClient.delete(`/api/accounting/${accountId}`).pipe(
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

    addAccount(account: any): Observable<any> {
        return this._httpClient.post('/api/accounting', account);
    }

    updateAccount(account: any): Observable<any> {
        return this._httpClient.put(`/api/accounting/${account.id}`, account);
    }
}
