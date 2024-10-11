import { OptionInProps } from './types';

const optionLabels = [
  'Aromatic pineapple',
  'Flavorful lettuce',
  'Tangy yucca',
  'Tasty banana',
  'Healthy apricot',
  'Sour grapefruit',
  'Scented honeydew',
  'Satisfying olive',
  'Sugary turnip',
  'Tangy pea',
  'Tender zucchini',
  'Tasty kale',
  'Bitter tomato',
  'Juicy cranberry',
  'Succulent tangerine',
  'Wholesome lemon',
  'Exotic honeydew',
  'Delicious eggplant',
  'Crisp lemon',
  'Satisfying cherry',
  'Sapid carrot',
  'Tender turnip',
  'Sugary fig',
  'Juicy apricot',
  'Healthy honeydew',
  'Sapid banana',
  'Colorful raspberry',
  'Sweet broccoli',
  'Fragrant peach',
  'Succulent guava',
  'Juicy yam',
  'Bitter cranberry',
  'Fresh rutabaga',
  'Flavorful radish',
  'Bitter cherry',
  'Fragrant pear',
  'Scented cranberry',
  'Ripe lime',
  'Scented potato',
  'Ripe pumpkin',
  'Scented orange',
  'Crisp blueberry',
  'Delicious pea',
  'Crunchy lemon',
  'Tasty tangerine',
  'Juicy cucumber',
  'Sweet rutabaga',
  'Satisfying watercress',
  'Scented pea',
  'Fresh apricot',
  'Spicy plum',
  'Tender cherry',
  'Juicy grapefruit',
  'Crisp watercress',
  'Flavorful broccoli',
  'Tender rutabaga',
  'Delicious mango',
  'Bitter radish',
  'Fragrant cucumber',
  'Tangy plum',
  'Tasty kiwi',
  'Zesty watermelon',
  'Spicy honeydew',
  'Flavorful grapefruit',
  'Colorful cucumber',
  'Sugary blackberry',
  'Mouthwatering tangerine',
  'Juicy carrot',
  'Flavorful pineapple',
  'Fragrant carrot',
  'Mouthwatering pear',
  'Sugary blueberry',
  'Satisfying pumpkin',
  'Juicy mango',
  'Delicious watermelon',
  'Tasty blackberry',
  'Mouthwatering potato',
  'Crunchy cranberry',
  'Bitter lime',
  'Tasty cranberry',
  'Ripe fig',
  'Spicy cherry',
  'Fresh pear',
  'Wholesome kiwi',
  'Satisfying yucca',
  'Exotic grapefruit',
  'Spicy apple',
  'Sapid yam',
  'Exotic cranberry',
  'Bitter eggplant',
  'Ripe tomato',
  'Juicy fig',
  'Tangy watercress',
  'Mouthwatering radish',
  'Tasty eggplant',
  'Sugary apricot',
  'Crisp cranberry',
  'Mellow fig',
  'Vibrant carrot',
  'Exotic turnip',
  'Fragrant plum',
  'Mellow honeydew',
  'Ripe plum',
  'Mellow radish',
  'Satisfying lemon',
  'Flavorful kale',
  'Aromatic yucca',
  'Delicious fig',
  'Zesty carrot',
  'Flavorful yucca',
  'Wholesome apple',
  'Sugary cherry',
  'Fresh radish',
  'Tasty potato',
  'Fragrant fig',
  'Nutritious pear',
  'Tasty yam',
  'Tender avocado',
  'Spicy cranberry',
  'Healthy tangerine',
  'Vibrant cranberry',
  'Colorful potato',
  'Scented grape',
  'Tangy mango',
  'Tangy peach',
  'Delicious bell pepper',
  'Sapid lettuce',
  'Zesty guava',
  'Ripe kale',
  'Crisp grapefruit',
  'Healthy potato',
  'Crunchy guava',
  'Sugary honeydew',
  'Crunchy grape',
  'Succulent strawberry',
  'Sugary yam',
  'Zesty grapefruit',
  'Tender watercress',
  'Zesty papaya',
  'Wholesome fig',
  'Bitter potato',
  'Nutritious nectarine',
  'Sugary watercress',
  'Sweet apricot',
  'Fragrant grape',
  'Satisfying honeydew',
  'Crunchy pineapple',
  'Succulent lime',
  'Tender cucumber',
  'Nutritious raspberry',
  'Fresh carrot',
  'Crunchy yucca',
  'Nutritious kiwi',
  'Ripe kiwi',
  'Flavorful apricot',
  'Spicy potato',
  'Vibrant pineapple',
  'Sugary avocado',
  'Satisfying rutabaga',
  'Crunchy raspberry',
  'Aromatic tomato',
  'Flavorful spinach',
  'Mellow blackberry',
  'Sour blueberry',
  'Fragrant radish',
  'Zesty rutabaga',
  'Juicy tangerine',
  'Sour pumpkin',
  'Juicy turnip',
  'Satisfying strawberry',
  'Sweet carrot',
  'Sapid zucchini',
  'Healthy lime',
  'Crunchy papaya',
  'Mouthwatering spinach',
  'Sugary lettuce',
  'Mouthwatering pineapple',
  'Tangy lime',
  'Tangy cranberry',
  'Wholesome potato',
  'Tasty turnip',
  'Juicy blueberry',
  'Tender watermelon',
  'Delicious kale',
  'Ripe nectarine',
  'Vibrant apple',
  'Mellow pea',
  'Aromatic guava',
  'Bitter tangerine',
  'Wholesome plum',
  'Sapid guava',
  'Sapid radish',
  'Ripe pear',
  'Sour spinach',
  'Exotic zucchini',
  'Scented kiwi',
  'Healthy radish',
  'Sour guava',
  'Juicy orange',
  'Delicious lime',
  'Satisfying avocado',
  'Sour eggplant',
  'Zesty banana',
  'Colorful mango',
  'Mellow apple',
  'Fragrant pea',
  'Bitter kiwi',
  'Tender eggplant',
  'Nutritious tomato',
  'Sour tangerine',
  'Delicious rutabaga',
  'Tender papaya',
  'Tender carrot',
  'Flavorful watercress',
  'Succulent turnip',
  'Crisp lime',
  'Satisfying blackberry',
  'Nutritious watermelon',
  'Juicy avocado',
  'Fragrant apple',
  'Mellow avocado',
  'Crunchy watercress',
  'Nutritious grape',
  'Tender bell pepper',
  'Fresh bell pepper',
  'Mellow eggplant',
  'Colorful orange',
  'Satisfying tomato',
  'Sweet cucumber',
  'Satisfying apple',
  'Satisfying turnip',
  'Healthy spinach',
  'Flavorful turnip',
  'Vibrant watercress',
  'Sapid cherry',
  'Spicy lemon',
  'Satisfying cucumber',
  'Sour olive',
  'Exotic olive',
  'Vibrant apricot',
  'Ripe yam',
  'Spicy kiwi',
  'Fragrant apricot',
  'Mouthwatering watermelon',
  'Crisp peach',
  'Aromatic eggplant',
  'Flavorful kiwi',
  'Exotic watercress',
  'Colorful spinach',
  'Sweet papaya',
  'Exotic pea',
  'Mouthwatering guava',
  'Sweet pea',
  'Juicy pea',
  'Spicy tangerine',
  'Vibrant radish',
  'Fresh pineapple',
  'Sour cherry',
  'Healthy plum',
  'Spicy kale',
  'Succulent radish',
  'Tasty blueberry',
  'Mouthwatering raspberry',
  'Crunchy fig',
  'Wholesome carrot',
  'Exotic raspberry',
  'Sour peach',
  'Flavorful honeydew',
  'Bitter zucchini',
  'Fragrant honeydew',
  'Succulent papaya',
  'Fresh olive',
  'Tender olive',
  'Vibrant grape',
  'Ripe rutabaga',
  'Nutritious mango',
  'Crunchy cherry',
  'Vibrant olive',
  'Wholesome grape',
  'Sweet lemon',
  'Succulent cranberry',
  'Satisfying pear',
  'Succulent watermelon',
  'Tasty mango',
  'Exotic banana',
  'Spicy lime',
  'Mellow zucchini',
  'Nutritious watercress',
  'Exotic plum',
  'Succulent fig',
  'Mouthwatering pea',
  'Fresh lemon',
  'Vibrant lettuce',
  'Aromatic tangerine',
  'Vibrant pumpkin',
  'Sour apricot',
  'Flavorful pea',
  'Scented peach',
  'Zesty kiwi',
  'Colorful plum',
  'Satisfying kiwi',
  'Aromatic turnip',
  'Fresh watermelon',
  'Fragrant papaya',
  'Spicy blackberry',
  'Crunchy honeydew',
  'Crunchy lime',
  'Aromatic kale',
  'Fragrant pumpkin',
  'Mouthwatering lime',
  'Colorful broccoli',
  'Nutritious yam',
  'Sour fig',
  'Exotic potato',
  'Nutritious spinach',
  'Ripe carrot',
  'Wholesome radish',
  'Ripe pea',
  'Vibrant strawberry',
  'Sapid rutabaga',
  'Spicy cucumber',
  'Tender spinach',
  'Crisp eggplant',
  'Wholesome blueberry',
  'Fresh blackberry',
  'Tender nectarine',
  'Aromatic watermelon',
  'Crisp avocado',
  'Exotic yucca',
  'Tangy pineapple',
  'Healthy mango',
  'Juicy tomato',
  'Bitter papaya',
  'Mouthwatering yucca',
  'Scented zucchini',
  'Satisfying peach',
  'Mellow nectarine',
  'Mellow turnip',
  'Fragrant lime',
  'Delicious cherry',
  'Crisp kale',
  'Mellow apricot',
  'Sugary rutabaga',
  'Scented apricot',
  'Sapid spinach',
  'Aromatic avocado',
  'Flavorful lemon',
  'Nutritious blueberry',
  'Mouthwatering lemon',
  'Fragrant olive',
  'Satisfying spinach',
  'Bitter blackberry',
  'Fragrant eggplant',
  'Crunchy zucchini',
  'Satisfying yam',
  'Exotic cherry',
  'Wholesome strawberry',
  'Tasty avocado',
  'Mellow pineapple',
  'Sapid blueberry',
  'Satisfying guava',
  'Tender pineapple',
  'Zesty fig',
  'Crunchy nectarine',
  'Scented kale',
  'Nutritious lime',
  'Ripe turnip',
  'Scented olive',
  'Sour blackberry',
  'Delicious cucumber',
  'Crisp zucchini',
  'Succulent mango',
  'Mellow olive',
  'Wholesome pineapple',
  'Tender pea',
  'Fragrant watermelon',
  'Nutritious bell pepper',
  'Succulent avocado',
  'Colorful pineapple',
  'Mellow rutabaga',
  'Aromatic fig',
  'Crisp pea',
  'Vibrant grapefruit',
  'Exotic lemon',
  'Crisp radish',
  'Tender apricot',
  'Ripe pineapple',
  'Zesty mango',
  'Aromatic plum',
  'Ripe blueberry',
  'Sweet mango',
  'Nutritious cranberry',
  'Flavorful tangerine',
  'Satisfying potato',
  'Tender strawberry',
  'Vibrant honeydew',
  'Sour cucumber',
  'Sour bell pepper',
  'Sweet spinach',
  'Nutritious radish',
  'Tender yucca',
  'Tender yam',
  'Crunchy grapefruit',
  'Aromatic zucchini',
  'Ripe papaya',
  'Spicy yucca',
  'Juicy plum',
  'Exotic yam',
  'Satisfying carrot',
  'Exotic papaya',
  'Satisfying bell pepper',
  'Bitter raspberry',
  'Tasty peach',
  'Flavorful tomato',
  'Bitter peach',
  'Crisp tangerine',
  'Tangy apricot',
  'Bitter nectarine',
  'Wholesome turnip',
  'Zesty raspberry',
  'Tender lemon',
  'Wholesome guava',
  'Crisp pumpkin',
  'Tender mango',
  'Wholesome pumpkin',
  'Succulent bell pepper',
  'Vibrant banana',
  'Mellow strawberry',
  'Juicy spinach',
  'Bitter watercress',
  'Bitter bell pepper',
  'Spicy nectarine',
  'Mellow yucca',
  'Ripe strawberry',
  'Satisfying eggplant',
  'Flavorful blackberry',
  'Colorful banana',
  'Sweet blueberry',
  'Colorful peach',
  'Healthy strawberry',
  'Nutritious fig',
  'Juicy strawberry',
  'Scented fig',
  'Colorful papaya',
  'Exotic lime',
  'Nutritious rutabaga',
  'Colorful tangerine',
  'Sour yucca',
  'Sweet bell pepper',
  'Vibrant potato',
  'Wholesome zucchini',
  'Flavorful avocado',
  'Tasty lettuce',
  'Tangy tomato',
  'Satisfying lettuce',
  'Sour watermelon',
  'Colorful watermelon',
  'Sugary guava',
  'Fresh honeydew',
  'Scented banana',
  'Vibrant pea',
  'Tasty lemon',
  'Mouthwatering strawberry',
  'Vibrant lime',
  'Tasty pea',
  'Sugary eggplant',
  'Bitter turnip',
  'Sour mango',
  'Flavorful carrot',
  'Colorful apricot',
  'Fresh pea',
  'Aromatic rutabaga',
  'Sugary lime',
  'Colorful rutabaga',
  'Ripe honeydew',
  'Bitter rutabaga',
  'Wholesome apricot',
  'Mouthwatering pumpkin',
  'Satisfying apricot',
  'Sour broccoli',
  'Spicy pear',
  'Fresh guava',
  'Succulent tomato',
  'Succulent yucca',
  'Healthy papaya',
  'Spicy yam',
  'Fragrant grapefruit',
  'Wholesome lime',
  'Fresh tangerine',
  'Vibrant tangerine',
  'Spicy zucchini',
  'Vibrant zucchini',
  'Scented tangerine',
  'Fragrant cherry',
  'Ripe grapefruit',
  'Sour nectarine',
  'Crisp turnip',
  'Bitter pumpkin',
  'Healthy avocado',
  'Juicy watercress',
];

