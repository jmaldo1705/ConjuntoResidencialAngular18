import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get('/api/users');
    }

    addUser(user: any): Observable<any> {
        return this.http.post('/api/users', user);
    }

    updateUser(id: number, user: any): Observable<any> {
        return this.http.put(`/api/users/${id}`, user);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`/api/users/${id}`);
    }
}
