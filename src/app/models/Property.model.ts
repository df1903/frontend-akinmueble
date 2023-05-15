export class PropertyModel {
  id?: number;
  address?: string;
  salePrice?: number;
  rentalPrice?: number;
  description?: string;
  sell?: boolean;
  rent?: boolean;
  video?: string;
  photo?: string[];
  propertyTypeId?: string;
  cityId?: string;
  requests?: string[];
  adviserId?: string;
}
