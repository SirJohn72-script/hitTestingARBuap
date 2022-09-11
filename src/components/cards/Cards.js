import './Card.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Cards() {
  const [cards, setCards] = useState([
    {
      id: 0,
      title: 'Lobito',
      image:
        'https://images.pexels.com/photos/13099181/pexels-photo-13099181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      model: 'Hombre',
    },
    {
      id: 1,
      title: 'Letrero Preparatoria',
      image:
        'https://images.pexels.com/photos/13046522/pexels-photo-13046522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      model: 'CartelModel',
    },
  ])

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title__container">
          <h1>Bienvenido a la aplicacion Web AR - BUAP</h1>
          <p>v1.0 Esta aplicacion esta en costante desarrollo</p>
        </div>
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
