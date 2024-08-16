import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BasicForm from '../../../Form/ReactFinalForm/BasicForm/index';
import CheckFormControls from '../../../Form/ReactFinalForm/CheckFormControls/index';
import FileUpload from '../../../Form/ReactFinalForm/FileUpload/index';
import FloatingLabelsForm from '../../../Form/ReactFinalForm/FloatingLabelsForm/index';
import FormDropzone from '../../../Form/ReactFinalForm/FormDropzone/index';
import FormLayouts from '../../../Form/ReactFinalForm/FormLayouts/index';
import FormPicker from '../../../Form/ReactFinalForm/FormPicker/index';
import FormValidation from '../../../Form/ReactFinalForm/FormValidation/index';
import MaskForm from '../../../Form/ReactFinalForm/MaskForm/index';
import MaterialForm from '../../../Form/ReactFinalForm/MaterialForm/index';
import WizardForm from '../../../Form/ReactFinalForm/WizardForm/index';
import BasicHookForm from '../../../Form/ReactHookForm/BasikHookForm';
import FormHookValidation from '../../../Form/ReactHookForm/FormHookValidation';
import FormHookWizard from '../../../Form/ReactHookForm/WizardForm';

export default () => (
  <Switch>
    <Route path="/forms/react_final_form/basic_form" element={BasicForm} />
    <Route path="/forms/react_final_form/check_form_controls" element={CheckFormControls} />
    <Route path="/forms/react_final_form/file_upload" element={FileUpload} />
    <Route path="/forms/react_final_form/floating_labels_form" element={FloatingLabelsForm} />
    <Route path="/forms/react_final_form/form_dropzone" element={FormDropzone} />
    <Route path="/forms/react_final_form/form_layouts" element={FormLayouts} />
    <Route path="/forms/react_final_form/form_picker" element={FormPicker} />
    <Route path="/forms/react_final_form/form_validation" element={FormValidation} />
    <Route path="/forms/react_final_form/mask_form" element={MaskForm} />
    <Route path="/forms/react_final_form/material_form" element={MaterialForm} />
    <Route path="/forms/react_final_form/wizard_form" element={WizardForm} />
    <Route path="/forms/react_hook_form/basic_form" element={BasicHookForm} />
    <Route path="/forms/react_hook_form/form_validation" element={FormHookValidation} />
    <Route path="/forms/react_hook_form/wizard_form" element={FormHookWizard} />
  </Switch>
);
