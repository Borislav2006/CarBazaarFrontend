import axios from "axios";
import { CreateListing, Listing, QueryObject } from "../types/Listings";

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/listing`;

export const getListings = async (query?: QueryObject): Promise<Listing[]> => {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
  }

  const response = await axios.get<Listing[]>(
    `${API_URL}?${params.toString()}`
  );
  return response.data;
};

export const getListingById = async (id: string): Promise<Listing> => {
  const response = await axios.get<Listing>(`${API_URL}/${id}`);
  return response.data;
};

export const getUserListings = async (): Promise<Listing[]> => {
  const response = await axios.get<Listing[]>(`${API_URL}/user`);
  return response.data;
};

export const createListing = async (formData: FormData): Promise<Listing> => {
  try {
    const response = await axios.post<Listing>(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updateListing = async (
  id: string,
  listing: Partial<CreateListing>
): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, listing);
};

export const deleteListing = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
