import { Person } from "../user/person";

export interface Organisation {
  imageUrl: string;
  admin?: Person;
  comments?: string;
  attributes?: { [key: string]: string | number | boolean | undefined };
  description?: string;
  id: string;
  location?: {
    longitude: number;
    latitude: number;
  };
  monetisable?: string;
  name: string;
  notSeenOnKeycloak?: number;
  score?: number;
  privacy?: string;
}

export function emptyOrganisationData(): Organisation {
  return {
    imageUrl: "",
    id: "",
    name: "",
  };
}
export function emptyOrgaData(defaultName: string): Organisation {
  return {
    imageUrl: "/img/emptypodcast.webp",
    id: "",
    name: defaultName,
  };
}
