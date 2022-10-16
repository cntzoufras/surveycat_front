import React from "react";

class StepThree extends React.Component {
    render() {
        return (
            <div className="multisteps-form__panel" data-animation="slideHorz">
                <div className="wizard-forms">
                    <div className="inner pb-100 clearfix">
                        <div className="wizard-title text-center">
                            <h3>Please, enter your personal information</h3>
                            <p>has been a while. I would like to present you the project I work </p>
                        </div>
                        <div className="wizard-form-input select-caret">
                            <select>
                                <option>Subject 1</option>
                                <option>Subject 2</option>
                                <option>Subject 3</option>
                                <option>Subject 4</option>
                            </select>
                        </div>
                        <div className="wizard-form-input mb-60 mt-60">
                            <div className="line line2"></div>
                        </div>
                        <div className="wizard-duration mb-60">
                            <span className="wizard-sub-text">Duration Services</span>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="duration-option">
                                        <input type="radio" name="duration-service" value="4 weeks" className="d-checkbox" />
                                        <span className="checkbox-circle-tick"></span>
                                        <span className="duration-box text-center">
                                            <span className="title">4</span>
                                            <span>Weeks</span>
                                        </span>
                                    </label>
                                </div>
                                <div className="col-md-4">
                                    <label className="duration-option">
                                        <input type="radio" name="duration-service" value="6 weeks" className="d-checkbox" />
                                        <span className="checkbox-circle-tick"></span>
                                        <span className="duration-box text-center">
                                            <span className="title">6</span>
                                            <span>Weeks</span>
                                        </span>
                                    </label>
                                </div>
                                <div className="col-md-4">
                                    <label className="duration-option">
                                        <input type="radio" name="duration-service" value="9 weeks" className="d-checkbox" />
                                        <span className="checkbox-circle-tick"></span>
                                        <span className="duration-box text-center">
                                            <span className="title">9</span>
                                            <span>Weeks</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="wizard-form-input mb-60 mt-60">
                            <div className="line line2"></div>
                        </div>
                        <div className="wizard-day-item">
                            <span className="wizard-sub-text">Choose the included services</span>
                            <div className="wizard-checkbox-option">
                                <ul>
                                    <li>
                                        <label className="block-option">
                                            <input type="checkbox" name="day-checkout" className="checked-checkbox" />
                                            <span className="checkbox-tick"></span>
                                            <span className="day-label">Select Day</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="block-option">
                                            <input type="checkbox" name="day-checkout" className="checked-checkbox" />
                                            <span className="checkbox-tick"></span>
                                            <span className="day-label">Select Day</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="block-option">
                                            <input type="checkbox" name="day-checkout" className="checked-checkbox" />
                                            <span className="checkbox-tick"></span>
                                            <span className="day-label">Select Day</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="block-option">
                                            <input type="checkbox" name="day-checkout" className="checked-checkbox" />
                                            <span className="checkbox-tick"></span>
                                            <span className="day-label">Select Day</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="wizard-form-input mb-60 mt-60">
                            <div className="line line2"></div>
                        </div>
                        <div className="wizard-document-upload pb-200">
                            <span className="wizard-sub-text">Upload the documents</span>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="customFile" />
                                <label className="custom-file-label" htmlFor="customFile">jpg or .pdf should  be more than 500KB or 300PI</label>
                            </div>
                        </div>
                        <div className="wizard-v3-progress">
                            <span>3 to 5 step</span>
                            <h3>59% to complete</h3>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: '59%' }}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="vector-img-one">
                        <img src={require('../../assets/img/vb3.png')} alt="" />
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

export default StepThree;