import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import * as _ from 'lodash';
import { Client } from 'stompjs';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  private subNotiCaseId: string = '';
  private NOTIFICATION_TOPIC =
    '/amq/queue/ProviderNotification.PortalCaseStatusTransaction';
  private stompClient: Client = new Client();
  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.stompConnect();
  }

  stompConnect() {
    console.log('STOMP: Attempting connection');

    if (!!this.subNotiCaseId) {
      this.stompClient.disconnect(() => {});
    }

    const authToken = localStorage.getItem('Bearer Token') || '';
    this.stompClient = this.websocketService.connect(authToken);
    let header = {};
    this.stompClient.connect(
      header,
      () => this.stompSuccessCallback(),
      (error: any) => this.stompFailureCallback(error)
    );
  }

  stompSuccessCallback() {
    this.subNotiCaseId = this.getUniqueStompSubscribeId;
    this.stompClient.subscribe(
      this.NOTIFICATION_TOPIC,
      (message) => {
        let notification = JSON.parse(message.body);
        if (!!notification) {
          console.log(notification);
        }
      },
      { id: this.subNotiCaseId }
    );
  }

  stompFailureCallback(error: any) {
    let errorMessages = String(error);
    console.log(`STOMP: ${errorMessages}`);
    if (errorMessages.includes('Lost connection')) {
      setTimeout(() => this.stompConnect(), 5000);
      console.log('STOMP: Reconnecting in 5 seconds');
    }
  }

  get getUniqueStompSubscribeId() {
    return 'sub-' + _.uniqueId();
  }
}
