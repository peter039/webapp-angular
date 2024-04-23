import { Component, Input, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{


id: string = "";
user: Users = new Users;

constructor(private data: DataService, private activateRoute: ActivatedRoute){}


  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => this.id = params['id']);
    console.log(this.activateRoute.snapshot.params['id'])
    this.data.getUser(this.id)
    .subscribe((response)=> {
    console.log(response);
    this.user = response
})

  }




}