import { Observable } from 'rxjs';
import { Response } from '@angular/http';

export class Constants {

	static extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body || {};
    }

   static handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }
}