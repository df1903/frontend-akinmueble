import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

export const InactiveSessionGuard = () => {
  const securityService = inject(SecurityService);
  const router = inject(Router);

  let getSession = securityService.sessionValidation();
  if (getSession) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
