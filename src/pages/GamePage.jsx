import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './GamePage.css'

function GamePage() {
  const { id } = useParams()
  const gameContainerRef = useRef(null)
  const [gameName, setGameName] = useState('')

  useEffect(() => {
    console.log('GamePage loaded for id:', id)
    //get game name
    fetch('http://localhost:3001/games')
      .then(res => res.json())
      .then(data => {
        const game = data.find(game => game.code === id)
        setGameName(game ? game.name : id)
        console.log('Loaded game data:', game)
      })
  }, [id])

  useEffect(() => {
    if (window.comeon && window.comeon.game && window.comeon.game.launch) {
      //call api, takes game code and launch the game
      window.comeon.game.launch(id) 
      console.log('Launched game with id:', id)
    }
    //Cleanup when game change
    return () => {
      if (gameContainerRef.current) {
        gameContainerRef.current.innerHTML = ''
      }
    }
  }, [id])

  // Fullscreen mode handler
  const handleFullScreen = () => {
    console.log('Fullscreen button clicked for game:', id, gameName)
    const elem = gameContainerRef.current
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    }
  }

  return (
    <div className="game-page-container">
      <div className="game-container">
        <h3 className="game-title">{gameName}</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <button
            className="fullscreen-btn-overlay"
            onClick={handleFullScreen}
            title="Full Screen"
          >
            ⛶
          </button>
        </div>
        {/* game launch div */}
        <div
          ref={gameContainerRef}
          id="game-launch"   //api use  document.getElementById('game-launch')
          style={{ position: 'relative' }}
        >
        </div>
        <Link to="/games" className="back-btn">Back to Game List</Link>
      </div>
    </div>
  )
}

export default GamePage