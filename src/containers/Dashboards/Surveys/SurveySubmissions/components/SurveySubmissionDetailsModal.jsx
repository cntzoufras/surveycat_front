import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
} from 'react-bootstrap';

const SurveySubmissionDetailsModal = ({
 isOpen, toggle, submission, loading, 
}) => {
  if (!submission && !loading) {
    return null;
  }

  const renderAnswers = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!submission || !submission.submission_data || !submission.survey_response) {
      return <p>No submission data found.</p>;
    }

    let parsedData;
    try {
      // This simple, robust block handles all cases:
      // 1. Already an object: it's used directly.
      // 2. String: it's parsed once.
      // 3. Double-encoded string: it's parsed twice.
      let data = submission.submission_data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      parsedData = data;
    } catch (e) {
      console.error('Failed to parse submission data:', e);
      return <p>Could not read submission answers.</p>;
    }

    // Ensure parsedData is an object before proceeding
    if (typeof parsedData !== 'object' || parsedData === null) {
        return <p>Could not read submission answers.</p>;
    }

    // Handle two different data structures:
    // 1. Seeded data: answers are at the root level
    // 2. User submissions: answers are nested in submission_data.answers
    let answersMap;
    if (parsedData.answers) {
      // User-submitted data structure
      answersMap = parsedData.answers;
    } else if (parsedData.submission_data && typeof parsedData.submission_data === 'string') {
      // Double-nested structure - parse the inner submission_data
      try {
        const innerData = JSON.parse(parsedData.submission_data);
        answersMap = innerData.answers || innerData;
      } catch (e) {
        console.error('Failed to parse inner submission data:', e);
        return <p>Could not read submission answers.</p>;
      }
    } else {
      // Seeded data structure - answers are at root level
      answersMap = parsedData;
    }

    const questions = submission.survey_response.survey?.survey_pages?.flatMap(p => p.survey_questions) || [];
    if (questions.length === 0) {
      return <p>No questions found for this survey.</p>;
    }

    const choicesMap = new Map();
    questions.forEach((q) => {
      q.survey_question_choices?.forEach((c) => {
        choicesMap.set(c.id, c.content);
      });
    });

    const answerList = questions
      .map((q) => {
        const answerValue = answersMap[q.id];
        if (answerValue === undefined || answerValue === null || answerValue === '') {
          return null;
        }

        let displayAnswer;
        // For rating and slider questions, the answer is the value itself.
        if (q.question_type_id === 4 || q.question_type_id === 5) {
          displayAnswer = answerValue;
        } else if (Array.isArray(answerValue)) {
          // For multiple choice, map choice IDs to content.
          displayAnswer = answerValue.map(val => choicesMap.get(val) || val).join(', ');
        } else if (choicesMap.has(answerValue)) {
          // For single choice, get the choice content.
          displayAnswer = choicesMap.get(answerValue);
        } else {
          // For open-ended questions, the answer is the raw text.
          displayAnswer = answerValue;
        }

        return {
          id: q.id,
          title: q.title,
          answer: displayAnswer,
        };
      })
      .filter(Boolean);

    if (answerList.length === 0) {
      return <p>No answers were provided in this submission.</p>;
    }

    return (
      <ul>
        {answerList.map(item => (
          <li key={item.id}>
            <strong>{item.title}:</strong> {item.answer}
          </li>
        ))}
      </ul>
    );
  };

  const surveyTitle = submission?.survey_response?.survey?.title || 'Submission Details';

  return (
    <Modal show={isOpen} onHide={toggle}>
      <ModalHeader closeButton>{surveyTitle}</ModalHeader>
      <ModalBody>{renderAnswers()}</ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

SurveySubmissionDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  submission: PropTypes.shape({
    submission_data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    survey_response: PropTypes.shape({
      survey: PropTypes.shape({
        title: PropTypes.string,
        survey_pages: PropTypes.arrayOf(PropTypes.shape({
          survey_questions: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            question_type_id: PropTypes.number.isRequired,
            survey_question_choices: PropTypes.arrayOf(PropTypes.shape({
              id: PropTypes.string.isRequired,
              content: PropTypes.string.isRequired,
            })),
          })),
        })),
      }),
    }),
  }),
};

SurveySubmissionDetailsModal.defaultProps = {
  submission: null,
  loading: false,
};

export default SurveySubmissionDetailsModal;
