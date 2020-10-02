import * as Url from 'utils/url';
import { questions } from 'data/questions';

export const getAnswersQuery = (params, currentQuery) => {
  const questionAnswerPairs = Url.getQuestionAnswerPairs(params);

  if (questionAnswerPairs.length === 0) {
    return;
  }

  const QuestionAnswerPath = questionAnswerPairs
    .map((p) => p.questionID + ',' + p.answerIndex)
    .join(':');

  if (
    currentQuery !== null &&
    QuestionAnswerPath === currentQuery.QuestionAnswerPath
  ) {
    return currentQuery;
  }

  const Answers = questionAnswerPairs.map((p) => {
    const { queries, filters, queryFilters } = findQuestion(
      p.questionID
    ).answers[p.answerIndex];

    return { queries, filters, queryFilters };
  });

  const currentQuestionAnswerPair =
    questionAnswerPairs[questionAnswerPairs.length - 1];

  return {
    Answers,
    QuestionAnswerPath,
    AnswerId: currentQuestionAnswerPair.answerIndex,
    QuestionID: currentQuestionAnswerPair.questionID,
    isVATableCountry: mom.cookie.IsVATableCountry === '1',
    deliveryCountryID: mom.cookie.CountryID,
    giftFinderType: 'seasonal',
  };
};

export const buildQuestions = (params) => {
  const questions = buildHistory(params);

  const previousQuestion = questions[questions.length - 1];
  const hasPreviousQuestion = typeof previousQuestion !== 'undefined';

  // If we have a previous question, lookup the next
  if (hasPreviousQuestion) {
    const previousAnswerIndex = previousQuestion.answerIndex;
    const nextQuestionID = previousQuestion.answers[previousAnswerIndex].qNext;
    const hasNextQuestion = typeof nextQuestionID !== 'undefined';

    // If there is a next question add it
    if (hasNextQuestion) {
      // Build next question
      questions.push(buildQuestion(nextQuestionID));
      if (questions.length === 2) {
        questions.push(buildQuestion(101));
      }
    }
  } else {
    // First Question
    questions.push(buildQuestion(0));
    questions.push(buildQuestion(100));
    questions.push(buildQuestion(101));
  }

  return questions;
};

const buildHistory = (params) =>
  Url.getQuestionAnswerPairs(params).map(({ questionID, answerIndex }) =>
    buildQuestion(questionID, answerIndex)
  );

const buildQuestion = (questionID, answerIndex) => {
  const question = findQuestion(questionID);

  return Object.assign({}, question, { answerIndex });
};

const findQuestion = (id) => {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].id === id) {
      return questions[i];
    }
  }
};

export const tracker = getAnalyticsTracker('FathersDay');
