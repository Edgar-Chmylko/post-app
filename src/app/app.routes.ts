import { Routes } from '@angular/router';
import { PostsPageComponent } from './Posts/pages/posts-page/posts-page.component';

export const routes: Routes = [
    {
        path: "",
        component: PostsPageComponent
    },
    {
        path: '**',
        component: PostsPageComponent
    },];
