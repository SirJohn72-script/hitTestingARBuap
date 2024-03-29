import './Card.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Explicacion from '../explicacion/Explicacion'

export default function Cards() {
  const [cards, setCards] = useState([
    {
      id: 0,
      title: 'Lobito',
      image: './images/lobitos.png',
      model: 'Lobito',
    },
    {
      id: 1,
      title: 'Letrero Preparatoria',
      image: './images/letrero.png',
      model: 'CartelModel',
    },
  ])

  useEffect(() => {
    const ARButton = document.querySelector('.ARButtonDOM')
    if (ARButton) {
      document.body.removeChild(ARButton)
      window.location.reload()
    }
  }, [])

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title__container">
          <h1>Bienvenido a la aplicacion Web AR - BUAP</h1>
          <p>v1.0 Esta aplicacion esta en costante desarrollo</p>
        </div>

        <Explicacion />
        <div className="cards__container">
          {cards.map((item, index) => (
            <div className="card" key={index}>
              <Link to={`/${item.model}`}>
                <div className="card__image">
                  <img src={item.image} alt="" />
                </div>
                <div className="card__label">
                  <h1>{item.title}</h1>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
