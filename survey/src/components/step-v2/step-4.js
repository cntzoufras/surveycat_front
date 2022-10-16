import React from "react";

class StepFour extends React.Component {
    render() {
        return (
            <div className="multisteps-form__panel" data-animation="slideVert">
                <div className="inner pb-100">
                    <div className="wizard-topper">
                        <div className="wizard-progress">
                            <span>4 of 5 Completed</span>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="wizard-content-item text-center">
                        <h2>Indentity Documents</h2>
                        <p>Please take a salfie with your document so that it’s clearly
									visible anddoses not cover your face.</p>
                    </div>
                    <div className="identity-option wizard-content-form">
                        <ul>
                            <li>
                                <label>
                                    <input type="checkbox" className="identity-check" defaultChecked />
                                    <span className="identity-label"></span>Investability Quotient Percentile
												<span className="checkmark-border"></span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" className="identity-check" />
                                    <span className="identity-label"></span>Investability Quotient Percentile
												<span className="checkmark-border"></span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" className="identity-check" />
                                    <span className="identity-label"></span>Investability Quotient Percentile
												<span className="checkmark-border"></span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" className="identity-check" />
                                    <span className="identity-label"></span>Investability Quotient Percentile
												<span className="checkmark-border"></span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" className="identity-check" />
                                    <span className="identity-label"></span>Investability Quotient Percentile
												<span className="checkmark-border"></span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" className="identity-check" />
                                    <span className="identity-label"></span>Investability Quotient Percentile
												<span className="checkmark-border"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="wizard-footer">
                        <div className="wizard-imgbg">
                            <img src={require('../../assets/img/v4.png')} alt="" />
                        </div>
                        <div className="actions">
                            <ul>
                                <li><span className="js-btn-prev" title="BACK"><i className="fa fa-arrow-left"></i> BACK</span></li>
                                <li><span className="js-btn-next" title="NEXT">NEXT <i className="fa fa-arrow-right"></i></span></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default StepFour;