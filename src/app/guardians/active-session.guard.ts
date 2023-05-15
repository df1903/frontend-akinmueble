import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

export const ActiveSessionGuard = () => {
  const securityService = inject(SecurityService);
  const router = inject(Router);

  let getSession = securityService.sessionValidation();
  if (getSession) {
    router.navigate(['/home']);
    return true;
  }
  return false;
};
