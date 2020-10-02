const question0 = {
  id: 0,
  text: 'What type of gift do you want?',
  answers: [
    {
      text: 'Our recommended gifts',
      qNext: 1,
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Whisky',
      qNext: 3,
      queryFilters: [{ type: 'whiskyFilter', parameters: {} }],
    },
    {
      text: 'Gin',
      qNext: 5,
      queryFilters: [{ type: 'ginFilter', parameters: {} }],
    },
    {
      text: 'Rum',
      qNext: 7,
      queryFilters: [{ type: 'rumFilter', parameters: {} }],
    },
    {
      text: 'Tasting Sets',
      qNext: 9,
      queryFilters: [{ type: 'tastingSetsFilter', parameters: {} }],
    },
    {
      text: 'Cocktails',
      qNext: 11,
      queryFilters: [{ type: 'cocktailsFilter', parameters: {} }],
    },
    {
      text: 'Other',
      qNext: 13,
      queryFilters: [{ type: 'otherFilter', parameters: {} }],
    },
  ],
};

const question1 = {
  id: 1,
  text: 'How much do you want to spend?',
  answers: [
    {
      text: 'Any price',
      qNext: 2,
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
  ],
};

const question2 = {
  id: 2,
  text: 'Do you have any preferences?',
  answers: [
    {
      text: 'No preference',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
  ],
};

const question3 = {
  id: 3,
  text: 'How much do you want to spend?',
  answers: [
    {
      text: 'Any price',
      qNext: 4,
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Up to £40',
      qNext: 4,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 40 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '40' },
        },
      ],
    },
    {
      text: 'Up to £60',
      qNext: 4,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 60 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '60' },
        },
      ],
    },
    {
      text: 'Up to £100',
      qNext: 4,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 100 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '100' },
        },
      ],
    },
    {
      text: 'Up to £250',
      qNext: 4,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 250 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '250' },
        },
      ],
    },
    {
      text: 'Over £250',
      qNext: 4,
      queryFilters: [
        {
          type: 'rangeGTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '250' },
        },
      ],
    },
  ],
};

const question4 = {
  id: 4,
  text: 'Do you have any preferences?',
  answers: [
    {
      text: 'No preference',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Single Malt Scotch',
      queryFilters: [
        {
          type: 'termFilter',
          parameters: { fieldname: 'countryid', fieldvalue: '17' },
        },
        {
          type: 'termFilter',
          parameters: { fieldname: 'styleid', fieldvalue: 8 },
        },
      ],
    },
    {
      text: 'Smoky/Peaty',
      queryFilters: [
        {
          type: 'termsFilter',
          parameters: {
            fieldname: 'distilleryid',
            fieldvalue: '169,171,172,175,176,177,178,194,557',
          },
        },
        {
          type: 'termFilter',
          parameters: { fieldname: 'countryid', fieldvalue: '17' },
        },
      ],
    },
    {
      text: 'Around the world',
      queries: [
        {
          type: 'tags',
          parameters: { values: '21', boost: 2 },
        },
        {
          type: 'match_all', // use because in the >maxprice range, there are no other queries and it will match only the tagged ones
          parameters: {},
        },
      ],
      queryFilters: [
        {
          type: 'NOTtermFilter',
          parameters: { fieldname: 'countryid', fieldvalue: '17' },
        },
      ],
    },
  ],
};

const question5 = {
  id: 5,
  text: 'How much do you want to spend?',
  answers: [
    {
      text: 'Any price',
      qNext: 6,
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Up to £25',
      qNext: 6,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 25 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '25' },
        },
      ],
    },
    {
      text: 'Up to £35',
      qNext: 6,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 35 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '35' },
        },
      ],
    },
    {
      text: 'Up to £50',
      qNext: 6,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 50 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '50' },
        },
      ],
    },
    {
      text: 'Over £50',
      qNext: 6,
      queryFilters: [
        {
          type: 'rangeGTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '50' },
        },
      ],
    },
  ],
};

const question6 = {
  id: 6,
  text: 'Do you have any preferences?',
  answers: [
    {
      text: 'No preference',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'London Dry/Distilled',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Flavoured/Liqueurs',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Contemporary/Other',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
  ],
};

const question7 = {
  id: 7,
  text: 'How much do you want to spend?',
  answers: [
    {
      text: 'Any price',
      qNext: 8,
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Up to £25',
      qNext: 8,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 25 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '25' },
        },
      ],
    },
    {
      text: 'Up to £35',
      qNext: 8,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 35 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '35' },
        },
      ],
    },
    {
      text: 'Up to £50',
      qNext: 8,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 50 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '50' },
        },
      ],
    },
    {
      text: 'Over £50',
      qNext: 8,
      queryFilters: [
        {
          type: 'rangeGTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '50' },
        },
      ],
    },
  ],
};

