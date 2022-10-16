import React from "react";

class StepThree extends React.Component {
    render() {
        return (
            <div className="multisteps-form__panel" data-animation="slideVert">
                <div className="inner pb-100">
                    <div className="wizard-topper">
                        <div className="wizard-progress">
                            <span>3 of 5 Completed</span>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="wizard-content-item text-center">
                        <h2>Indentity Documents</h2>
                        <p>Please take a salfie with your document so that it’s clearly
									visible anddoses not cover your face.</p>
                    </div>
                    <div className="wizard-identity wizard-content-form">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="wizard-identity-box identity-upload text-center">
                                    <div className="upload-icon">
                                        <i className="fas fa-cloud-upload-alt"></i>
                                    </div>
                                    <div className="upload-option text-center">
                                        <label htmlFor="file-images">Upload The Documents</label>
                                        <input id="file-images" style={{ display: 'none' }} type="file" />
                                        <span>.jpg or .pdf should
													be more than 500KB or 300PI</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="wizard-identity-box text-center">
                                    <div className="wizard-identity-icon">
                                        <img src={require('../../assets/img/vi1.png')} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wizard-footer">
                        <div className="wizard-imgbg">
                            <img src={require('../../assets/img/v3.png')} alt="" />
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

export default StepThree;