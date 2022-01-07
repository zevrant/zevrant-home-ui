import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrintUploadComponent} from './print-upload.component';

describe('PrintUploadComponent', () => {
    let component: PrintUploadComponent;
    let fixture: ComponentFixture<PrintUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
    declarations: [PrintUploadComponent],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrintUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
