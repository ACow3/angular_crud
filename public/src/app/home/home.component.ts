import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks(){
    this._httpService.getTasks().subscribe( data => {
      console.log("Successfully got all tasks", data)
      this.tasks = data['tasks']
    })
  }

  deleteOneTask(id){
    this._httpService.deleteOneTask(id).subscribe( data => {
      console.log("Task deleted")
      this.getAllTasks();
    })
  }
}