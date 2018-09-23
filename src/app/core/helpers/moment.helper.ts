import { Injectable } from "@angular/core";

import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})

export class MomentHelper {
  public convertDateMMDDYYYY(date: string) : string  {
    return moment(date).isValid ? moment(date).format("DD/MM/YYYY") : "";
  }
}
