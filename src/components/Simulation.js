import React from 'react';
import apiService from '../ApiService';

function Simulation() {
  const [simulationSteps, setSimulationSteps] = React.useState('');
  const [simulationResult, setSimulationResult] = React.useState();
  const [valid, setValid] = React.useState(false);

  const runSimulation = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSimulationResult(null);
    apiService.simulateWhiteBlackGrid(simulationSteps).then((grid) => {
      setSimulationResult({ steps: simulationSteps, grid });
      setSimulationSteps('');
      setValid(false);
    })
  };

  const handleStepsChange = (event) => {
    const { target } = event;
    const value = Number.parseInt(target.value);
    if (!Number.isNaN(value) && value > 0) {
      setSimulationSteps(value);
      setValid(true);
    } else {
      setSimulationSteps('');
      setValid(false);
    }
  };

  const renderSimulationResult = () => {
    if (simulationResult) {
      return (
        <div className="section">
          <h5>Simulation result for {simulationResult.steps} steps</h5>
          <pre className="simulation-result">
            {simulationResult.grid}
          </pre>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="container">
      <h3>GOM Space simulator</h3>
      <div className="section">
        <h5>Run simulation</h5>
        <form onSubmit={runSimulation} className="simulation-form">
          <div className="input-field simulation-steps">
            <input id="steps" type="number" min="1" value={simulationSteps} onChange={handleStepsChange} className="validate" />
            <label htmlFor="steps">Simulation steps</label>
          </div>
          <div>
            <button className="btn waves-effect waves-light" type="submit" name="action" disabled={!valid}>
              Run
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
      <div className="divider"></div>
      {renderSimulationResult()}      
    </div>
  );
}

export default Simulation;
