import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerComponent } from './paginas/answer/answer.component';
import { QuestionComponent } from './paginas/question/question.component';
import { RequestionComponent } from './paginas/requestion/requestion.component';
import { LoginComponent } from './persona/login/login.component';
import { PreguntasComponent } from './persona/preguntas/preguntas.component';
import { RegistroComponent } from './persona/registro/registro.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: 'preguntas',
    component: PreguntasComponent,
    ...canActivate(() => redirectUnauthorizedTo(['login']))
  },
  { path: 'registro', component: RegistroComponent},
  {
    path: 'answer',
    component: AnswerComponent,
    ...canActivate(() => redirectUnauthorizedTo(['login']))
  },
  {
    path: 'question/:id',
    component: RequestionComponent,
    ...canActivate(() => redirectUnauthorizedTo(['login']))
  },
  {path: '**', pathMatch: 'full', redirectTo:'preguntas'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



