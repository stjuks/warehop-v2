import { ItemType, PartnerType } from '@shared/types';

type ItemTypeTranslation = { [key in ItemType]: string };
type PartnerTypeTranslation = { [key in PartnerType]: string };

export const itemTypeTranslations: ItemTypeTranslation = {
  PRODUCT: 'Laokaup',
  SERVICE: 'Teenus',
  EXPENSE: 'Kuluartikkel'
};

export const partnerTypeTranslations: PartnerTypeTranslation = {
  CLIENT: 'Klient',
  VENDOR: 'Tarnija'
};
