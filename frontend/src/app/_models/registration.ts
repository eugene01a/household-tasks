export class Registration {
  registration_id: number;
  email: string;
  first_name: string;
  last_name: string;
  requestedOn: string;
  reason: string;

  constructor(registration_id: number, email: string, first_name: string, last_name: string, reason: string, requestedOn: string) {
    this.registration_id = registration_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.reason = reason;
    this.requestedOn = requestedOn;


  }
}
