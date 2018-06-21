import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../config/config";
import {VertalingModel} from "../model/vertaling.model";
import "rxjs/add/operator/map";
import {Events} from "ionic-angular";
import {EventChannel} from "../../config/event-channel";

@Injectable()
export class VertalingService {

  constructor(private httpClient: HttpClient,
              private events: Events) {
  }

  loadVertalingen() {
    this.httpClient.get<any[]>(Config.SERVER_URL + "/vertalingen")
      .subscribe((vertalingen: any[]) => {
        console.log(vertalingen);
        let vertalingsLijst = [];
        let v;
        for (let i = 0; i < vertalingen.length; i++ ){
          v = new VertalingModel();
          v.setVertaling(vertalingen[i].vertaling);
          v.sleutel = vertalingen[i].sleutel;
          v.taal = vertalingen[i].taal;
          vertalingsLijst.push(v);
        }
        this.events.publish(EventChannel.EVENT_VERTALINGEN, vertalingsLijst);
      });
  }

  saveVertaling(vertaling: VertalingModel) {
    this.httpClient.post(Config.SERVER_URL + "/vertalingen/" + vertaling.sleutel, vertaling)
      .subscribe(() => {
        console.log("Vertaling opgeslagen ", vertaling);
      });
  }
}
