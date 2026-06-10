import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Exercise01BasicsComponent } from './exercises/01-basics/exercise-01-basics.component';
import { Exercise02SubjectsComponent } from './exercises/02-subjects/exercise-02-subjects.component';
import { Exercise03AsyncPipeComponent } from './exercises/03-async-pipe/exercise-03-async-pipe.component';
import { Exercise04HttpComponent } from './exercises/04-http/exercise-04-http.component';
import { Exercise05CacheComponent } from './exercises/05-cache/exercise-05-cache.component';
import { Exercise06TriggerComponent } from './exercises/06-trigger/exercise-06-trigger.component';
import { Exercise07ChainedHttpComponent } from './exercises/07-chained-http/exercise-07-chained-http.component';
import { Exercise08FilterComponent } from './exercises/08-filter/exercise-08-filter.component';
import { Exercise09MiniChallengeComponent } from './exercises/09-mini-challenge/exercise-09-mini-challenge.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '01-basics', component: Exercise01BasicsComponent },
  { path: '02-subjects', component: Exercise02SubjectsComponent },
  { path: '03-async-pipe', component: Exercise03AsyncPipeComponent },
  { path: '04-http', component: Exercise04HttpComponent },
  { path: '05-cache', component: Exercise05CacheComponent },
  { path: '06-trigger', component: Exercise06TriggerComponent },
  { path: '07-chained-http', component: Exercise07ChainedHttpComponent },
  { path: '08-filter', component: Exercise08FilterComponent },
  { path: '09-mini-challenge', component: Exercise09MiniChallengeComponent },
  { path: '**', redirectTo: '' }
];
