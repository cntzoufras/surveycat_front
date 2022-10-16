import React from "react";

class StepFive extends React.Component {
    render() {
        return (
            <div className="multisteps-form__panel" data-animation="slideVert">
                <div className="inner pb-100">
                    <div className="wizard-topper">
                        <div className="wizard-progress">
                            <span>5 of 5 Completed</span>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="wizard-content-item text-center">
                        <h2>Submit Final</h2>
                        <p>Please take a salfie with your document so that it’s clearly
									visible anddoses not cover your face.</p>
                    </div>
                    <div className="wizard-submit-file-content wizard-content-form">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="n-summary">
                                    <span>Notification Summary</span>
                                    <label>
                                        <input type="radio" defaultChecked name="radio" />
                                        <span className="checkmark">Yes</span>
                                    </label>
                                    <label>
                                        <input type="radio" defaultChecked name="radio" />
                                        <span className="checkmark">Yes</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="n-activity tooltip-info">
                                    <label>
                                        <i data-toggle="tooltip" data-placement="bottom" title="If you want your invoice address to a compnay. Leave blank to use full name" className="fa fa-info"></i>
                                        <input type="checkbox" className="net-check" />
                                        <span className="n-title">Network Activity</span>
                                        <span className="net-check-border"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="n-checked">
                                    <span>Daily Creative Challenge</span>
                                    <label>
                                        <input type="radio" value="Daily Creative Challenge" />
                                        <span className="checkmark">Announcements and special offers </span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="n-checked">
                                    <span>Daily Creative Challenge</span>
                                    <label>
                                        <input type="radio" value="Notification" />
                                        <span className="checkmark">Talent Notifications</span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="n-select-option">
                                    <select>
                                        <option>Give Hours</option>
                                        <option>Give Hours</option>
                                        <option>Give Hours</option>
                                        <option>Give Hours</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="n-select-option">
                                    <select>
                                        <option>Talent Notifications</option>
                                        <option>Give Hours</option>
                                        <option>Give Hours</option>
                                        <option>Give Hours</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="n-select-option">
                                    <select>
                                        <option>Support for months</option>
                                        <option>Give Hours</option>
                                        <option>Give Hours</option>
                                        <option>Give Hours</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wizard-footer">
                        <div className="wizard-imgbg float-left">
                            <img src={require('../../assets/img/v5.png')} alt="" />
									</div>
                            <div className="actions">
                                <ul>
                                    <li><span className="js-btn-prev" title="BACK"><i className="fa fa-arrow-left"></i> BACK</span></li>
                                    <li><button type="submit" id="submit-form" title="NEXT">SUMBIT <i className="fa fa-arrow-right"></i></button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
           );
    }
}

export default StepFive;