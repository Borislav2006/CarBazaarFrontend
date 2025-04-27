export interface ListingImage {
  id: number;
  imagePath: string;
}

export interface UserSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface PaginatedResult {
  items: Listing[];
  totalCount: number;
  totalPages: number;
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
  fuelType: string;
  horsePower: number;
  gearBox: string;
  color: string;
  createdAt: string;
  updatedAt: string;
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
  fuelType: string;
  horsePower: number;
  gearBox: string;
  color: string;
  //imageFiles: File[]; // For uploading new images
}

export interface QueryObject {
  brand?: string;
  model?: string;
  engineType?: string;
  fuelType?: string;
  gearBox?: string;
  color?: string;
  sortBy?: string;
  isDescending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}
