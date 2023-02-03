import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  @Input() thereLog!:boolean;

  userLogged = this.authService.getUserLogged();
  disabled: boolean = false;
  

  constructor(private authService: ServiceService, private route: Router) {}

  ngOnInit(): void {
    this.traerdatos();
    this.thereLog = false
   
    
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
    console.log(this.thereLog)
    this.route.navigate(['login']);
  }

   logout(){
    this.authService.logout()
    .then(()=>{
      this.thereLog = false
      console.log(this.thereLog)
      this.route.navigate(['/login']);
      
    })
    .catch(error => console.log(error));
  }



  
}
