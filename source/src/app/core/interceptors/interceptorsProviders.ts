import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './AuthInterceptor';
import { HttpRequestInterceptor } from './HttpRequestInterceptor';

export const interceptorProviders =
    // Van en orden. Para reuest primero HttpRequestInterceptor --> AuthInterceptor
    // Para responses al reves: AuthInterceptor --> HttpRequestInterceptor
   [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }

];