export const getOptionLabels = (count = 20, startIndex = 0): string[] => {
  return optionLabels.slice(startIndex, startIndex + count);
};

export const getOptions = (count = 20): OptionInProps[] => {
  const labels = getOptionLabels(count);
  return labels.map((label) => {
    return {
      value: label,
      label,
    };
  });
};

export const getLargeBatchOfUniqueValues = (count: number): OptionInProps[] => {
  const maxNow = optionLabels.length;
  const batch: OptionInProps[] = [];

  let uid = 0;
  const makeUniqueOption = (label: string) => {
    uid += 1;
    const value = `${label} ${uid}`;
    return {
      label,
      value,
    };
  };

  for (let i = 0; i < count; i += 1) {
    const arrIndex = i % maxNow;
    batch.push(makeUniqueOption(optionLabels[arrIndex]));
  }
  return batch;
};

export const fruitsAndVegetables = [
  'apple',
  'banana',
  'orange',
  'grape',
  'strawberry',
  'watermelon',
  'kiwi',
  'pineapple',
  'mango',
  'peach',
  'carrot',
  'broccoli',
  'potato',
  'tomato',
  'cucumber',
  'lettuce',
  'spinach',
  'bell pepper',
  'eggplant',
  'zucchini',
  'blueberry',
  'raspberry',
  'blackberry',
  'avocado',
  'pear',
  'lemon',
  'lime',
  'cherry',
  'pumpkin',
  'apricot',
  'cranberry',
  'fig',
  'grapefruit',
  'guava',
  'honeydew',
  'kale',
  'nectarine',
  'olive',
  'papaya',
  'pea',
  'plum',
  'radish',
  'rutabaga',
  'tangerine',
  'turnip',
  'watercress',
  'yam',
  'yucca',
];

export const adjectives = [
  'sweet',
  'juicy',
  'ripe',
  'fresh',
  'tasty',
  'delicious',
  'crisp',
  'tangy',
  'fragrant',
  'colorful',
  'nutritious',
  'succulent',
  'flavorful',
  'sour',
  'satisfying',
  'exotic',
  'vibrant',
  'healthy',
  'aromatic',
  'wholesome',
  'tender',
  'zesty',
  'bitter',
  'spicy',
  'crunchy',
  'mellow',
  'sugary',
  'scented',
  'sapid',
  'mouthwatering',
];
