import { ItemType } from '@shared/types';

type ItemTypeTranslation = { [key in ItemType]: string };

export const itemTypeTranslations: ItemTypeTranslation = {
    PRODUCT: 'Laokaup',
    SERVICE: 'Teenus',
    EXPENSE: 'Kuluartikkel'
};
