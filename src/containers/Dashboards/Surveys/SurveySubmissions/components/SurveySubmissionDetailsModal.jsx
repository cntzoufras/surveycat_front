import React from 'react';
import moment from 'moment';
import Loading from '@/shared/components/Loading';
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
      return <Loading loading fullScreen={false} minHeight={24} />;
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
      return (
        <div className="alert alert-info">
          <i className="fas fa-info-circle" /> No answers were provided in this submission.
        </div>
      );
    }

    return (
      <div className="answers-list">
        {answerList.map(item => (
          <div key={item.id} className="mb-3 p-3 border rounded bg-light">
            <strong className="d-block mb-2 text-dark">{item.title}</strong>
            <span className="text-muted">{item.answer}</span>
          </div>
        ))}
      </div>
    );
  };

  const surveyTitle = submission?.survey_response?.survey?.title || 'Submission Details';

  const renderResponseData = () => {
    if (!submission?.survey_response) {
      return <p>No response data found.</p>;
    }

    const response = submission.survey_response;
    const respondent = response.respondent || {};

    return (
      <div className="response-data mb-4">
        <h5 className="mb-3 text-primary">Survey Response Details</h5>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-2">
              <strong className="text-muted">Response ID:</strong><br />
              <span className="text-monospace">{response.id || 'N/A'}</span>
            </div>
            <div className="mb-2">
              <strong className="text-muted">Started At (UTC):</strong><br />
              <span>
                {response.started_at
                  ? moment.utc(response.started_at).local().format('YYYY-MM-DD HH:mm:ss')
                  : 'N/A'}
              </span>
            </div>
            <div className="mb-2">
              <strong className="text-muted">Completed At (UTC):</strong><br />
              <span>
                {response.completed_at
                  ? moment.utc(response.completed_at).local().format('YYYY-MM-DD HH:mm:ss')
                  : 'N/A'}
              </span>
            </div>
            <div className="mb-2">
              <strong className="text-muted">Device:</strong><br />
              <span className="small text-monospace text-break">{response.device || 'N/A'}</span>
            </div>
            <div className="mb-2">
              <strong className="text-muted">Session ID:</strong><br />
              <span className="text-monospace">{response.session_id || 'N/A'}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-2">
              <strong className="text-muted">IP Address:</strong><br />
              <span className="text-monospace">{response.ip_address || 'N/A'}</span>
            </div>
            <div className="mb-2">
              <strong className="text-muted">Country:</strong><br />
              <span>{response.country || 'N/A'}</span>
            </div>
            <div className="mb-2">
              <strong className="text-muted">Respondent Email:</strong><br />
              <span>{respondent.email || 'N/A'}</span>
            </div>
            <div className="mb-2">
              <strong className="text-muted">Respondent ID:</strong><br />
              <span className="text-monospace">{respondent.id || 'N/A'}</span>
            </div>
          </div>
        </div>
        <hr className="my-4" />
      </div>
    );
  };

  return (
    <Modal show={isOpen} onHide={toggle} size="lg" centered>
      <ModalHeader closeButton>
        <h4 className="mb-0">{surveyTitle}</h4>
      </ModalHeader>
      <ModalBody className="p-4">
        {renderResponseData()}
        <div className="submission-data">
          <h5 className="mb-3 text-primary">Submission Answers</h5>
          {renderAnswers()}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
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
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      started_at: PropTypes.string,
      completed_at: PropTypes.string,
      device: PropTypes.string,
      session_id: PropTypes.string,
      ip_address: PropTypes.string,
      country: PropTypes.string,
      respondent: PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
      survey: PropTypes.shape({
        title: PropTypes.string,
        survey_pages: PropTypes.arrayOf(PropTypes.shape({
          survey_questions: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            question_type_id: PropTypes.number.isRequired,
            survey_question_choices: PropTypes.arrayOf(PropTypes.shape({
              id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
