import React from "react";

class StepOne extends React.Component {
    
    readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#profile-image')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
        

    render() {
        return (
            <div className="multisteps-form__panel js-active" data-animation="slideHorz">
                <div className="wizard-forms">
                    <div className="inner pb-100 clearfix">
                        <div className="wizard-title text-center">
                            <h3>Please, enter your personal information</h3>
                            <p>has been a while. I would like to present you the project I work </p>
                        </div>
                        <div className="wizard-photo-area">
                            <div className="wizard-photo-upload position-relative">
                                <label htmlFor="files">Upload Image</label>
                                <input id="files" type="file" onClick={this.readURL} style={{display: 'none'}} />
                                <div className="display-img text-center">
                                    <img id="profile-image" src={require('../../assets/img/pf1.png')} alt="your image" />
                                </div>
                            </div>
                            <div className="photo-upload-text">has been a while. I would like to present you the project I work on a few
                                </div>
                        </div>
                        <div className="wizard-form-field mb-85">
                            <div className="wizard-form-input">
                                <label>Name</label>
                                <input type="text" name="name" />
                            </div>
                            <div className="wizard-form-input">
                                <label>Email</label>
                                <input type="email" name="email" />
                            </div>
                            <div className="wizard-form-input mb-60 mt-60">
                                <div className="line"></div>
                            </div>
                            <div className="wizard-form-input">
                                <label>What are you?</label>
                                <div className="wizard-checked">
                                    <label className="checkbox-circle">
                                        <input type="radio" defaultChecked name="student_type" value="University Student" />
                                        <span className="checkmark"></span>
                                            University Student
                                        </label>
                                </div>
                                <div className="wizard-checked">
                                    <label className="checkbox-circle">
                                        <input type="radio" name="student_type" value="Professional" />
                                        <span className="checkmark"></span>
                                            Professional
                                        </label>
                                </div>
                            </div>
                            <div className="wizard-form-input">
                                <label>University</label>
                                <input type="email" name="email" />
                            </div>
                            <div className="wizard-form-input">
                                <label>Major</label>
                                <input type="email" name="email" />
                            </div>
                            <div className="wizard-form-input">
                                <label>Graduation Date</label>
                                <input type="email" name="email" />
                            </div>
                            <div className="wizard-form-input mb-60 mt-60">
                                <div className="line"></div>
                            </div>
                            <div className="wizard-form-input">
                                <label>Do you have a Tax ID?</label>
                                <div className="wizard-checked">
                                    <label className="checkbox-circle">
                                        <input type="radio" defaultChecked name="ssn" value="I Have a US Tax ID (SSN)" />
                                        <span className="checkmark"></span>
                                        <span>I Have a US Tax ID (SSN)</span>
                                    </label>
                                </div>
                                <div className="wizard-checked">
                                    <label className="checkbox-circle">
                                        <input type="radio" name="ssn" value="I Don't have a US Tax ID (SSN)" />
                                        <span className="checkmark"></span>
                                        <span>I don’t have a US Tax ID (SSN)</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-field-text">has been a while. I would like to present you the
                            project I work on a few
                            months ago.
                                </div>
                        </div>
                        <div className="wizard-v3-progress">
                            <span>1 to 5 step</span>
                            <h3>0% to complete</h3>
                            <div className="progress">
                                <div className="progress-bar" style={{width: '0%'}}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="vector-img-one">
                        <img src={require('../../assets/img/vb1.png')} alt="" />
                    </div>
                    <div className="actions">
                        <ul>
                            <li><span className="js-btn-next" title="NEXT">NEXT <i className="fa fa-arrow-right"></i></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default StepOne;