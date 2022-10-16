import React from "react";

class StepTwo extends React.Component {
    render() {
        return (
            <div className="multisteps-form__panel" data-animation="slideHorz">
                <div className="wizard-forms section-padding">
                    <div className="inner pb-100 clearfix">
                        <div className="wizard-title text-center">
                            <h3>Please, enter your personal information</h3>
                            <p>has been a while. I would like to present you the project I work </p>
                        </div>
                        <div className="wizard-solution-select">
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="option_item">
                                        <input type="checkbox" className="checkbox" />
                                        <span className="option_inner">
                                            <span className="tickmark"></span>
                                            <span className="icon">
                                                <img src={require('../../assets/img/d1.png')} alt="" />
                                            </span>
                                            <span className="name">Minuteman Maintenance</span>
                                        </span>
                                    </label>
                                </div>
                                <div className="col-md-4">
                                    <label className="option_item">
                                        <input type="checkbox" className="checkbox" />
                                        <span className="option_inner">
                                            <span className="tickmark"></span>
                                            <span className="icon"><img src={require('../../assets/img/d1.png')} alt="" /></span>
                                            <span className="name">Minuteman Maintenance</span>
                                        </span>
                                    </label>
                                </div>
                                <div className="col-md-4">
                                    <label className="option_item">
                                        <input type="checkbox" className="checkbox" />
                                        <span className="option_inner">
                                            <span className="tickmark"></span>
                                            <span className="icon"><img src={require('../../assets/img/d1.png')} alt="" /></span>
                                            <span className="name">Minuteman Maintenance</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="wizard-note-subject pb-100">
                            <div className="wizard-form-input select-option-area">
                                <label>Select Subject</label>
                                <select>
                                    <option>Subject 1</option>
                                    <option>Subject 2</option>
                                    <option>Subject 3</option>
                                    <option>Subject 4</option>
                                </select>
                            </div>
                            <div className="wizard-form-input">
                                <label>Write Note</label>
                                <textarea></textarea>
                            </div>
                            <div className="wizard-form-input">
                                <div className="wizard-checked">
                                    <input type="radio" defaultChecked name="radio" />
                                    <span>I Have a US Tax ID (SSN)</span>
                                </div>
                                <div className="wizard-checked">
                                    <input type="radio" defaultChecked name="radio" />
                                    <span>I don’t have a US Tax ID (SSN)</span>
                                </div>
                            </div>
                        </div>
                        <div className="wizard-v3-progress">
                            <span>2 to 5 step</span>
                            <h3>38% to complete</h3>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: '38%' }}>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="vector-img-one">
                        <img src={require('../../assets/img/vb2.png')} alt="" />
                    </div>
                    <div className="actions">
                        <ul>
                            <li><span className="js-btn-prev" title="BACK"><i className="fa fa-arrow-left"></i> BACK </span></li>
                            <li><span className="js-btn-next" title="NEXT">NEXT <i className="fa fa-arrow-right"></i></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default StepTwo;