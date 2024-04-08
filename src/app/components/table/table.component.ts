import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Users } from 'src/app/user.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit{

  url: string = 'https://jsonplaceholder.typicode.com/users'
  fakeUrl: string = 'http://localhost:3000/users'
  userValue1: Array<any> = [];
  userValue2: Array<any> = [];
  utente: any;
  userForm: FormGroup;
  listData: any;
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 5, 9, 12];
  fileName: any;
  data: any;
  finalValue: Array<any> = [];
  isError: boolean= false;
  

  constructor(private dataUser: DataService, private http: HttpClient, private fb: FormBuilder){
    

    this.userForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
      })
    
    //Sto usando il metodo getAllUsers, che si trova nel service, per far si che userValue sia uguale al parametro response per pubblicare i dati
    
    
  }


  ngOnInit(): void {
  this.onGetUser()
  
}

  //Metodo che si attiva premendo il button
  addItem(mockUrl:string): void{
    //Se l'array risulta vuoto non invierà dati al database
    if (this.userForm.invalid) {
      this.isError = true;
      return;
    }
    //Dopo aver inserito i dati
    this.finalValue.push(this.userForm.value);
    this.dataUser.postData(this.userForm.value).subscribe((response)=>{
      this.isError = false;
      console.log(response)
    },
    error => {
      this.isError = true;
      return;
    }
    );
    console.log(this.finalValue);
    localStorage.setItem('user',JSON.stringify(this.finalValue))
    this.userForm.reset();
    
  }


  //Metodo per mostrare i dati presenti nell'array userValue1 che si trovano in db.json
  //
  async onGetUser(){
  await this.dataUser.getAllUsers().subscribe(
     async (response)=>{
        this.userValue1 = response;
        console.log('uservalue1', this.userValue1)
        await this.onGetData()
    });
    }
    
  

  onGetData(){
    this.dataUser.getAllData().subscribe(
      (response)=>{
        this.userValue2 = response;
        this.unionValue()
        console.log(this.userValue2)
        return this.userValue2;
        
    });
  }

  unionValue(){
  //Metodo per l'unione dei dati dei due array
  for (let user of this.userValue1) {
    this.finalValue.push(user);
  }
    for (let user of this.userValue2) {
      this.finalValue.push(user);
    }
    console.log(this.finalValue);
  }
  
  onUpdateItem(id: any, newData: any){
    this.dataUser.updateData(id, newData).subscribe(
      (response)=>{
        id = Math.floor(Math.random() * 1000); // Genera un ID casuale compreso tra 0 e 999
        newData = { name: 'jijj', email: 'nuova@email.com' }; // Dati casuali per la modifica
        console.log(response)
      }
    )
  }

  onDeleteData(id: any) {
    this.dataUser.deleteData(id).subscribe(
      (response) =>{
        console.log("Dati eliminati")
      }
    )
  }


  getViewProfile(Users: any){
    console.log(Users);
  }

  //Metodo per cambiare la pagina della tabella
  onTableDataChange(event: any) {
    this.page = event;
    this.finalValue;
  }

  //Metodo per ingrandire la tabella
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.finalValue;
  }

  
  //Metodo con cui puoi resettare i dati prima di inviarli 
  reset(){
    this.userForm.reset();
  }

 


  
  

}

