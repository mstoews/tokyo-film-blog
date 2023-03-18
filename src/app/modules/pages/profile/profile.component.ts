import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { catchError, first, throwError } from 'rxjs';
import { ProfileModel } from 'app/models/profile';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private userId: string;
  public isRegistered: boolean = true;
  public displayName: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private http: HttpClient
  ) {
    this.userId = authService.userId;
    this.authService.isLoggedIn$.subscribe((loggedin) => {
      console.debug('Subscribed is logged in: ', loggedin);
    });
  }

  addAdminUser(email: string, password: string) {
    
    const api = environment.api.baseUrl + '/api/addAdminToRole';
    
    this.http
      .post(api, {
        email: email,
        password: password,
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          alert('Could not update User to Admin');
          return throwError(() => new Error());
        })
      ).subscribe((user) => {
        console.log('Admin updated ... ', user);
      });
  }

  addUserByFunction() {
    const api = environment.api.baseUrl + '/api/addAdminToRole'
    this.http
      .post(api, {
        email: 'cassandra_harada@hotmail.com',
        password: 'secret123',
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          alert('Could not update User to Admin');
          return throwError(() => new Error());
        })
      )
      .subscribe((user) => {
        console.log('Admin updated ... ', user);
      });
  }

  ngOnInit() {
    let currentUser: any;

   // this.addUserByFunction();
    
    this.afAuth.currentUser
      .then((user) => {
        if (user !== null || user !== undefined) {
          if (user.isAnonymous !== null) {
            if (user.isAnonymous === true) {
              this.isRegistered = false;
              console.log(
                `this user : ${this.userId} is registered ? : ${this.isRegistered}`
              );
            }
          }
          this.updateProfile(user.uid);
        }
      })
      .catch((error) => {
        console.log('unable to get correct user ');
      });
  }

  backToHome() {
    this.router.navigate(['home']);
  }

  updateProfile(userId: string) {}
}
