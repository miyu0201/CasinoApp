import { useState } from 'react'
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import { login } from '../services/api'
import './LoginPage.css' 

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await login(username, password)
      if (response.status === 'success') {
        onLogin(response.player)
      } else {
        setError(response.message || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page-container">
      <Card className="login-card mx-auto shadow-lg">
        <CardBody className="p-5">
          <CardTitle tag="h1" className="text-center mb-4 login-title">COME&nbsp;ON</CardTitle>
          {error && <Alert color="danger" className="mb-3">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <Label for="username" className="login-label">USERNAME</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={loading}
                className="login-input"
                autoFocus
              />
            </FormGroup>
            <FormGroup className="mb-4">
              <Label for="password" className="login-label">PASSWORD</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                className="login-input"
              />
            </FormGroup>
            <Button color="primary" block type="submit" disabled={loading} className="login-button">
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default LoginPage 