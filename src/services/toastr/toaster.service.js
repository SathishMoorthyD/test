import {Subject} from 'rxjs'

export const showToasterSubject = new Subject();
export const showToasterState = showToasterSubject.asObservable()