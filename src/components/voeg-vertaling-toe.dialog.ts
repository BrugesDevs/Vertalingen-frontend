import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";


/**
 * Generated class for the OrderDialogComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'voeg-vertaling-toe-dialog',
  templateUrl: 'voeg-vertaling-toe-dialog.html'
})
export class VoegVertalingToeDialog {

  constructor(private view: ViewController,
              private navParams: NavParams) {
  }

  closeModal() {
    this.view.dismiss();
  }

}
