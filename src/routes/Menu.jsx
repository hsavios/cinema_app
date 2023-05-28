import '../styles/global';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cinema">Cinema</Link>
        </li>
        <li>
          <Link to="/sala">Sala</Link>
        </li>
        <li>
          <Link to="/funcionario">Funcionário</Link>
        </li>
        <li>
          <Link to="/genero">Gênero</Link>
        </li>
        <li>
          <Link to="/horario">Horário</Link>
        </li>
        <li>
          <Link to="/filme">Filme</Link>
        </li>
      </ul>
    </nav>
  );
};