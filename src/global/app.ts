import { ReplaySubject } from 'rxjs';
import { authInit } from './authInit';

window['apolloClient'] = new ReplaySubject();
authInit();
