import React, { useState } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Question from '../question';
import './questions.css';

const GET_QUESTIONS_QUERY = gql`query {
    questionsList {
        items {
            question
            options
            answer
            image {
                downloadUrl
            }
        }
    }
}`;

const Questions = ({ questions }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showFinished, setShowFinished] = useState(false);
    const currentQuestion = questions[currentIndex];

    const onNextClicked = selectedOption => {
        if (currentQuestion.answer === selectedOption) {
            setScore(score + 1);
        }

        if (currentIndex + 1 > questions.length - 1) {
            setShowFinished(true);
            return;
        }

        setCurrentIndex(currentIndex + 1);
    };

    const resetQuiz = () => {
        setCurrentIndex(0);
        setShowFinished(false);
        setScore(0);
    }

    return questions.length ? (
        <div>
            {showFinished ? (
                <div className="results">
                    <img src="https://ak6.picdn.net/shutterstock/videos/6611576/thumb/1.jpg" alt="Your watch has ended" />
                    <h3>Your results are out. You scored {score} out of {questions.length}</h3>
                </div>
            ) : (
                <Question onNextClicked={onNextClicked} question={currentQuestion} key={currentQuestion.id} />
            )}
            {showFinished ? (
                <button className="try-again" onClick={resetQuiz}>
                    Restart
                </button>
            ) : (
                <div className="questions-progress">
                    {currentIndex + 1} / {questions.length}
                </div>
            )}
        </div>
    ) : (
        <p className="loading-style">Loading...</p>
    );
};

export default graphql(GET_QUESTIONS_QUERY, {
    props: result => {
        const { loading, data } = result;
        let items = [];
        if (data && data.questionsList) items = data.questionsList.items;
        return {
            loading,
            questions: items
        };
    }
})(Questions);