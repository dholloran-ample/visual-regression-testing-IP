export interface MySiteUser {
  site: Site;
  closestSite: Site;
}

export interface Site {
  id: string;
  name: string;
  serviceTimes: string;
  map_url: string;
  mapImageUrl: string;
  address: string;
  openHours: string;
  mapUrl: string;
  imageUrl: string;
}

