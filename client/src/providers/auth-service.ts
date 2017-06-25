import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {

  constructor(public af: AngularFireAuth, public local: Storage) { }

  signin(email, password) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  createAccount(email, password) {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  };

  logout() {
    this.af.auth.signOut();
  }
}
