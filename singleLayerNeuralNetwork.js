function SingleLayerNeuralNetwork(inputCount, neuronCount, outputCount) {
  this.inputs = Array(inputCount).fill(0);
  this.con_neu = Array(neuronCount).fill(null).map(i => Array(inputCount).fill(null).map(n => Math.random()*2-1));
  this.neurons = Array(neuronCount).fill(0);
  this.neuronsBias = Array(neuronCount).fill(null).map(i => Math.random()*2-1);
  this.con_out = Array(outputCount).fill(null).map(i => Array(neuronCount).fill(null).map(n => Math.random()*2-1));
  this.outputs = Array(outputCount).fill(0);
  this.outputsBias = Array(outputCount).fill(null).map(i => Math.random()*2-1);

  this.process = function(input) {
    this.inputs = input;
    this.neurons = this.activation(add(dot(this.con_neu, this.inputs), this.neuronsBias));
    this.outputs = this.activation(add(dot(this.con_out, this.neurons), this.outputsBias));
  }

  this.activation = function(arr) {
    return arr.map(n => Math.max(0, n));
  }

  this.draw = function(ctx, x, y, width, height) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
    for (let i = 0; i < neuronCount; i++) {
      for (let j = 0; j < inputCount; j++) {
        ctx.beginPath();
        ctx.lineWidth = this.con_neu[i][j] * 3 + 0.1;
        //ctx.strokeStyle = '#' + Math.floor(0xffffff*this.con_neu[i][j]).toString(16);
        ctx.moveTo(x + 20, getY(inputCount, j));
        ctx.lineTo(x + width / 2, getY(neuronCount, i));
        ctx.stroke();
      }
    }
    for (let i = 0; i < outputCount; i++) {
      for (let j = 0; j < neuronCount; j++) {
        ctx.beginPath();
        ctx.lineWidth = this.con_out[i][j] * 3 + 0.1;
        //ctx.strokeStyle = '#' + Math.floor(0xffffff*this.con_out[i][j]).toString(16);
        ctx.moveTo(x + width / 2, getY(neuronCount, j));
        ctx.lineTo(x + width - 20, getY(outputCount, i));
        ctx.stroke();
      }
    }
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    for (let i = 0; i < inputCount; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.inputs[i] ? 'black' : 'white';
      ctx.arc(x + 20, getY(inputCount, i), 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    for (let i = 0; i < neuronCount; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.neurons[i] ? 'black' : 'white';
      ctx.arc(x + width / 2, getY(neuronCount, i), 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    for (let i = 0; i < outputCount; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.outputs[i] ? 'black' : 'white';
      ctx.arc(x + width - 20, getY(outputCount, i), 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    function getY(list, index) {
      return y + height / list / 2 + index * height / list;
    }
  };
}