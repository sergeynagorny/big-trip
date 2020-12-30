import {createOffersMap} from "../utils/common.js";

export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.date = {
      checkIn: new Date(data[`date_from`]),
      checkOut: new Date(data[`date_to`]),
    };
    this.destination = {
      name: data[`destination`][`name`],
      description: data[`destination`][`description`],
      pictures: data[`destination`][`pictures`],
    };
    this.price = data[`base_price`];
    this.offers = createOffersMap(data[`offers`]);
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'date_from': this.start.toISOString(),
      'date_to': this.end.toISOString(),
      'destination': {
        'name': this.city,
        'description': this.description,
        'pictures': this.photos
      },
      'base_price': this.price,
      'is_favorite': this.isFavorite,
      'offers': this.selectedOffers
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  // static clone(data) {
  //   return new Point(data.toRAW());
  // }
}
