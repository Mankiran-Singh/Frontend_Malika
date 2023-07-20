import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const Images={
    microsoftIcon:'./assets/microsoft.png',
    malikaLogo:'./assets/malikaLogo.png'
}
export const url='http://localhost:3000/'

export const passwordsMatchValidator:ValidatorFn=(control:AbstractControl):ValidationErrors | null =>{
    const password=control.get('password')?.value 
    const confirmPassword=control.get('confirmPassword')?.value   
    if(password && confirmPassword && password!==confirmPassword){
        return {
          passwordMismatch: true
        };
  }
  return null;
}
 