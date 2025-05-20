export enum MenuOptions {
  Calendar = 'Calendar',
  Notes = 'Notes',
  TelAdds = 'Tel/Adds',
}

export type telAddsObj = {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
};

export interface TelAddsItem {
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
  phone?: string;
  mobile?: string;
  email?: string;
  website?: string;
}

export interface Coordinate {
  lat: number;
  lng: number;
}
