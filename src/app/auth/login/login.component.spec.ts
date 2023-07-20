import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Import the necessary modules
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should bind the email and password inputs', () => {
    const usernameInput: HTMLInputElement = fixture.nativeElement.querySelector('input[formControlName="email"]');
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector('input[formControlName="password"]');

    // Change the input values
    usernameInput.value = 'testuser';
    passwordInput.value = 'testpassword';

    // Dispatch input events
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // Check if the component properties are updated correctly
    expect(component.email).toBe('testuser');
    expect(component.password).toBe('testpassword');
  });
});