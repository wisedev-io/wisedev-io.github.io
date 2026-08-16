import { Routes } from '@angular/router';
import { HomePage } from './pages/home';
import { ProjectPage } from './pages/project';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Kamoliddin Rasulov — Full-Stack Developer' },
  { path: 'projects/:slug', component: ProjectPage, title: 'Case study — Kamoliddin Rasulov' },
  { path: 'about', component: AboutPage, title: 'About — Kamoliddin Rasulov' },
  { path: 'contact', component: ContactPage, title: 'Contact — Kamoliddin Rasulov' },
  { path: '**', redirectTo: '' },
];
