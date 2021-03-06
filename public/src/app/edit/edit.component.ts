import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  taskId;
  task = {
    "title": "",
    "description": "",
    "completed": ""
  }
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.taskId = params['id']
    });
    this.getOneTask()
  }

  getOneTask() {
    this._httpService.getTask(this.taskId).subscribe(data => {
      console.log("Got one task: ", data)
      this.task = data['task']
    })
  }

  onSubmit(){
    this._httpService.editTask(this.task).subscribe( data => {
      console.log("Task updated: ", data)
    })
    this._router.navigate(['/home']);
  }

}
