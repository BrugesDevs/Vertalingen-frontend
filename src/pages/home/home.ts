import {Component, OnInit} from '@angular/core';
import {AlertController, Events, ModalController, NavController} from 'ionic-angular';
import {VertalingFacade} from "../facade/vertaling.facade";
import {VertalingModel} from "../../core/model/vertaling.model";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import {EventChannel} from "../../config/event-channel";
import {Config} from "../../config/config";
import {VoegVertalingToeDialog} from "../../components/voeg-vertaling-toe.dialog";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  keyFilter = new FormControl('');
  tekstFilter = new FormControl('');

  url: string = Config.SERVER_URL;
  filterOnKey: string = "";
  fitlerOnTekst: string = "";
  filteredVertalingen: VertalingModel[] = [];

  constructor(public navCtrl: NavController,
              protected vertalingFacade: VertalingFacade,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private events: Events) {
  }

  ngOnInit(): void {

    this.events.subscribe(EventChannel.EVENT_VERTALINGEN, (vertalingen: VertalingModel[]) => {
      this.filteredVertalingen = vertalingen;
    });

    this.vertalingFacade.loadVertalingen();

    this.keyFilter.valueChanges.debounceTime(500).subscribe(value => {
      this.filterOnKey = value.toUpperCase();
      this.filterVertalingenOnKey();
    });

    this.tekstFilter.valueChanges.debounceTime(500).subscribe(value => {
      this.fitlerOnTekst = value.toUpperCase();
      this.filterVertalingenOnTekst();
    });
  }

  protected saveVertaling(vertaling: VertalingModel) {
    let confirm = this.alertCtrl.create({
      title: 'Wilt u ' + vertaling.sleutel + " opslaan?",
      message: vertaling.changedVertaling,
      buttons: [
        {
          text: 'Niet opslaan',
          handler: () => {
            console.log("Niet opslaan gekozen", undefined);
          }
        },
        {
          text: 'Opslaan',
          handler: () => {
            if(vertaling.hasChanged()) {
              vertaling.setVertaling(vertaling.changedVertaling);
              this.vertalingFacade.saveVertaling(vertaling);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  protected voegVertalingToe() {
    const orderModal = this.modalCtrl.create(VoegVertalingToeDialog, {});
    orderModal.present();
  }

  private filterVertalingenOnKey() {
    if (this.filterOnKey) {
      console.log("Filter on key: " + this.filterOnKey);
      this.filteredVertalingen = this.vertalingFacade.vertalingen.filter((vertaling: VertalingModel) =>
        vertaling.sleutel.indexOf(this.filterOnKey) >= 0);
    } else {
      this.filteredVertalingen = this.vertalingFacade.vertalingen;
    }
  }

  private filterVertalingenOnTekst() {
    if (this.fitlerOnTekst) {
      console.log("Filter on value: " + this.fitlerOnTekst);
      this.filteredVertalingen = this.vertalingFacade.vertalingen.filter((vertaling: VertalingModel) => {
        console.log(vertaling.getVertaling());
        return vertaling.getVertaling().indexOf(this.fitlerOnTekst) >= 0;
      });
    } else {
      this.filteredVertalingen = this.vertalingFacade.vertalingen;
    }
  }

}
