import React, { Component, useState, useEffect } from 'react';
import FancyButton from '../small/FancyButton';

export const BeautifulFunction = ({ name }) => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    document.title = `Counter: ${counter}`;
    return () => {
      document.title = '';
    };
  }, [counter]);
  return (
    <div>
      <div>{name}</div>
      <div>Counter: {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>Add to counter!</button>
    </div>
  );
};

/* 
  Desventajas de clase:
  1. Sintáxis más engorrosa:
    Pueden ver que el componente re escrito como una función es mucho más corto
  2. Más posibilidades de bugs inesperados:
    La función componentDidUpdate no implementa diff automático
  3. Imposible compartir ciertas funcionalidades:
    No podemos extraer el estado ni los efectos a un custom hook, 
    por lo tanto hay mucha repetición si queremos hacer otro componente parecido

  La razón principal por la que seguimos usando clases a veces es por temas de código legacy.
  Al ser hooks una sintáxis más nueva, en casi cualquier proyecto existen decenas
  de componentes de clase cuya implementación en función puede no ser trivial, por lo tanto
  muchas veces es más conveniente seguir trabajando con esas clases que tratar de refactorizarlas.
*/

class UglyClass extends Component {
  state = {
    counter: 0,
  };

  componentDidMount() {
    document.title = `Counter: ${this.state.counter}`;
  }

  componentDidUpdate() {
    // Este funcionamiento es diferente al de nuestra función
    document.title = `Counter: ${this.state.counter}`;
  }

  componentWillUnmount() {
    document.title = '';
  }

  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>Counter: {this.state.counter}</div>
        <FancyButton onClick={() => this.setState({ counter: this.state.counter + 1 })}>
          Add to counter!
        </FancyButton>
      </div>
    );
  }
}
export default UglyClass;
