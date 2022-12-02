import { TokenStorageService } from './../../../services/token-storage/token-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Peer } from "peerjs";
import { from, mergeMap, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-call-video-modal',
  templateUrl: './call-video-modal.component.html',
  styleUrls: ['./call-video-modal.component.scss']
})
export class CallVideoModalComponent implements OnInit {
  // @ViewChild('myvideo') myVideo: any;

  end$ = new Subject();
  localStream!: MediaStream;
  remoteStreams: MediaStream[] = [];
  name: string = 'logan';
  remoteNames: string[] = [];
  myPeer!: IPeerJs;
  a: any;
  peers: {
    [id: string]: any;
  } = {};

  peer: any;
  mypeerid: any;
  constructor(public activeModal: NgbActiveModal,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.initVideo();
    // const call = this.myPeer.call(this.name, this.localStream);
    // console.log('call', call);
    // this.connectToNewUser(call);

    this.peer = new Peer();
    setTimeout(() => {
      this.mypeerid = this.peer.id;
      console.log(this.mypeerid);
    }, 3000);

    this.peer.on('connection', function (conn: any) {
      conn.on('data', function (data: any) {
        // Will print 'hi!'
        console.log(data);
      });
    });
  }

  testConnect(): void {
    console.log('testConnect');
    const conn = this.peer.connect(this.mypeerid);

    conn.on('open', function (id: any) {
      console.log('My peer ID is: ' + id);
      conn.send('hi!');
    });
  }

  connectToNewUser(call: any) {
    call.on('stream', (stream: MediaStream) => {
      this.remoteStreams.push(stream);
      this.peers[call.peer] = call;
      console.log(this.remoteStreams);

      this.remoteNames = Object.keys(this.peers);
      // console.log(this.remoteNames);
    });
    call.on('close', () => {
      this.peers[call.peer].close();
    });

    console.log(this.peers);
  }

  initVideo() {
    // const peer = new Peer("pick-an-id");

    from(navigator.mediaDevices.getUserMedia({ audio: false, video: true }))
      .pipe(
        tap((stream) => (this.localStream = stream)),
        mergeMap(() =>
          // @ts-ignore
          from(import('../../../../../assets/peer.js'))
        )
      )
      .pipe(takeUntil(this.end$))
      .subscribe((data) => {
        console.log(data);
        this.myPeer = new data.default(this.mypeerid) as IPeerJs;
        this.myPeer.on('open', (id) => {
          console.log(id);
        });
        this.myPeer.on('call', (call) => {
          call.answer(this.localStream);
          this.connectToNewUser(call);
        });
        this.myPeer.on('data', (data) => {
          console.log(data);
        })
      });

  }

  ngOnDestroy() {
    this.end$.next(1);
  }

  endCall(): void {
    // this.socketService.endCallVideo(this.name, this.channel.id);
    // const tracks = this.localStream.getTracks();
    // tracks.forEach((track) => {
    //   track.stop();
    // });
    this.activeModal.close();
  }

}
export interface IPeerJs {
  connections: any;
  destroyed: boolean;
  disconnected: boolean;
  id: string;
  open: boolean;
  options: {
    config: { iceServers: any[]; sdpSemantics: string };
    debug: number;
    host: string;
    key: string;
    path: string;
    port: number;
    secure: boolean;
    token: string;
  };
  socket: WebSocket;
  on(
    event:
      | 'signal'
      | 'stream'
      | 'connect'
      | 'open'
      | 'call'
      | 'data'
      | 'track'
      | 'close'
      | 'error',
    fn: {
      (param1?: any, param2?: any): void;
    }
  ): void;
  call(id: string, stream: MediaStream, options?: any): any;
}
