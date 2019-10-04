//Mock auth class available for use by Jest tests.
//If used instead of the real Auth in global-nav, will allow profile menu to behave as if logged in
export class Auth {
    constructor(config = {}) {
        this.authenticated = true;
        this.config = config;
        this.updateCurrentUser();
    }
    listen(callback) {
        const token = '123'; //pretend we're signed in?
        if (!token)
            return (this.authenticated = false);
        this.authenticated = true;
        this.token = token;
        this.updateCurrentUser();
        callback(this);
    }
    signOut(callback) {
        this.authenticated = false;
        this.updateCurrentUser();
        console.log('DEBUG user is signed out!');
        callback(this);
    }
    updateCurrentUser() {
        if (!this.authenticated)
            return (this.currentUser = null);
        return (this.currentUser = {
            id: '4488274',
            name: 'Ben',
            avatarUrl: 'https://int.crossroads.net/proxy/gateway/api/image/profile/7772248',
        });
    }
}
