import './Explicacion.css'

export default function Explicacion() {
  return (
    <div className="explication__container">
      <div className="explication__wrapper">
        <h1 className="explication__title">Como funciona</h1>
        <ul className="explication__list">
          <li className="explicaction__item">1- Elige una tarjeta</li>
          <i className="explicaction__item">
            2- Accede a su modo AR presionando su botón verde ubicado en la
            posición inferior derecha
          </i>
          <li className="explicaction__item">
            3- Dentro del modo AR, espera a que se carguen los modelos dentro de
            la aplicación
          </li>
          <li className="explicaction__item">
            4- Sabrás que la escena esta lista, cuando veas una retícula blanca
            en la pantalla, apunta esta pantalla a cualquier parte del piso que
            desees y dale un pequeño touch
          </li>
          <li className="explicaction__item">
            5- Dando touch sobre la retícula aparecerá el modelo 3D colocado
            sobre la posición que hayas elegido
          </li>
        </ul>
      </div>
    </div>
  )
}
