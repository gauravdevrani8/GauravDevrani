import React from 'react';
import Background from './Components/Background';
import MultiStepForm from './Components/Form';

const App = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Background />
      <MultiStepForm /> {/* Your existing form */}
    </div>
  );
};

export default App;
