import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Combobox } from './Combobox';
import { IconFaceNeutral, IconFaceSad, IconFaceSmile } from '../../../icons';

const testOptions = [
  {
    label: 'afar',
    value: 'TGFuZ3VhZ2VOb2RlOjE=',
  },
  {
    label: 'abhaasi',
    value: 'TGFuZ3VhZ2VOb2RlOjI=',
  },
  {
    label: 'afrikaans',
    value: 'TGFuZ3VhZ2VOb2RlOjM=',
  },
  {
    label: 'akan',
    value: 'TGFuZ3VhZ2VOb2RlOjQ=',
  },
  {
    label: 'amhara',
    value: 'TGFuZ3VhZ2VOb2RlOjU=',
  },
  {
    label: 'arabia',
    value: 'TGFuZ3VhZ2VOb2RlOjY=',
  },
  {
    label: 'aragonia',
    value: 'TGFuZ3VhZ2VOb2RlOjc=',
  },
  {
    label: 'asami',
    value: 'TGFuZ3VhZ2VOb2RlOjg=',
  },
  {
    label: 'avaari',
    value: 'TGFuZ3VhZ2VOb2RlOjk=',
  },
  {
    label: 'aymara',
    value: 'TGFuZ3VhZ2VOb2RlOjEw',
  },
  {
    label: 'azeri',
    value: 'TGFuZ3VhZ2VOb2RlOjMzNQ==',
  },
  {
    label: 'baškiiri',
    value: 'TGFuZ3VhZ2VOb2RlOjEy',
  },
  {
    label: 'bambara',
    value: 'TGFuZ3VhZ2VOb2RlOjEz',
  },
  {
    label: 'valkovenäjä',
    value: 'TGFuZ3VhZ2VOb2RlOjMzOA==',
  },
  {
    label: 'bengali',
    value: 'TGFuZ3VhZ2VOb2RlOjE1',
  },
  {
    label: 'Bihari languages',
    value: 'TGFuZ3VhZ2VOb2RlOjE2',
  },
  {
    label: 'bislama',
    value: 'TGFuZ3VhZ2VOb2RlOjE3',
  },
  {
    label: 'tiibetti',
    value: 'TGFuZ3VhZ2VOb2RlOjE4',
  },
  {
    label: 'bosnia',
    value: 'TGFuZ3VhZ2VOb2RlOjE5',
  },
  {
    label: 'bulgaria',
    value: 'TGFuZ3VhZ2VOb2RlOjIw',
  },
  {
    label: 'katalaani',
    value: 'TGFuZ3VhZ2VOb2RlOjIx',
  },
  {
    label: 'tšekki',
    value: 'TGFuZ3VhZ2VOb2RlOjIy',
  },
  {
    label: 'chamorro',
    value: 'TGFuZ3VhZ2VOb2RlOjIz',
  },
  {
    label: 'tšetšeeni',
    value: 'TGFuZ3VhZ2VOb2RlOjI0',
  },
  {
    label: 'tšuvassi',
    value: 'TGFuZ3VhZ2VOb2RlOjI1',
  },
  {
    label: 'cree',
    value: 'TGFuZ3VhZ2VOb2RlOjI2',
  },
  {
    label: 'kymri',
    value: 'TGFuZ3VhZ2VOb2RlOjI3',
  },
  {
    label: 'tanska',
    value: 'TGFuZ3VhZ2VOb2RlOjI4',
  },
  {
    label: 'saksa',
    value: 'TGFuZ3VhZ2VOb2RlOjI5',
  },
  {
    label: 'Dhivehi',
    value: 'TGFuZ3VhZ2VOb2RlOjMw',
  },
  {
    label: 'dzongkha',
    value: 'TGFuZ3VhZ2VOb2RlOjMx',
  },
  {
    label: 'Modern Greek (1453-)',
    value: 'TGFuZ3VhZ2VOb2RlOjMy',
  },
  {
    label: 'englanti',
    value: 'TGFuZ3VhZ2VOb2RlOjMz',
  },
  {
    label: 'esperanto',
    value: 'TGFuZ3VhZ2VOb2RlOjM0',
  },
  {
    label: 'viro',
    value: 'TGFuZ3VhZ2VOb2RlOjM1',
  },
  {
    label: 'baski',
    value: 'TGFuZ3VhZ2VOb2RlOjM2',
  },
  {
    label: 'ewe',
    value: 'TGFuZ3VhZ2VOb2RlOjM3',
  },
  {
    label: 'fääri',
    value: 'TGFuZ3VhZ2VOb2RlOjM2Mg==',
  },
  {
    label: 'persia',
    value: 'TGFuZ3VhZ2VOb2RlOjM5',
  },
  {
    label: 'fidži',
    value: 'TGFuZ3VhZ2VOb2RlOjQw',
  },
  {
    label: 'suomi',
    value: 'TGFuZ3VhZ2VOb2RlOjM2NQ==',
  },
  {
    label: 'ranska',
    value: 'TGFuZ3VhZ2VOb2RlOjQy',
  },
  {
    label: 'Western Frisian',
    value: 'TGFuZ3VhZ2VOb2RlOjQz',
  },
  {
    label: 'fulani',
    value: 'TGFuZ3VhZ2VOb2RlOjQ0',
  },
  {
    label: 'iiri',
    value: 'TGFuZ3VhZ2VOb2RlOjM2OQ==',
  },
  {
    label: 'Galician',
    value: 'TGFuZ3VhZ2VOb2RlOjQ2',
  },
  {
    label: 'guarani',
    value: 'TGFuZ3VhZ2VOb2RlOjQ3',
  },
  {
    label: 'gujarati',
    value: 'TGFuZ3VhZ2VOb2RlOjQ4',
  },
  {
    label: 'hausa',
    value: 'TGFuZ3VhZ2VOb2RlOjQ5',
  },
  {
    label: 'Serbo-Croatian',
    value: 'TGFuZ3VhZ2VOb2RlOjUw',
  },
  {
    label: 'heprea',
    value: 'TGFuZ3VhZ2VOb2RlOjUx',
  },
  {
    label: 'herero',
    value: 'TGFuZ3VhZ2VOb2RlOjUy',
  },
  {
    label: 'hindi',
    value: 'TGFuZ3VhZ2VOb2RlOjUz',
  },
  {
    label: 'kroatia',
    value: 'TGFuZ3VhZ2VOb2RlOjU0',
  },
  {
    label: 'unkari',
    value: 'TGFuZ3VhZ2VOb2RlOjU1',
  },
  {
    label: 'armenia',
    value: 'TGFuZ3VhZ2VOb2RlOjU2',
  },
  {
    label: 'igbo',
    value: 'TGFuZ3VhZ2VOb2RlOjU3',
  },
  {
    label: 'indonesia',
    value: 'TGFuZ3VhZ2VOb2RlOjU4',
  },
  {
    label: 'islanti',
    value: 'TGFuZ3VhZ2VOb2RlOjU5',
  },
  {
    label: 'italia',
    value: 'TGFuZ3VhZ2VOb2RlOjYw',
  },
  {
    label: 'Ingrian',
    value: 'TGFuZ3VhZ2VOb2RlOjYx',
  },
  {
    label: 'jaava',
    value: 'TGFuZ3VhZ2VOb2RlOjYy',
  },
  {
    label: 'japani',
    value: 'TGFuZ3VhZ2VOb2RlOjYz',
  },
  {
    label: 'Kalaallisut',
    value: 'TGFuZ3VhZ2VOb2RlOjY0',
  },
  {
    label: 'kannada',
    value: 'TGFuZ3VhZ2VOb2RlOjY1',
  },
  {
    label: 'kashmiri',
    value: 'TGFuZ3VhZ2VOb2RlOjY2',
  },
  {
    label: 'georgia',
    value: 'TGFuZ3VhZ2VOb2RlOjY3',
  },
  {
    label: 'kanuri',
    value: 'TGFuZ3VhZ2VOb2RlOjY4',
  },
  {
    label: 'kazakki',
    value: 'TGFuZ3VhZ2VOb2RlOjY5',
  },
  {
    label: 'Central Khmer',
    value: 'TGFuZ3VhZ2VOb2RlOjcw',
  },
  {
    label: 'kikuyu',
    value: 'TGFuZ3VhZ2VOb2RlOjcx',
  },
  {
    label: 'ruanda',
    value: 'TGFuZ3VhZ2VOb2RlOjcy',
  },
  {
    label: 'kirgiisi',
    value: 'TGFuZ3VhZ2VOb2RlOjcz',
  },
  {
    label: 'komi',
    value: 'TGFuZ3VhZ2VOb2RlOjc0',
  },
  {
    label: 'kongo',
    value: 'TGFuZ3VhZ2VOb2RlOjc1',
  },
  {
    label: 'korea',
    value: 'TGFuZ3VhZ2VOb2RlOjc2',
  },
  {
    label: 'kuanjama',
    value: 'TGFuZ3VhZ2VOb2RlOjc3',
  },
  {
    label: 'kurdi',
    value: 'TGFuZ3VhZ2VOb2RlOjQwMg==',
  },
  {
    label: 'lao',
    value: 'TGFuZ3VhZ2VOb2RlOjc5',
  },
  {
    label: 'latina',
    value: 'TGFuZ3VhZ2VOb2RlOjgw',
  },
  {
    label: 'latvia',
    value: 'TGFuZ3VhZ2VOb2RlOjgx',
  },
  {
    label: 'Limburgan',
    value: 'TGFuZ3VhZ2VOb2RlOjgy',
  },
  {
    label: 'lingala',
    value: 'TGFuZ3VhZ2VOb2RlOjgz',
  },
  {
    label: 'liettua',
    value: 'TGFuZ3VhZ2VOb2RlOjg0',
  },
  {
    label: 'Luxembourgish',
    value: 'TGFuZ3VhZ2VOb2RlOjg1',
  },
  {
    label: 'luba (Katanga)',
    value: 'TGFuZ3VhZ2VOb2RlOjg2',
  },
  {
    label: 'ganda',
    value: 'TGFuZ3VhZ2VOb2RlOjg3',
  },
  {
    label: 'malayalam',
    value: 'TGFuZ3VhZ2VOb2RlOjg4',
  },
  {
    label: 'marathi',
    value: 'TGFuZ3VhZ2VOb2RlOjg5',
  },
  {
    label: 'makedonia',
    value: 'TGFuZ3VhZ2VOb2RlOjkw',
  },
  {
    label: 'malagassi',
    value: 'TGFuZ3VhZ2VOb2RlOjkx',
  },
  {
    label: 'malta',
    value: 'TGFuZ3VhZ2VOb2RlOjky',
  },
  {
    label: 'mongoli',
    value: 'TGFuZ3VhZ2VOb2RlOjkz',
  },
  {
    label: 'Malay (macrolanguage)',
    value: 'TGFuZ3VhZ2VOb2RlOjk0',
  },
  {
    label: 'burma',
    value: 'TGFuZ3VhZ2VOb2RlOjk1',
  },
  {
    label: 'nauru',
    value: 'TGFuZ3VhZ2VOb2RlOjk2',
  },
  {
    label: 'South Ndebele',
    value: 'TGFuZ3VhZ2VOb2RlOjk3',
  },
  {
    label: 'North Ndebele',
    value: 'TGFuZ3VhZ2VOb2RlOjk4',
  },
  {
    label: 'ndonga',
    value: 'TGFuZ3VhZ2VOb2RlOjk5',
  },
  {
    label: 'Nepali (macrolanguage)',
    value: 'TGFuZ3VhZ2VOb2RlOjEwMA==',
  },
  {
    label: 'hollanti',
    value: 'TGFuZ3VhZ2VOb2RlOjEwMQ==',
  },
  {
    label: 'norja',
    value: 'TGFuZ3VhZ2VOb2RlOjEwMg==',
  },
  {
    label: 'Nyanja',
    value: 'TGFuZ3VhZ2VOb2RlOjEwMw==',
  },
  {
    label: 'Oriya (macrolanguage)',
    value: 'TGFuZ3VhZ2VOb2RlOjEwNA==',
  },
  {
    label: 'oromo',
    value: 'TGFuZ3VhZ2VOb2RlOjEwNQ==',
  },
  {
    label: 'Ossetian',
    value: 'TGFuZ3VhZ2VOb2RlOjEwNg==',
  },
  {
    label: 'Panjabi',
    value: 'TGFuZ3VhZ2VOb2RlOjEwNw==',
  },
  {
    label: 'puola',
    value: 'TGFuZ3VhZ2VOb2RlOjEwOA==',
  },
  {
    label: 'portugali',
    value: 'TGFuZ3VhZ2VOb2RlOjEwOQ==',
  },
  {
    label: 'pašto',
    value: 'TGFuZ3VhZ2VOb2RlOjExMA==',
  },
  {
    label: 'ketšua',
    value: 'TGFuZ3VhZ2VOb2RlOjExMQ==',
  },
  {
    label: 'Romansh',
    value: 'TGFuZ3VhZ2VOb2RlOjExMg==',
  },
  {
    label: 'romani',
    value: 'TGFuZ3VhZ2VOb2RlOjExMw==',
  },
  {
    label: 'romania',
    value: 'TGFuZ3VhZ2VOb2RlOjExNA==',
  },
  {
    label: 'rundi',
    value: 'TGFuZ3VhZ2VOb2RlOjExNQ==',
  },
  {
    label: 'venäjä',
    value: 'TGFuZ3VhZ2VOb2RlOjExNg==',
  },
  {
    label: 'sango',
    value: 'TGFuZ3VhZ2VOb2RlOjExNw==',
  },
  {
    label: 'skotti',
    value: 'TGFuZ3VhZ2VOb2RlOjExOA==',
  },
  {
    label: 'Sinhala',
    value: 'TGFuZ3VhZ2VOb2RlOjExOQ==',
  },
  {
    label: 'slovakki',
    value: 'TGFuZ3VhZ2VOb2RlOjEyMA==',
  },
  {
    label: 'sloveeni',
    value: 'TGFuZ3VhZ2VOb2RlOjEyMQ==',
  },
  {
    label: 'Sami languages',
    value: 'TGFuZ3VhZ2VOb2RlOjEyMg==',
  },
  {
    label: 'samoa',
    value: 'TGFuZ3VhZ2VOb2RlOjEyMw==',
  },
  {
    label: 'shona',
    value: 'TGFuZ3VhZ2VOb2RlOjEyNA==',
  },
  {
    label: 'sindhi',
    value: 'TGFuZ3VhZ2VOb2RlOjEyNQ==',
  },
  {
    label: 'somali',
    value: 'TGFuZ3VhZ2VOb2RlOjEyNg==',
  },
  {
    label: 'Southern Sotho',
    value: 'TGFuZ3VhZ2VOb2RlOjEyNw==',
  },
  {
    label: 'espanja',
    value: 'TGFuZ3VhZ2VOb2RlOjEyOA==',
  },
  {
    label: 'albania',
    value: 'TGFuZ3VhZ2VOb2RlOjEyOQ==',
  },
  {
    label: 'serbia',
    value: 'TGFuZ3VhZ2VOb2RlOjEzMA==',
  },
  {
    label: 'swazi',
    value: 'TGFuZ3VhZ2VOb2RlOjEzMQ==',
  },
  {
    label: 'sunda',
    value: 'TGFuZ3VhZ2VOb2RlOjEzMg==',
  },
  {
    label: 'Swahili (macrolanguage)',
    value: 'TGFuZ3VhZ2VOb2RlOjEzMw==',
  },
  {
    label: 'ruotsi',
    value: 'TGFuZ3VhZ2VOb2RlOjEzNA==',
  },
  {
    label: 'syyria',
    value: 'TGFuZ3VhZ2VOb2RlOjEzNQ==',
  },
  {
    label: 'tahiti',
    value: 'TGFuZ3VhZ2VOb2RlOjEzNg==',
  },
  {
    label: 'tamili',
    value: 'TGFuZ3VhZ2VOb2RlOjEzNw==',
  },
  {
    label: 'tataari',
    value: 'TGFuZ3VhZ2VOb2RlOjEzOA==',
  },
  {
    label: 'telugu',
    value: 'TGFuZ3VhZ2VOb2RlOjEzOQ==',
  },
  {
    label: 'tadžikki',
    value: 'TGFuZ3VhZ2VOb2RlOjE0MA==',
  },
  {
    label: 'tagalog',
    value: 'TGFuZ3VhZ2VOb2RlOjE0MQ==',
  },
  {
    label: 'thai',
    value: 'TGFuZ3VhZ2VOb2RlOjE0Mg==',
  },
  {
    label: 'tigrinya',
    value: 'TGFuZ3VhZ2VOb2RlOjE0Mw==',
  },
  {
    label: 'Tongan tonga',
    value: 'TGFuZ3VhZ2VOb2RlOjE0NA==',
  },
  {
    label: 'tswana',
    value: 'TGFuZ3VhZ2VOb2RlOjE0NQ==',
  },
  {
    label: 'tsonga',
    value: 'TGFuZ3VhZ2VOb2RlOjE0Ng==',
  },
  {
    label: 'turkmeeni',
    value: 'TGFuZ3VhZ2VOb2RlOjE0Nw==',
  },
  {
    label: 'turkki',
    value: 'TGFuZ3VhZ2VOb2RlOjE0OA==',
  },
  {
    label: 'twi',
    value: 'TGFuZ3VhZ2VOb2RlOjE0OQ==',
  },
  {
    label: 'uiguuri',
    value: 'TGFuZ3VhZ2VOb2RlOjE1MA==',
  },
  {
    label: 'ukraina',
    value: 'TGFuZ3VhZ2VOb2RlOjE1MQ==',
  },
  {
    label: 'urdu',
    value: 'TGFuZ3VhZ2VOb2RlOjE1Mg==',
  },
  {
    label: 'uzbekki',
    value: 'TGFuZ3VhZ2VOb2RlOjE1Mw==',
  },
  {
    label: 'venda',
    value: 'TGFuZ3VhZ2VOb2RlOjE1NA==',
  },
  {
    label: 'vietnam',
    value: 'TGFuZ3VhZ2VOb2RlOjE1NQ==',
  },
  {
    label: 'wolof',
    value: 'TGFuZ3VhZ2VOb2RlOjE1Ng==',
  },
  {
    label: 'xhosa',
    value: 'TGFuZ3VhZ2VOb2RlOjE1Nw==',
  },
  {
    label: 'jiddiš',
    value: 'TGFuZ3VhZ2VOb2RlOjE1OA==',
  },
  {
    label: 'yoruba',
    value: 'TGFuZ3VhZ2VOb2RlOjE1OQ==',
  },
  {
    label: 'Zhuang',
    value: 'TGFuZ3VhZ2VOb2RlOjE2MA==',
  },
  {
    label: 'kiina',
    value: 'TGFuZ3VhZ2VOb2RlOjE2MQ==',
  },
  {
    label: 'zulu',
    value: 'TGFuZ3VhZ2VOb2RlOjE2Mg==',
  },
];

