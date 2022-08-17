import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import './Memotest.css';
import FancyButton from '../small/FancyButton';

function configurarCuadros(coloresDuplic) {//devuelve array de colores de boxes
    const coloresRandom = coloresDuplic.sort(() => {
        return 0.5 - Math.random();
      });
      return coloresRandom
}

const getGameCompleted = (shuffledMemotest) =>{
    if(!(shuffledMemotest.map( element => element.flipped).includes(false))){
        return(true)
    }else{
        return(false)
    }
}

const useMemotestGameState = (gameEnded) => {
    const coloresBase = ['rojo', 'azul', 'verde', 'amarillo', 'negro', 'violeta']
    const coloresDuplic = [...coloresBase, ...coloresBase]
    const [shuffledMemotest, setShuffledMemotest] = useState([])
    const [selectedColorBox, setselectedColorBox] = useState(null)
    const [animating, setAnimating] = useState(false)
    const [contadorTurnos, setcontadorTurnos] = useState(0)
    console.log(contadorTurnos)
    const [estadoActual, setEstadoActual] = useState(gameEnded)

    useEffect( () =>{
        const coloresBase = ['rojo', 'azul', 'verde', 'amarillo', 'negro', 'violeta']
        const coloresDuplic = [...coloresBase, ...coloresBase]
        const shuffledColours = configurarCuadros(coloresDuplic)
        setShuffledMemotest(
            shuffledColours.map((colour, index) => (
                {index: index, colour, flipped: false}
            ))
        )
    }, [])


    const handleClick = memoBlock =>{
        const flippedMemoBlock = {...memoBlock, flipped: true}
        let shuffledMemotestCopy = [...shuffledMemotest]
        shuffledMemotestCopy.splice(memoBlock.index, 1, flippedMemoBlock)
        setShuffledMemotest(shuffledMemotestCopy)

        if(selectedColorBox === null){
            setselectedColorBox(memoBlock)
        }else if(selectedColorBox.colour === memoBlock.colour){
            setselectedColorBox(null)
            setcontadorTurnos(contadorTurnos+1)
        }else{
            setAnimating(true)
            setcontadorTurnos(contadorTurnos+1)
            setTimeout(()=>{
                shuffledMemotestCopy.splice(memoBlock.index, 1, memoBlock)
                shuffledMemotestCopy.splice(selectedColorBox.index, 1, selectedColorBox)
                setShuffledMemotest(shuffledMemotestCopy)
                setselectedColorBox(null)
                setAnimating(false)
            }, 1000)
        }
        setEstadoActual(getGameCompleted(shuffledMemotestCopy))
    }
    const restart = () => {
        // Reiniciar el juego a su estado inicial
        if(estadoActual){
            const shuffledColours = configurarCuadros(coloresDuplic)
        setShuffledMemotest(
            shuffledColours.map((colour, index) => (
                {index: index, colour, flipped: false}
            ))
        )
        setEstadoActual(false)
        setcontadorTurnos(0)
        }
      };
      
    
    return {shuffledMemotest, animating, handleClick, estadoActual, restart,contadorTurnos}
}


const MemoBlock = ({memoBlock, animating, handleClick}) => (
    <div className='colorBox borde-cuadro' onClick={()=> (!memoBlock.flipped && !animating) && handleClick(memoBlock)}>
        <div className={`colorBox-inner ${memoBlock.flipped && 'colorBox-flipped'}`}>
            <div className='colorBox-front'>
            </div>
            <div className={`colorBox-back ${memoBlock.colour}`}>
            </div>
        </div>
    </div>
)

const WinnerCard = ({ turnos,show, onRestart = () => {} }) => {
    return(
        <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
            <span className={cx({"winner-card-text": !show})}>
                {`You won the game in ${turnos} turns!`}
            </span>
            <FancyButton onClick={onRestart}>Play again?</FancyButton>
        </div>
    )
}

const Memotest = () =>{
    const {shuffledMemotest,animating, handleClick, restart, estadoActual, contadorTurnos } = useMemotestGameState(false)
    return (
        <div className='board'>
            
            
            {shuffledMemotest.map((memoBlock, index) => {
                return <MemoBlock classname={shuffledMemotest[index]} key={`${index}_${memoBlock.colour}`} memoBlock={memoBlock} animating={animating} handleClick={handleClick}></MemoBlock>
            })}

            <WinnerCard
            turnos={contadorTurnos}
            show={estadoActual}
            onRestart={restart}
            ></WinnerCard>
        </div>
    )
}

export default Memotest