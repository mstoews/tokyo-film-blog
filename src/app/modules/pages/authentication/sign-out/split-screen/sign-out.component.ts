import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Auth, GoogleAuthProvider,EmailAuthProvider,signInWithPopup ,signInWithEmailAndPassword , setPersistence, browserSessionPersistence, browserLocalPersistence, signInAnonymously, } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
    selector     : 'sign-out-split-screen',
    templateUrl  : './sign-out.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SignOutSplitScreenComponent
{
    countdown: number = 5;
    countdownMapping: any = {
        '=1'   : '# second',
        'other': '# seconds'
    };

    /**
     * Constructor
     */
    constructor(
        private _router: Router
    )
    {
    }
}
