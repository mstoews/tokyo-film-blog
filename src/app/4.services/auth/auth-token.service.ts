import {Injectable} from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
    providedIn: "root"
})
export class AuthTokenService {

    authJwtToken:string | null;

    constructor(private afAuth: AngularFireAuth) {
        afAuth.idToken.subscribe(jwt => {
          this.authJwtToken = jwt;
        })

    }


}
