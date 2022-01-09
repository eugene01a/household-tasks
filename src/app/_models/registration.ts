export class Registration {
  position: number;
  registrationId: number;
  email: string;
  firstName: string;
  lastName: string;
  requestedOn: string;
  reason: string;

  constructor(position: number, registrationId: number, email: string, firstName: string, lastName: string, reason: string, requestedOn: string) {
    this.position = position;
    this.registrationId = registrationId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.reason = reason;
    this.requestedOn = requestedOn;


  }
}
