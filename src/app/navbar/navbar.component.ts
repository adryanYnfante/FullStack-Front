import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userLogged = this.authService.getUserLogged();
  disabled: boolean = false;
  photoURL:any;
  
  constructor(public authService: ServiceService, private route: Router) {}

  ngOnInit(): void {
    this.traerdatos();
    this.getphotoURL();
    
   
    
  }
  

  traerdatos() {
    this.userLogged.subscribe((value) => {    
      if (value?.email == undefined) {
        this.disabled = true; 
               
      } else {
        this.disabled = false;   
      
      }
    });
  }

  login() {
    this.route.navigate(['login']);
  }

  logOut() {
    this.authService.logOut()
      .then(() => {
      })
      .catch(error => console.log(error));
  }

  getphotoURL(){
    this.userLogged.subscribe(x=>{ this.photoURL= x?.photoURL
    })
  }

}
