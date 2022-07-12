import { useEffect } from 'react';
import { FhirQ } from './form';

function App() {

  useEffect(() => {
    renderForm();
  })

  function renderForm() {
      var formDef = FhirQ;
      window.LForms.Util.addFormToPage(formDef, 'formContainer');
  }
 
  return (
    <div id="formContainer" style={{ padding: '0.5em' }}></div>
  );
}

export default App;
