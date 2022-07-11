import { Helmet } from 'react-helmet'

function App() {

  return (
    <>
      <div id="formContainer"></div>
      <Helmet>
        <link href="https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/webcomponent/styles.css" media="screen" rel="stylesheet" />
        <script src="https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/webcomponent/assets/lib/zone.min.js"></script>
        <script src="https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/webcomponent/scripts.js"></script>
        <script src="https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/webcomponent/runtime-es5.js"></script>
        <script src="https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/webcomponent/polyfills-es5.js"></script>
        <script src="https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/webcomponent/main-es5.js"></script> 
        <script src="https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/fhir/R4/lformsFHIR.min.js"></script>
        <script src="./form.js"></script>
      </Helmet>
    </>
  );
}

export default App;
