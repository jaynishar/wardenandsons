// Do not publish until the owner has filled in verified details.

export interface FamilyShop {
  name: string;
  whatItSells: string;
  address: string;
  googleMapsLink: string;
}

export const SHOPS_DATA: FamilyShop[] = [
  {
    name: 'Warden & Sons Kids Wear',
    whatItSells:
      "Kids 0-16 years, newborn essentials, school uniforms and bulk orders, plus limited men's and women's basics.",
    address:
      "Shop No. 7, Ground Floor, Haji Habib Building, 155/157 August Kranti Marg, Near St. Stephen's Church, Kemps Corner, Mumbai, Maharashtra 400036",
    googleMapsLink:
      'https://maps.google.com/?q=Warden+%26+Sons+Kids+Wear+Shop+No+7+Haji+Habib+Building+Kemps+Corner+Mumbai+400036',
  },
  {
    name: 'Twinkle Collection',
    whatItSells: 'TODO',
    address: 'TODO',
    googleMapsLink: 'TODO',
  },
  {
    name: 'Warden Collection',
    whatItSells: 'TODO',
    address: 'TODO',
    googleMapsLink: 'TODO',
  },
];
