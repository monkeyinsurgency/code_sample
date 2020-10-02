import { START_URL } from 'Constants';

export const getQuestionAnswerPairsFromUrl = (url) => {
  const p = url.split('/').slice(3);
  const pairs = p.slice(0, p.length - 1);

  return pairs.map((pair) => {
    let [questionID, answerIndex] = pair.split(',');

    if (typeof questionID !== 'undefined') {
      ({ questionID, answerIndex } = buildQuestionAnswerPair(
        questionID,
        answerIndex
      ));
    }

    return { questionID, answerIndex };
  });
};

export const getQuestionAnswerPairs = (params) => {
  let hasNext = true;
  let i = 1;
  const pairs = [];

  while (hasNext) {
    if (typeof params['q' + i] !== 'undefined') {
      pairs.push(buildQuestionAnswerPair(params['q' + i], params['a' + i]));

      hasNext = typeof params['q' + ++i] !== 'undefined';
    } else {
      hasNext = false;
    }
  }

  return pairs;
};

export const getStepUrl = (url, step) => {
  const pairs = getQuestionAnswerPairsFromUrl(url);

  let stepUrl = START_URL;

  if (step > pairs.length) {
    return;
  }

  for (let i = 1; i < step; i++) {
    stepUrl += pairs[i - 1].questionID + ',' + pairs[i - 1].answerIndex + '/';
  }

  return stepUrl;
};

export const getAnswerUrl = (currentUrl, id, index) => {
  let base = START_URL;
  const questionAnswerPairs = getQuestionAnswerPairsFromUrl(currentUrl);

  let thirdPair = '';

  if (
    questionAnswerPairs.length === 3 &&
    questionAnswerPairs[2].questionID !== id &&
    id !== 0
  ) {
    thirdPair =
      questionAnswerPairs[2].questionID +
      ',' +
      questionAnswerPairs[2].answerIndex +
      '/';
  }

  for (let i = 0; i < questionAnswerPairs.length; i++) {
    if (questionAnswerPairs[i].questionID !== id) {
      base +=
        questionAnswerPairs[i].questionID +
        ',' +
        questionAnswerPairs[i].answerIndex +
        '/';
    } else {
      break;
    }
  }

  const answerUrl = `${base}${id},${index}/${thirdPair}`;

  if (answerUrl === currentUrl) {
    return null;
  } else {
    return answerUrl;
  }
};

const buildQuestionAnswerPair = (questionIDRaw, answerIndexRaw) => {
  const questionID = parseInt(questionIDRaw, 10);
  const answerIndex = parseInt(answerIndexRaw, 10);

  return { questionID, answerIndex };
};
