export interface ListingImage {
  id: number;
  imagePath: string;
}

export interface UserSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  milage: number;
  price: number;
  engineType: string;
  horsePower: number;
  gearBox: string;
  color: string;
  images: ListingImage[];
  user: UserSummary;
}

export interface CreateListing {
  title: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  milage: number;
  price: number;
  engineType: string;
  horsePower: number;
  gearBox: string;
  color: string;
  //imageFiles: File[]; // For uploading new images
}

export interface QueryObject {
  brand?: string;
  model?: string;
  engineType?: string;
  gearBox?: string;
  color?: string;
  sortBy?: string;
  isDecsending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}
