function SingleLayerNeuralNetwork(inputCount, neuronCount, outputCount) {
  this.inputs = Array(inputCount).fill(0);
  this.con_neu = Array(neuronCount).fill(null).map(i => Array(inputCount).fill(null).map(n => Math.random()-0.5));
  this.neurons = Array(neuronCount).fill(0);
  this.neuronsBias = Array(neuronCount).fill(null).map(i => Math.random()-0.5);
  this.con_out = Array(outputCount).fill(null).map(i => Array(neuronCount).fill(null).map(n => Math.random()-0.5));
  this.outputs = Array(outputCount).fill(0);
  this.outputsBias = Array(outputCount).fill(null).map(i => Math.random()-0.5);
  this.learningRate = 0.1;

  this.process = function(input) {
    this.inputs = input;
    this.neurons = this.activation(add(dot(this.con_neu, this.inputs), this.neuronsBias));
    this.outputs = this.activation(add(dot(this.con_out, this.neurons), this.outputsBias));
  }

  this.train = function(input, target) {
    var neurons = this.activation(add(dot(this.con_neu, input), this.neuronsBias));
    var outputs = this.activation(add(dot(this.con_out, neurons), this.outputsBias));

    var error_out = substract(target, outputs);

    var out_gradients = dot(arrayProduct(this.activation_d(outputs), error_out), this.learningRate);
    var con_out_delta = dot(out_gradients, neurons);
    this.con_out = add(this.con_out, con_out_delta);
    this.outputsBias = add(this.outputsBias, out_gradients);

    var error_neu = dot(transpose(this.con_out), error_out);
    var neu_gradients = dot(arrayProduct(this.activation_d(neurons), error_neu), this.learningRate);
    var con_neu_delta = dot(neu_gradients, input);
    this.con_neu = add(this.con_neu, con_neu_delta);
    this.neuronsBias = add(this.neuronsBias, neu_gradients);
  }

  this.activation = function(arr) {
    // return arr.map(n => Math.max(0, n));
    return arr.map(sigmoid);
  }

  function sigmoid(n) {
    return 1 / (1 + Math.exp(-n));
  }

  this.activation_d = function(arr) {
    // return arr.map(n => n > 0 ? 1 : 0);
    return arr.map(n => n * (1 - n));
  }

  this.draw = function(ctx, x, y, width, height) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
    for (let i = 0; i < neuronCount; i++) {
      for (let j = 0; j < inputCount; j++) {
        ctx.beginPath();
        ctx.lineWidth = sigmoid(Math.abs(this.con_neu[i][j])) + 0.3;
        ctx.strokeStyle = this.con_neu[i][j] > 0 ? 'black' : 'red';
        //ctx.strokeStyle = '#' + Math.floor(0xffffff*this.con_neu[i][j]).toString(16);
        ctx.moveTo(x + 20, getY(inputCount, j));
        ctx.lineTo(x + width / 2, getY(neuronCount, i));
        ctx.stroke();
      }
    }
    for (let i = 0; i < outputCount; i++) {
      for (let j = 0; j < neuronCount; j++) {
        ctx.beginPath();
        ctx.lineWidth = sigmoid(Math.abs(this.con_out[i][j])) + 0.3;
        ctx.strokeStyle = this.con_neu[i][j] > 0 ? 'black' : 'red';
        //ctx.strokeStyle = '#' + Math.floor((0xffffff)*this.con_out[i][j]).toString(16);
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
      // ctx.fillStyle = '#' + (''+Math.floor((0xf)*(this.inputs[i]/Math.max(...this.inputs)))).repeat(6);
      ctx.arc(x + 20, getY(inputCount, i), 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    for (let i = 0; i < neuronCount; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.neurons[i] ? 'black' : 'white';
      // ctx.fillStyle = '#' + (''+Math.floor((0xf)*(this.neurons[i]/Math.max(...this.neurons)))).repeat(6);
      ctx.arc(x + width / 2, getY(neuronCount, i), 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    for (let i = 0; i < outputCount; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.outputs[i] ? 'black' : 'white';
      // ctx.fillStyle = '#' + (''+Math.floor((0xf)*(this.outputs[i]/Math.max(...this.outputs)))).repeat(6);
      ctx.arc(x + width - 20, getY(outputCount, i), 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    function getY(list, index) {
      return y + height / list / 2 + index * height / list;
    }
  };
}
