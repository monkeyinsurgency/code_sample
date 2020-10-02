import React, { Component } from 'react';
import Select from 'react-select';
import { browserHistory } from 'react-router';
import { tracker } from 'utils/GiftFinder';

import * as Url from 'utils/url';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    };
  }

  componentDidMount() {
    let pathHack = this.props.currentUrl.split('/');
    if (
      (!this.state.disabled &&
        !this.props.answerIndex &&
        this.props.currentUrl !== '/fathers-day/start/0,0/' &&
        pathHack.length <= 6) ||
      (this.state.disabled &&
        this.props.id === 9 &&
        !this.props.answerIndex &&
        this.props.currentUrl !== '/fathers-day/start/0,0/' &&
        pathHack.length <= 6)
    ) 
    {
      browserHistory.push({
        pathname: Url.getAnswerUrl(this.props.currentUrl, this.props.id, 0),
        search: window.location.search,
      });
    }
  }

  render() {
    const { id, text, answers, currentUrl, position, answerIndex } = this.props;

    let selectOptions = [];

    answers && answers.map(({ text }, index) => {
      selectOptions.push({
        value: index,
        label: text,
      });
    });

    if (selectOptions.length > 1) {
      this.state.disabled = false;
    }

    const customStyle = {
      singleValue: (provided, state) => ({
        ...provided,
        color: '#000',
        textAlign: 'center',
        width: '100%',
      }),
      container: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDisabled ? '#DFDACF' : '#fff',
      }),
      control: (provided, state) => ({
        ...provided,
        backgroundColor: 'none',
        border: 'none !important',
        outline: '0 !important',
        boxShadow: 'none !important',
        marginLeft: -2,
        marginRight: -2,
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#fff' : '#000',
        backgroundColor: state.isSelected ? '#ba4c1f' : '#fff !important',
        '&:hover': {
          backgroundColor: '#dc6230 !important',
          color: '#fff',
        },
        '@media (max-width: 991px)': {
          borderBottom: '1px solid #879369',
          ':last-child': {
            borderBottom: 'none',
          },
        },
      }),
      menu: (provided, state) => ({
        ...provided,
        background: '#FFFFFF',
        border: '1px solid #879369',
        borderRadius: '4px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.16)',
        padding: '2px 0',
      }),
    };

    return (
      <div
        className={`question col-md-${position === 1 ? 4 : 3}`}
        ref="question"
        id={`question-${position}`}
      >
        <div className={`question-inner`}>
          <h3 className={this.state.disabled ? 'disabled' : ''}>{text}</h3>
          <Select
            value={selectOptions[answerIndex]}
            options={selectOptions}
            isSearchable={false}
            onChange={(val) => {
              if (
                !selectOptions[answerIndex] ||
                selectOptions[answerIndex].value !== val.value
              ) {
                tracker('Answer Selected', val.label, 1);
                browserHistory.push(
                  Url.getAnswerUrl(currentUrl, id, val.value)
                );
              }
            }}
            isDisabled={this.state.disabled}
            defaultValue={
              answerIndex ? selectOptions[answerIndex] : selectOptions[0]
            }
            className={`answers${this.state.disabled ? ' disabled' : ''}`}
            styles={customStyle}
          />
        </div>
      </div>
    );
  }
}

export default Question;
