import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// FormsModuleを削除
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { CoreModule } from './core/core.module'; // 追加
import { SharedModule } from './shared/shared.module'; // 追加
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginGuard } from './core/guard/login.guard';

const appRoutes: Routes = [
  { path: 'account', loadChildren: './account/account.module#AccountModule', canActivate: [LoginGuard] },
  { path: '', component: ChatComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ChatComponent
  ],
  imports: [
    NgbModule.forRoot(),
    // FormsModuleを削除
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CoreModule, // 追加
    SharedModule, // 追加
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
