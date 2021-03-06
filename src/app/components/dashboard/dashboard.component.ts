import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import {AuthOdooService} from 'src/app/services/auth-odoo.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario:UsuarioModel;
  usuario$: Observable<UsuarioModel>;
  task:TaskModel;
  tasksList:TaskModel[];
  tasksList$:Observable<TaskModel[]>;

  constructor(private _taskOdoo:TaskOdooService,
              private _authOdoo:AuthOdooService) {
    
    this.usuario = this._authOdoo.getUser();
    
    if(this.usuario.type == "client"){
      this._taskOdoo.requestTaskListClient();
    }else if(this.usuario.type == "provider"){
      this._taskOdoo.requestTaskListProvider();
    }
    
    setInterval(()=>{
      if(this.usuario.type == "client"){
        this._taskOdoo.requestTaskListClient();
      }else if(this.usuario.type == "provider"){
        this._taskOdoo.requestTaskListProvider();
      }

    },10000);
  }

  ngOnInit(): void {
    this.tasksList$ = this._taskOdoo.getRequestedTaskList$();
    this.tasksList$.subscribe(tasksList =>{
      this.tasksList = tasksList;
      console.log(this.tasksList);
    });
  }
}
