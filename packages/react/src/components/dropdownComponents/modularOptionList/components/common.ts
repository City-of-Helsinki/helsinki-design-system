import { ChangeTrigger } from '../../../dataProvider/DataContext';
import { Option, ModularOptionListMetaData } from '../types';

export type ModularOptionListItemProps = {
  option: Option;
  trigger: ChangeTrigger;
  getOptionId: ModularOptionListMetaData['getOptionId'];
};
