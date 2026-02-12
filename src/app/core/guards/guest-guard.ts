import { CanActivateFn } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user_session')
  if(user){
    return false;
  }
  return true;
};
