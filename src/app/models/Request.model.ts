export class RequestModel {
  id?: number;
  date?: Date;
  comment?: string;
  endOfRent?: Date;
  adviserId?: number;
  clientId?: number;
  contractId?: number;
  guarantorId?: number;
  propertyId?: number;
  requestTypeId?: number;
  requestStatusId?: number;
  adviser?: any;
  client?: any;
  contract?: any;
  guarantor?: any;
  property?: any;
  requestType?: any;
  requestStatus?: any;
}
