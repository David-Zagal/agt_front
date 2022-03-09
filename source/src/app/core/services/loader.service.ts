import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
/**
 * loader service
 * toggle loader gif in website
 */
export class LoaderService {
    private turno: number = 0;
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    show() {
        this.status.next(true);
        this.turno++;
    }

    hide() {
        this.turno--;
        if (this.turno === 0) {
            this.status.next(false);
        }
    }
}
