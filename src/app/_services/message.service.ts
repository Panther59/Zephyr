﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();
    constructor(
        public dialog: MatDialog) { }
    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    async showMessage(title: string, message: string, buttonText: string = null): Promise<void> {
        const msgRef = this.dialog.open(MessageDialogComponent, {
            data: {},
            disableClose: true,
            hasBackdrop: true
        });
        msgRef.componentInstance.title = title;
        msgRef.componentInstance.message = message;
        if (buttonText != null) {
            msgRef.componentInstance.buttonText = buttonText;
        }

        return await msgRef.afterClosed().toPromise();
    }

    async confirm(title: string, message: string): Promise<boolean> {
        const msgRef = this.dialog.open(ConfirmDialogComponent, {
            data: {},
            disableClose: true,
            hasBackdrop: true
        });
        msgRef.componentInstance.title = title;
        msgRef.componentInstance.message = message;
        return await msgRef.afterClosed().toPromise();
    }
}
