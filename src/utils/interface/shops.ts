interface IShop {
    adminDomain: string;
    createdAt: string;
    expiresAt: string;
    id: number;
    isActive: boolean;
    metaData: {
      city: string;
      country: string;
      email: string;
      experience: string;
      firstName: string;
      lastName: string;
      phone: string;
      sellingPlaces: string[];
      sellingType: string[];
      shopArea: string;
      shopCountry: string;
      storName: string;
      street: string;
      zipCode: string;
    };
    shopDomain: string;
    shopName: string;
    shopSlug: string;
    tenantId: string;
    updatedAt: string;
  }
  