import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserNotSupportedComponent } from './browser-not-supported.component';

const routes: Routes = [
    {
        path: '',
        component: BrowserNotSupportedComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrowserNotSupportedRoutingModule {

}
