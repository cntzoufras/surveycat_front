import React from "react";

class StepFive extends React.Component {
    render() {
        return (
            <div className="multisteps-form__panel" data-animation="slideHorz">
                <div className="wizard-forms">
                    <div className="inner pb-100">
                        <div className="wizard-title text-center">
                            <h3>Choose Service Provider</h3>
                            <p>has been a while. I would like to present you the project I work </p>
                        </div>
                        <div className="wizard-day-item">
                            <span className="wizard-sub-text">Confirmation Service Via</span>
                            <div className="wizard-checkbox-option">
                                <ul>
                                    <li>
                                        <label className="block-option">
                                            <input type="checkbox" name="day-checkout" className="checked-checkbox" />
                                            <span className="checkbox-tick"></span>
                                            <span className="day-label">Sms</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="block-option">
                                            <input type="checkbox" name="day-checkout" className="checked-checkbox" />
                                            <span className="checkbox-tick"></span>
                                            <span className="day-label">Email Address</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="block-option">
                                            <input type="checkbox" name="day-checkout" className="checked-checkbox" />
                                            <span className="checkbox-tick"></span>
                                            <span className="day-label">Call Number</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="wizard-form-input mb-60 mt-60">
                            <div className="line line2"></div>
                        </div>
                        <div className="social-media-find">
                            <span className="wizard-sub-text">Confirmation Service Via</span>
                            <div className="social-find-caret">
                                <select>
                                    <option>Social media</option>
                                    <option>Social media</option>
                                    <option>Social media</option>
                                    <option>Social media</option>
                                </select>
                            </div>
                        </div>
                        <div className="wizard-v3-progress">
                            <span>5 to 5 step</span>
                            <h3>100% to complete</h3>
                            <div className="progress">
                                <div className="progress-bar" style={{width: '100%'}}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="vector-img-one position-relative">
                        <img src={require('../../assets/img/vb5.png')} alt="" />
                    </div>
                    <div className="actions mt-60">
                        <ul>
                            <li><span className="js-btn-prev" title="BACK"><i className="fa fa-arrow-left"></i> BACK </span></li>
                            <li><button title="NEXT">SUBMIT <i className="fa fa-arrow-right"></i></button></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default StepFive;