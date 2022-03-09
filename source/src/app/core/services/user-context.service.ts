import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { constantes } from '../../core/common/constantes';

const defaultUser = null;

@Injectable()
export class UserContextService {
    public user$ = new BehaviorSubject(defaultUser);

    constructor(private sessionService: SessionService) {
        const data = this.sessionService.getItem('currentUser');
        if (data != null) {
            this.user$.next(data);
        }
    }

    public setUser(user: any) {
        this.sessionService.setItem('currentUser', user);
        this.user$.next(user);
    }

    public logout() {
        this.sessionService.removeItem(constantes.REFRESH_TOKEN_KEY);
        this.sessionService.removeItem(constantes.TOKEN_KEY);
        this.sessionService.removeItem('currentUser');
        this.user$.next(defaultUser);
    }

}
