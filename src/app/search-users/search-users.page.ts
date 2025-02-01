import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
  standalone: false, 
})
export class SearchUsersPage implements OnInit {
  users: any[] = [];
  page: number = 1;
  limit: number = 10; 
  query: string = '';
  hasMoreUsers: boolean = true;
  current_user: any;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers(event?: any){
    this.isLoading = true;
    this.current_user = await this.storage.get('user');
    const followingUers = this.current_user.followees || [];
    console.log('following Uerd', followingUers);
    this.userService.listUsers(this.page, this.limit, this.query).then(
      (data: any) => {
        if (Array.isArray(data.users) && data.users.length > 0){
          const updateUsers = data.users.map((user: any) => ({
            ...user, 
            is_following: followingUers.some((followedUser: any) => followedUser.id == user.id),
           
          }));
          this.users = [...this.users, ...updateUsers];
          console.log('users', this.users);
          this.page++;
        }else{
          this.hasMoreUsers = false;
        }
        if(event){
          event.target.complete();
        }
        this.isLoading = false;
      }
    ).catch(
      (error) => {
        console.log(error, 'error de peticion');
        this.isLoading = false;
        event.target.complete();
      }
    );
  }

  searchUsers(event?: any){
    console.log('busqueda de usuario');
     this.query = event.target.value || '';
     this.page = 1;
     this.users = [];
     this.hasMoreUsers = true;
     this.loadUsers();
  }

  follow(followee_id: any){
    console.log('follow', followee_id);
    const user_id = this.current_user.id;
    this.userService.followUser(user_id, followee_id).then(
      (data: any)=>{
        console.log(data);
        this.users = this.users.map((user: any) =>{
          if (user.id == followee_id){
            return{
              ...user,
              is_following: true
            }
          }
          return user;
        })
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  unfollow(followee_id: any){
    console.log('unfollow', followee_id);
    const user_id = this.current_user.id;
    this.userService.unfollowUser(user_id, followee_id).then(
      (data: any)=>{
        console.log(data);
        this.users = this.users.map((user: any) =>{
          if (user.id == followee_id){
            return{
              ...user,
              is_following: false
            }
          }
          return user;
        })
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  togglefollow(user:any){
    if(user.is_following){
      this.unfollow(user.id);
    }else{
      this.follow(user.id);
    }
  }

}
