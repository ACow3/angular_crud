import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getTasks(){
    return this._http.get('./tasks')
  }

  newTask(task){
    return this._http.post('/tasks/new', task)
  }

  deleteOneTask(id){
    return this._http.delete('/tasks/'+id)    // Alternate way of concatening id: (`/tasks/${id}`)
  }

  getTask(id){
    return this._http.get('/tasks/'+id)     // Alternate way of concatening id: (`/tasks/${id}`)
  }

  editTask(task){
    return this._http.put(`/tasks/${task._id}`, task)    // vs. ('/tasks/'+id, task) <-- Original concatenation
  }
}