import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, Button } from 'reactstrap'

function GamePage() {
  const { id } = useParams()
  const gameContainerRef = useRef(null)

  useEffect(() => {
    console.log("useEffect in GamePage for ID:", id);
    console.log("window.comeon:", window.comeon);
    console.log("window.comeon.game:", window.comeon ? window.comeon.game : 'not exist');

    if (window.comeon && window.comeon.game && window.comeon.game.launch) {
      console.log("Game launcher is available. Launching game:", id);
      window.comeon.game.launch(id);
    } else {
      console.error('Game launcher not available after useEffect mount. Retrying...');

      const retryTimeout = setTimeout(() => {
        if (window.comeon && window.comeon.game && window.comeon.game.launch) {
          console.log("Game launcher available on retry. Launching game:", id);
          window.comeon.game.launch(id);
        } else {
          console.error('Game launcher still not available after retry.');
        }
      }, 500); // Retry after 500ms

      return () => clearTimeout(retryTimeout); // Cleanup retry timeout
    }

    return () => {
      // Cleanup if needed
      if (gameContainerRef.current) {
        gameContainerRef.current.innerHTML = '';
      }
    };
  }, [id]);

  return (
    <Card className="mx-auto" style={{ width: '100%' }}>
      <CardBody>
        <CardTitle tag="h3" className="mb-4 text-center">Game: {id}</CardTitle>
        <div
          ref={gameContainerRef}
          id="game-launch"
          className="mb-4"
          style={{ minHeight: 500 }}
        />
        <Button color="secondary" tag={Link} to="/games">Back to Game List</Button>
      </CardBody>
    </Card>
  );
}

export default GamePage 