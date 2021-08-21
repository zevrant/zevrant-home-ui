import {Injectable, OnInit} from '@angular/core';
import {SocketIoConfig} from 'ngx-socket-io';
import {Socket} from "socket.io";
import {io} from "socket.io-client"

@Injectable({
    providedIn: 'root'
})
export class CameraFeedService implements OnInit {

    ngOnInit(): void {
    }

    convertToBinary(data: string): Uint8Array {
        let binaryDataArray: number[] = [];
        for( let i = 0; i < data.length - 2; i+=2) {
            let hex = data.charAt(i) + data.charAt(i+1)
            let binary: number = parseInt(hex, 16);
            binaryDataArray.push(binary)
        }
        return Uint8Array.from(binaryDataArray);
    }
}