function getOptions() {
  return testOptions;
}
//
// function getOptions() {
//   return [
//     { label: 'Plutonium' },
//     { label: 'Americium' },
//     { label: 'Copernicium' },
//     { label: 'Nihonium' },
//     { label: 'Flerovium' },
//     { label: 'Moscovium' },
//     { label: 'Livermorium' },
//     { label: 'Tennessine' },
//     { label: 'Oganesson' },
//   ];
// }

export default {
  component: Combobox,
  title: 'Components/Dropdowns/Combobox',
  decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '420px' }}>{storyFn()}</div>],
  // decorators: [withKnobs, (storyFn) => <div style={{ maxWidth: '100%' }}>{storyFn()}</div>],
};

export const ComboboxTest = () => {
  const controlledOptions = getOptions();

  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (item) => {
    action('onChange')(item);
    setSelectedItem(item);
  };

  return (
    <>
      <Combobox
        options={controlledOptions}
        required
        icon={<IconFaceSmile />}
        label="Element:"
        helper="Choose an element"
        onChange={handleChange}
        placeholder="Placeholder"
        value={selectedItem}
        style={{ marginTop: 'var(--spacing-s)' }}
        clearButtonAriaLabel="Clear all selections"
        selectedItemRemoveButtonAriaLabel="Remove item {value}"
        selectedItemSrLabel="Selected item {value}"
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
      />
      <Combobox
        invalid
        icon={<IconFaceSad />}
        options={controlledOptions}
        label="Element:"
        helper="Choose an element"
        onChange={handleChange}
        placeholder="Placeholder"
        value={selectedItem}
        style={{ marginTop: 'var(--spacing-s)' }}
        clearButtonAriaLabel="Clear all selections"
        selectedItemRemoveButtonAriaLabel="Remove item {value}"
        selectedItemSrLabel="Selected item {value}"
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
        error="Wrong element!"
      />
      <Combobox
        disabled
        icon={<IconFaceNeutral />}
        options={controlledOptions}
        label="Element:"
        helper="Choose an element"
        onChange={handleChange}
        placeholder="Placeholder"
        value={selectedItem}
        style={{ marginTop: 'var(--spacing-s)' }}
        clearButtonAriaLabel="Clear all selections"
        selectedItemRemoveButtonAriaLabel="Remove item {value}"
        selectedItemSrLabel="Selected item {value}"
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
      />
    </>
  );
};

export const ComboboxMultiSelectTest = () => {
  const controlledOptions = getOptions();

  // const [selectedItems, setSelectedItems] = useState(null);
  //
  // const handleChange = (items) => {
  //   action('onChange')(items);
  //   setSelectedItems(items);
  // };

  return (
    <Combobox
      options={controlledOptions}
      label="Element:"
      helper="Choose an element"
      // onChange={handleChange}
      placeholder="Placeholder"
      // value={selectedItems}
      style={{ marginTop: 'var(--spacing-s)' }}
      multiselect
      clearButtonAriaLabel="Clear all selections"
      selectedItemRemoveButtonAriaLabel="Remove item {value}"
      selectedItemSrLabel="Selected item {value}"
      onFocus={action('onFocus')}
      onBlur={action('onBlur')}
    />
  );
};
