import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundAvatar } from './background-avatar';

describe('BackgroundAvatar', () => {
  let component: BackgroundAvatar;
  let fixture: ComponentFixture<BackgroundAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundAvatar],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundAvatar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
