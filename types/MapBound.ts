import { Location } from "./Location";

export class MapBound {
  constructor(
    public nw: Location,
    public se: Location
  ) {}

  get centerLatitude(): number {
    return (this.nw.latitude + this.se.latitude) / 2;
  }

  get centerLongitude(): number {
    return (this.nw.longitude + this.se.longitude) / 2;
  }

  get center(): Location {
    return {
      latitude: this.centerLatitude,
      longitude: this.centerLongitude,
    };
  }
}
