import React from 'react';
import Question from 'components/Question';

const Questions = ({ questions, currentUrl, scrollToElement, isDesktop }) => (
  <div className="questions row" id="questions">
    {questions.map((question, index) => (
      <Question
        key={`question-${question.id}`}
        {...question}
        position={index + 1}
        currentUrl={currentUrl}
        isCurrentQuestion={index + 1 === questions.length}
        scrollToElement={scrollToElement}
        isDesktop={isDesktop}
        disabled={question.disabled}
        menuTrigger={question.defaultValue}
      />
    ))}
    <div className="col-md-2 question">
      <div className="question-inner">
        <a
          onClick={(e) => {
            e.preventDefault();
            scrollToElement('#Results');
          }}
          className="btn-find-a-gift col-md-12"
        >
          FIND A GIFT
        </a>
      </div>
    </div>
  </div>
);

export default Questions;
