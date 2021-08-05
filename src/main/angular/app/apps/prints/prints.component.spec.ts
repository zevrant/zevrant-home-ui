import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrintsComponent} from './prints.component';

describe('PrintsComponent', () => {
    let component: PrintsComponent;
    let fixture: ComponentFixture<PrintsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrintsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrintsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
