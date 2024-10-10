import { ChangeTrigger } from '../../../dataProvider/DataContext';
import { Option, SelectMetaData } from '../../types';

export type SelectItemProps = {
  option: Option;
  trigger: ChangeTrigger;
  getOptionId: SelectMetaData['getOptionId'];
};
