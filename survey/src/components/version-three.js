import React from "react";
import Step1 from "./step-v3/step-1";
import Step2 from "./step-v3/step-2";
import Step3 from "./step-v3/step-3";
import Step4 from "./step-v3/step-4";
import Step5 from "./step-v3/step-5";

class VersionThree extends React.Component {
  render() {
    return (
      <div className="wrapper wizard d-flex clearfix multisteps-form position-relative">
        <div className="steps order-2 position-relative w-25">
          <div className="multisteps-form__progress">
            <span className="multisteps-form__progress-btn js-active" title="Application data">
              <i className="far fa-user"></i>
              <span>Personal information</span>
            </span>
            <span className="multisteps-form__progress-btn" title="Tax residency">
              <i className="far fa-user"></i>
              <span>Solution Provider</span>
            </span>
            <span className="multisteps-form__progress-btn" title="Indentity documents">
              <i className="far fa-user"></i>
              <span>Personal information</span>
            </span>
            <span className="multisteps-form__progress-btn" title="Investability">
              <i className="far fa-user"></i>
              <span>Choose a payment</span>
            </span>
            <span className="multisteps-form__progress-btn" title="Review">
              <i className="far fa-user"></i>
              <span>Review </span>
            </span>
          </div>
        </div>
        <form className="multisteps-form__form w-75 order-1" action="#" id="wizard">
          <div className="form-area position-relative">
            <Step1 />
            <Step2 />
            <Step3 />
            <Step4 />
            <Step5 />
          </div>
        </form>
      </div>
    );
  }
}

export default VersionThree;
