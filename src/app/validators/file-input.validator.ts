import {Directive} from "@angular/core";
import {NG_VALIDATORS, Validator, FormControl} from "@angular/forms";

@Directive({
    selector: "[requireFile]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: FileValidator, multi: true },
    ]
})
export class FileValidator implements Validator {
    static validate(c: FormControl): {[key: string]: any} {
          console.log('2222');
      return c.value == null || c.value.length == 0 ? { "required" : true} : null;
    }

    validate(c: FormControl): {[key: string]: any} {
        console.log('1111');
      return FileValidator.validate(c);
    }
}