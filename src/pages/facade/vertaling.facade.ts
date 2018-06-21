import {Injectable} from "@angular/core";
import {VertalingService} from "../../core/service/vertaling.service";
import {VertalingModel} from "../../core/model/vertaling.model";
import {Events} from "ionic-angular";
import {EventChannel} from "../../config/event-channel";

@Injectable()
export class VertalingFacade {

  vertalingen: VertalingModel[] = [];

  constructor(private vertalingService: VertalingService,
              private events: Events) {
    events.subscribe(EventChannel.EVENT_VERTALINGEN, (vertalingen: VertalingModel[]) => {
      this.vertalingen = vertalingen;
    });
  }

  loadVertalingen() {
    this.vertalingService.loadVertalingen();
  }

  saveVertaling(vertaling: VertalingModel){
    this.vertalingService.saveVertaling(vertaling);
  }

}
