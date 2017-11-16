import {Injectable} from '@angular/core';
import {User} from '../_models/user.model';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/toPromise';
import * as constants from '../../constants';

@Injectable()
export class AuthService {

    private isLoggedIn: boolean;
    private redirectUrl: string;
    private redirectUrlChangePassword: string;
    private loginUrl: string;
    private user: User;
    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers({'Content-Type': 'application/json'});

        this.isLoggedIn = this.getIsLoggedIn();
        this.redirectUrl = '/dashboard';
        this.redirectUrlChangePassword = '/changePassword';
        this.loginUrl = '/login';
        this.user = new User();


    }

    logIn(username: string, password: string): Promise<User> {

        this.user = new User();
        this.user.userName = username;
        this.user.password = password;

        return this.http
            .post(constants.API_POST_LOGIN, JSON.stringify(this.user), this.headers)
            .toPromise()
            .then(this.extractData).catch(this.handleError);

    }

    logOut() {
        this.isLoggedIn = false;
        localStorage.removeItem('currentUser');
    }

    getIsLoggedIn() {
        return localStorage.getItem('currentUser') ? true : false
    }

    getRedirectUrl(): string {
        return this.redirectUrl;
    }

    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }

    getLoginUrl(): string {
        return this.loginUrl;
    }

    getRedirectUrlChangePassword(): string {
        return this.redirectUrlChangePassword;
    }

    findAccount(username: string): Promise<string> {
        this.user = new User();
        this.user.userName = username;
        console.info(this.user);
        return this.http
            .post(constants.API_POST_FIND_ACCOUNT, JSON.stringify(this.user), this.headers)
            .toPromise()
            .then(this.extractData).catch(this.handleError);
    }

    changePassword(username: string, password: string, confirmationCode: string) {
        this.user = new User();
        this.user.userName = username;
        this.user.newPassword = password;
        this.user.confirmationCode = confirmationCode;
        console.info(this.user);

        return this.http
            .post(constants.API_POST_CHANGE_PASSWORD, JSON.stringify(this.user), this.headers)
            .toPromise()
            .then(this.extractData).catch(this.handleError);

    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private  extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
