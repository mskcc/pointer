import { authenticationService } from '@/_services';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return { Authorization: `Bearer ${currentUser.access}`, 'Content-Type': 'application/json' };

    if (currentUser && currentUser.token) {
        // authenticationService.refresh();
        const currentUser = localStorage.getItem('currentUser');
        return { Authorization: `Bearer ${currentUser.access}`, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}