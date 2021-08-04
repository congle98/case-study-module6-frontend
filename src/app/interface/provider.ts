import {Service} from "./service";

export interface Provider {
  id?: number;
  name?: string;
  description?: string;
  services?: Service[];
  priceperh?: number;
  avatar?: string;
}
