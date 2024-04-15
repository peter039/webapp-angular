import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) { }

  url: string = 'https://jsonplaceholder.typicode.com/users'
  fakeUrl: string = 'http://localhost:3000/users'


  //Metodo per mostrare tutti i dati in db.json
  getAllUsers() :Observable<any>{ 
    return this.http.get(this.url)
  }

  //Metodo per mostrare i dati tramite l'id del singolo utente (Aggiungere barra laterale nel mezzo)
  getUser(id: any):Observable<any> {
    return this.http.get(`${this.url}/${id}`)
  }

  //Metodo per mostrare i dati del falso database fakedb.json
  getAllData(): Observable<any> {
    return this.http.get(`${this.fakeUrl}`)
  }
  
  //Metodo per inviare i dati al falso database fakedb.json
  postData(data:any): Observable<any> {
    return this.http.post(`${this.fakeUrl}`, data)
  
  }

  //Metodo per cancellare i dati del falso database
  deleteData(id:number){
    return this.http.delete(`${this.fakeUrl}/${id}`)
  }
   

}
