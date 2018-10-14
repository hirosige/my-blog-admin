import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

import { Password } from '../../models/password';
import { User } from '../../models/user';
import { Session } from '../../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  private createUser(user: User): Promise<void> {
    return this.afs
      .collection('users')
      .doc(user.uid)
      .set(user.deserialize());
  }

  private getUser(uid: string): Observable<any> {
    return this.afs
      .collection('users')
      .doc(uid)
      .valueChanges()
      .pipe(
        take(1),
        switchMap((user: User) => of(new User(uid, user.name)))
      );
  }

  login(account: Password): void {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(account.email, account.password)
      .then((auth) => {
        if (!auth.user.emailVerified) {
          this.afAuth.auth.signOut();
          return Promise.reject('メールアドレスが確認できてません。');
        } else {
          this.session.login = true;
          this.sessionSubject.next(this.session);
          return this.router.navigate(['/']);
        }
      })
      .then(() => alert('ログインしました。'))
      .catch((err) => {
        console.log(err);
        alert('ログインに失敗しました。\n' + err);
      });
  }

  logout(): void {
    this.afAuth
      .auth
      .signOut()
      .then(() => {
        return this.router.navigate(['/account/login']);
      })
      .then(() => {
        this.sessionSubject.next(this.session.reset());
        alert('ログアウトしました。');
      })
      .catch((err) => {
        console.log(err);
        alert('ログアウトに失敗しました。\n' + err);
      });
  }

  signup(account: Password): void {
    let auth;

    this.afAuth
      .auth
      .createUserWithEmailAndPassword(account.email, account.password)
      .then((_auth) => {
        auth = _auth;
        return auth.user.sendEmailVerification();
      })
      .then(() => {
        return this.createUser(new User(auth.user.uid, account.name));
      })
      .then(() => this.afAuth.auth.signOut())
      .then(() => {
        account.reset();
        alert('メールアドレス確認メールを送信しました。');
      })
      .catch((err) => {
        console.log(err);
        alert('アカウントの作成に失敗しました。\n' + err);
      });
  }

  checkLogin(): void {
    this.afAuth
      .authState
      .pipe(
        switchMap((auth) => {
          if (!auth) {
            return of(null);
          } else {
            return this.getUser(auth.uid);
          }
        })
      )
      .subscribe((auth) => {
        this.session.login = (!!auth);
        this.session.user = (auth) ? auth : new User();
        this.sessionSubject.next(this.session);
      });
  }

  checkLoginState(): Observable<Session> {
    return this.afAuth
      .authState
      .pipe(
        map((auth) => {
          this.session.login = (!!auth);
          return this.session;
        })
      );
  }
}
