export class PropertyModel {
  id?: number;
  address?: string;
  salePrice?: number;
  rentalPrice?: number;
  description?: string;
  sell?: boolean;
  rent?: boolean;
  video?: string;
  propertyTypeId?: number;
  cityId?: number;
  requests?: string[];
  adviserId?: number;
  propertyType?: any;
  city?: any;
  adviser?: any;
}
