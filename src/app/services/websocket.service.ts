import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor() {}

  public connect(authToken: string) {
    let url = '/' + 'ws'; // using contextPath '/'

    if (authToken) {
      url += '?access_token' + authToken;
    }
    let socket = new SockJS(url);
    let stompClient = Stomp.over(socket);

    stompClient.heartbeat.outgoing = 5000;
    stompClient.heartbeat.incoming = 5000;
    return stompClient;
  }
}
