class ApiService {

  async simulateWhiteBlackGrid(steps) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const init = { method: 'PUT', headers: headers };
    const response = await fetch(`/simulations/white-black-grid?steps=${steps}`, init);
    const blob = await response.blob();
    const result = await blob.text();
    return result;
  }

}

export default new ApiService();
