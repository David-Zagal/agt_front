import { Injectable } from '@angular/core';
import { MessageService } from 'primeng';

@Injectable()
/**
 * Toast service class
 * This class provides methods to add single, multiple alerts as a toast 
 */
export class ToastService {
    constructor(private messageService: MessageService) { }

    /**
     * add single toast message
     * @param severity Severity level of the message, valid values are "success", "info", "warn" and "error"
     * @param summary Summary text of the message.
     * @param detail Detail text of the message.
     * @param sticky keep message open.
     */
    addSingle(severity: string, summary: string, detail: string, sticky:boolean) {
        this.messageService.add({ severity: severity, summary: summary, detail: detail, sticky:sticky});
    }

    /**
     * add single toast message
     * @param severity Severity level of the message, valid values are "success", "info", "warn" and "error"
     * @param summary Summary text of the message.
     * @param detail Detail text of the message.
     * @param sticky keep message open.
     * @param key valor para el HTML
     */
     addSingleIden(severity: string, summary: string, detail: string, sticky:boolean, key: string) {
        this.messageService.add({ severity: severity, summary: summary, detail: detail, sticky:sticky, key:key});
    }

    /**
     * add multiple toast messages
     * @param messages 
     * array of message type {severity:'success', summary:'Service Message', detail:'Via MessageService'}
     */
    addMultiple(messages: any) {
        this.messageService.addAll(messages);
    }

    /**
     * clear all toast messages
     */
    clear() {
        this.messageService.clear();
    }
}