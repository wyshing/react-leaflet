import React from 'react'
import './css/App.css'
//import { CSVLink } from 'react-csv'
//https://www.npmjs.com/package/react-csv
import moment from 'moment'

import { Layout, Space } from 'antd'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Home from './components/Map'
import TrafficNews from './components/TrafficNews'
import Register from './components/Register'
import Login from './components/Login'
import useAuth from './hooks/useAuth'

function App() {
  const a = moment().subtract(6, 'hours').format()
  console.log(a)

  const { Header, Content } = Layout
  const { auth, setAuth } = useAuth()

  const Logout = () => {
    setAuth({})
  }

  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            {auth.username ? (<></>) : (<><Link to="/register">Register</Link></>)}
            {auth.username ? (<></>) : (<><Link to="/login">Login</Link></>)}
            {auth.username ? (<><Link onClick={() => Logout()} to="/">Logout</Link></>) : (<></>)}
          </Space>
          <div style={{float: 'right'}}><TrafficNews /></div>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Content>
    </Router>
  )
}

export default App