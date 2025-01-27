import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders ({'Content-Type': 'application/json' })};

  constructor(
    private http: HttpClient
  ) { }

  getUser(id: any){
    return new Promise((accept, reject) => {
      this.http.get(`${this.urlServer}/current_user/${id}`, this.httpHeaders).subscribe(
        (data: any)=>{
            accept(data);
          },
        (error) => {
          console.log(error);
          if (error.status == 500){
            reject('Error, Porfavor intentar mas tarde');
          }else{
            reject('Error al obtener datos de usuario')
          }
        }
      )
    })
  }

  updateUser(user: any){
    const user_params= {
      user: user
    }
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/update/${user.id}`, user_params, this.httpHeaders).subscribe(
        (data: any)=>{
            accept(data);
          },
        (error) => {
          console.log(error);
          if (error.status == 500){
            reject('Error, Porfavor intentar mas tarde');
          }else{
            reject('Error al obtener datos de usuario')
          }
        }
      )
    })
  }
}
