import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  constructor(public authService: ServiceService, private route: Router, private afAuth: AngularFireAuth,) {}
  

  ngOnInit(): void {
    this.traerdatos();
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

  logout() {
    this.afAuth.signOut().then(()=>{
      this.route.navigate(['']);
    })
  }


}
