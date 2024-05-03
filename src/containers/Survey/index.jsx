import React, {useState, useEffect, useMemo, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Col, Container, Row} from 'react-bootstrap';
import {fetchSurveyListData, editSurveyElement, deleteSurveyElement, addSurveyElement} from './redux/actions';
import ItemEditModal from './components/form/ItemEditModal';
import SurveyListWrapper from './components/SurveyList';
import SurveySidebar from './components/SurveySidebar';
import DividerLine from './components/DividerLine';

const Survey = () => {
    const {t} = useTranslation('common');
    const [currentEditItem, setCurrentEditItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [filterByPriority, setFilterByPriority] = useState('');
    const [prevSurveyElements, setPrevSurveyElements] = useState(null);

    const {theme, surveyElements, isFetching} = useSelector(state => ({
        surveyElements: state.survey && state.survey.data && state.survey.data.elements && state.survey.data.elements.length > 0
            ? [...state.survey.data.elements]
            : [],
        isFetching: state.survey && state.survey.isFetching,
        theme: state.theme
    }));

    const dispatch = useDispatch();

    const editSurveyElementAction = (data) => {
        dispatch(editSurveyElement(data));
    };

    const addSurveyElementAction = (data) => {
        dispatch(addSurveyElement(data));
    };

    const deleteSurveyElementAction = (id) => {
        dispatch(deleteSurveyElement(id));
    };

    useEffect(() => {
        if (JSON.stringify(surveyElements) !== JSON.stringify(prevSurveyElements)) {
            if (surveyElements.length === 0 && prevSurveyElements === null) { // You can delete it if you need
                dispatch(fetchSurveyListData());
            }
            setPrevSurveyElements([...surveyElements]);
        }
    }, [prevSurveyElements, surveyElements, filterByPriority, dispatch]);

    const changeShowEditModal = (data) => {
        setShowEditModal(!showEditModal);
        setCurrentEditItem(data);
    };

    const filteringByPriority = (priority) => {
        setFilterByPriority(priority);
    };

    const incompleteSurveyElements = useMemo(() => {
        const surveys = surveyElements.filter(item => !item.data.isArchived && !item.data.isCompleted);
        if (filterByPriority !== '') {
            return surveys.filter(item => item.data.priority === filterByPriority);
        }
        return surveys;
    }, [surveyElements, filterByPriority]);

    const completedSurveyElements = useMemo(() => {
        const surveys = surveyElements.filter(item => !item.data.isArchived && item.data.isCompleted);
        if (filterByPriority !== '') {
            return surveys.filter(item => item.data.priority === filterByPriority);
        }
        return surveys;
    }, [surveyElements, filterByPriority]);

    const archivedSurveyElements = useMemo(() => surveyElements.filter(item => item.data.isArchived), [surveyElements]);

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <h3 className="page-title">{t('survey_application.page_title')}</h3>
                </Col>
            </Row>
            <Row>
                <Col md={9} xl={10}>
                    <Fragment>
                        <DividerLine title="Active"/>
                        <SurveyListWrapper
                            surveyElements={incompleteSurveyElements}
                            changeShowEditModal={changeShowEditModal}
                            editSurveyElementAction={editSurveyElementAction}
                            isFetching={isFetching}/>
                        <DividerLine title="Done"/>
                        <SurveyListWrapper
                            surveyElements={completedSurveyElements}
                            changeShowEditModal={changeShowEditModal}
                            editSurveyElementAction={editSurveyElementAction}
                            isFetching={isFetching}/>
                        <div>
                            <DividerLine title="Archived"/>
                            <SurveyListWrapper
                                isArchived
                                surveyElements={archivedSurveyElements}
                                editSurveyElementAction={editSurveyElementAction}
                                deleteSurveyElementAction={deleteSurveyElementAction}
                                isFetching={isFetching}/>
                        </div>
                    </Fragment>
                </Col>
                <Col md={3} xl={2}>
                    <SurveySidebar
                        changeShowEditModal={changeShowEditModal}
                        filterByPriority={filteringByPriority}/>
                </Col>
                <ItemEditModal
                    theme={theme}
                    showEditModal={showEditModal}
                    currentEditItem={currentEditItem && currentEditItem.data}
                    changeShowEditModal={changeShowEditModal}
                    surveyElements={surveyElements}
                    addSurveyElementAction={addSurveyElementAction}
                    editSurveyElementAction={editSurveyElementAction}/>
            </Row>
        </Container>
    );
};

export default Survey;
