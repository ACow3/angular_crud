import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  newTask = {
    'title': "",
    'description': "",
    'completed': ""
  }
  taskError = {
    'title': "",
    'description': "",
    'completed': ""
  };
  constructor(private _httpService: HttpService, private _router: Router) { }
  ngOnInit() {
  }
  onSubmit() {
    this._httpService.newTask(this.newTask).subscribe(data => {
      console.log(data)
      this.taskError = {
        'title': "",
        'description': "",
        'completed': ""
      };

      if (data['Message'] == "Error") {
        console.log("There was an error creating a new task")
        if (data['error']['errors']['completed']) {
          this.taskError['completed'] = data['error']['errors']['completed']['message']
        }
        if (data['error']['errors']['description']) {
          this.taskError['description'] = data['error']['errors']['description']['message']
        }
        if (data['error']['errors']['title']) {
          this.taskError['title'] = data['error']['errors']['title']['message']
        }
      } else {
        console.log("Success")
        this.newTask = {
          'title': "",
          'description': "",
          'completed': ""
        }
        this.goHome();
      }
    })
  }
  goHome(){
    this._router.navigate(['/home']);
  }
}
