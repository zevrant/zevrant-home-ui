import {AfterViewInit, Component} from '@angular/core';
import {io} from "socket.io-client";
import {CameraFeedService} from "../../../services/camera-feed.service";

@Component({
    selector: 'app-camera-view',
    templateUrl: './camera-view.component.html',
    styleUrls: ['./camera-view.component.scss']
})
export class CameraViewComponent implements AfterViewInit {


    private socket;

    //es2017
    videoBuffer: Uint8Array = new Uint8Array([]);

    constructor(private cameraService: CameraFeedService) {
    }

    ngAfterViewInit(): void {
        this.socket = io({
            transports: ["websocket"]
        })

        this.socket.on("video-data", (data: string) => {
            let binaryData: Uint8Array = this.cameraService.convertToBinary(data);
            let subArray = new Uint8Array(this.videoBuffer.length + binaryData.length)
            subArray.set(this.videoBuffer)
            subArray.set(binaryData, this.videoBuffer.length)
            this.videoBuffer = subArray;
        })
    }

}
