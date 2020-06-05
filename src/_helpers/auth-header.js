import { authenticationService } from '@/_services';

export function authHeader() {
    // return authorization header with jwt token

    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.access) {
        authenticationService.refresh()
        const currentUser = authenticationService.currentUserValue;
        return { Authorization: `Bearer ${currentUser.access}`, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}