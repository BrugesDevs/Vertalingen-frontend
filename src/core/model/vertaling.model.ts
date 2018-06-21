
export class VertalingModel{

  private vertaling: string;
  private _changedVertaling: string;

  sleutel: string;
  taal: string;

  getVertaling(): string {
    return this.vertaling ? this.vertaling: "";
  }

  setVertaling(value: string) {
    console.log("Vertaling ingesteld op: ", value);
    this.vertaling = value;
    this._changedVertaling = value;
  }

  get changedVertaling(): string {
    return this._changedVertaling;
  }

  set changedVertaling(value: string) {
    this._changedVertaling = value;
  }

  hasChanged() {
    return this.vertaling !== this._changedVertaling;
  }
}