const question8 = {
  id: 8,
  text: 'Do you have any preferences?',
  answers: [
    {
      text: 'No preference',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Aged/Dark',
      queryFilters: [
        {
          type: 'termFilter',
          parameters: { fieldname: 'styleid', fieldvalue: 1781 },
        },
      ],
    },
    {
      text: 'Unaged/White',
      queryFilters: [
        {
          type: 'termFilter',
          parameters: { fieldname: 'styleid', fieldvalue: 1780 },
        },
      ],
    },
    {
      text: 'Spiced/Flavoured',
      queryFilters: [
        {
          type: 'termFilter',
          parameters: { fieldname: 'styleid', fieldvalue: 1947 },
        },
      ],
    },
  ],
};

const question9 = {
  id: 9,
  text: 'How much do you want to spend?',
  answers: [
    {
      text: 'Any price',
      qNext: 10,
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
  ],
};

const question10 = {
  id: 10,
  text: 'Do you have any preferences?',
  answers: [
    {
      text: 'No preference',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Whisky',
      queryFilters: [
        {
          type: 'termFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '1901' },
        },
      ],
    },
    {
      text: 'Gin',
      queryFilters: [
        {
          type: 'termFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '2261' },
        },
      ],
    },
    {
      text: 'Other',
      queryFilters: [
        {
          type: 'NOTtermFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '1901' },
        },
        {
          type: 'NOTtermFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '2261' },
        },
        {
          type: 'NOTtermFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '8' },
        },
        {
          type: 'NOTtermFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '1764' },
        },
        {
          type: 'NOTtermFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '9' },
        },
        {
          type: 'NOTtermFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '10' },
        },
        {
          type: 'NOTtermFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '1763' },
        },
        {
          type: 'NOTtermFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '1771' },
        },
        {
          type: 'NOTtermFilter',
          parameters: { fieldname: 'styleid', fieldvalue: '1772' },
        },
      ],
    },
  ],
};

const question11 = {
  id: 11,
  text: 'How much do you want to spend?',
  answers: [
    {
      text: 'Any price',
      qNext: 12,
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Up to £30',
      qNext: 12,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 30 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '30' },
        },
      ],
    },
    {
      text: 'Over £30',
      qNext: 12,
      queryFilters: [
        {
          type: 'rangeGTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '30' },
        },
      ],
    },
  ],
};

const question12 = {
  id: 12,
  text: 'Do you have any preferences?',
  answers: [
    {
      text: 'No preference',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Negroni',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Old Fashioned',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Other Gin Cocktails',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Other Whisky Cocktails',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'All Other Cocktails',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
  ],
};

const question13 = {
  id: 13,
  text: 'How much do you want to spend?',
  answers: [
    {
      text: 'Any price',
      qNext: 14,
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Up to £25',
      qNext: 14,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 25 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '25' },
        },
      ],
    },
    {
      text: 'Up to £35',
      qNext: 14,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 35 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '35' },
        },
      ],
    },
    {
      text: 'Up to £50',
      qNext: 14,
      queries: [
        {
          type: 'pricerange',
          parameters: { minVal: 0, maxVal: 50 },
        },
      ],
      queryFilters: [
        {
          type: 'rangeLTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '50' },
        },
      ],
    },
    {
      text: 'Over £50',
      qNext: 14,
      queryFilters: [
        {
          type: 'rangeGTEFilter',
          parameters: { fieldname: 'price', fieldvalue: '50' },
        },
      ],
    },
  ],
};

const question14 = {
  id: 14,
  text: 'Do you have any preferences?',
  answers: [
    {
      text: 'No preference',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
    {
      text: 'Brandy/Cognac',
      queryFilters: [{ type: 'brandyCognacFilter', parameters: {} }],
    },
    {
      text: 'Vodka',
      queryFilters: [{ type: 'vodkaCognacFilter', parameters: {} }],
    },
    {
      text: 'Tequila/Mezcal',
      queryFilters: [{ type: 'tequilaMezcalCognacFilter', parameters: {} }],
    },
    {
      text: 'Beer, Wine, Liqueurs and more',
      queries: [
        {
          type: 'match_all',
          parameters: {},
        },
      ],
    },
  ],
};

/* Hidden question 100 is for the bottom of the Fathers Day landing page */

const question100 = {
  id: 100,
  text: 'How much do you want to spend?',
  defaultValue: 'Any price',
  answers: [
    {
      text: 'Any price',
    },
  ],
  disabled: false,
};

const question101 = {
  id: 101,
  text: 'Do you have any preferences?',
  defaultValue: 'No preference',
  answers: [
    {
      text: 'No preference',
    },
  ],
  disabled: false,
};

export const questions = [
  question0,
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8,
  question9,
  question10,
  question11,
  question12,
  question13,
  question14,
  question100,
  question101,
];
