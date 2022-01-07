import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeViewComponent} from './home-view.component';

describe('HomeViewComponent', () => {
    let component: HomeViewComponent;
    let fixture: ComponentFixture<HomeViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
    declarations: [HomeViewComponent],
    teardown: { destroyAfterEach: false }
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
