

export type TCar = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: "available" | "unavailable";
  features: string[];
  images: string[]
  pricePerHour: number;
  isDeleted: boolean;
  cancellationPolicy: string;
  insurancePolicy: string;
};
