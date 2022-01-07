import {TestBed} from '@angular/core/testing';

import {CameraFeedService} from './camera-feed.service';

describe('CameraFeedService', () => {
    beforeEach(() => TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } }));

    it('should be created', () => {
        const service: CameraFeedService = TestBed.get(CameraFeedService);
        expect(service).toBeTruthy();
    });
});
