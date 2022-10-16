import React from "react";

class StepTwo extends React.Component {
    render() {
        return (
            <div className="multisteps-form__panel" data-animation="slideVert">
                <div className="inner pb-100">
                    <div className="wizard-topper">
                        <div className="wizard-progress">
                            <span>2 of 5 Completed</span>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="wizard-content-item text-center">
                        <h2>Tax Residency</h2>
                        <p>Tell us about your Tax details. This is important
									for both for us</p>
                    </div>
                    <div className="wizard-option-list wizard-content-form">
                        <ul>
                            <li>
                                <div className="option-item-list">
                                    <select>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                    </select>
                                </div>
                            </li>
                            <li className="nationality-list">
                                <div className="option-item-list">
                                    <select>
                                        <option>Nationality</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="option-item-list">
                                    <select>
                                        <option>Other Nationalities</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="option-item-list">
                                    <select>
                                        <option>Other Nationalities</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="option-item-list">
                                    <select>
                                        <option>Tax Identification Number</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                        <option>Occupational Group</option>
                                    </select>
                                </div>
                            </li>
                            <li className="no-arrow">
                                <div className="n-activity">
                                    <label>
                                        <span className="n-title">Network Activity</span>
                                        <input type="checkbox" className="net-check" />
                                        <span className="net-check-border"></span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                        <div className="upload-araa">
                            <div className="upload-text float-left">
                                <span>Proof your NTN Tax id certificate</span>
                            </div>
                            <div className="upload-option text-center float-right">
                                <label htmlFor="files">Upload PDF</label>
                                <input id="files" style={{display: 'none'}} type="file" />
                            </div>
                        </div>
                        <div className="taxable-area">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>
                                        <input type="checkbox" className="tax-check" defaultChecked value="Taxable in the US?" />
                                        <span className="checkbo-box-border"></span>
                                        <span className="texable-option">
                                            Taxable in the US?
													</span>
                                    </label>
                                </div>
                                <div className="col-md-4">
                                    <label>
                                        <input type="checkbox" className="tax-check" value="Taxable in the US?" />
                                        <span className="checkbo-box-border"></span>
                                        <span className="texable-option">
                                            Taxable in the US?
													</span>
                                    </label>
                                </div>
                                <div className="col-md-4">
                                    <label>
                                        <input type="checkbox" className="tax-check" value="Taxable in the US?" />
                                        <span className="checkbo-box-border"></span>
                                        <span className="texable-option">
                                            Taxable in the US?
													</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wizard-footer">
                        <div className="wizard-imgbg">
                            <img src={require('../../assets/img/v2.png')} alt="" />
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

export default StepTwo;