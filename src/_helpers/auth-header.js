import { authenticationService } from '@/_services';

export function authHeader() {
    // return authorization header with jwt token
    
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        authenticationService.refresh()
        const currentUser = authenticationService.currentUserValue;
        return { Authorization: `JWT ${currentUser.token}`, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}