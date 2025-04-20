import { NavLink } from 'react-router-dom';

import './appHeader.sass';
import logo from '../../assets/logo92.png';

const AppHeader = () => {

	return (
		<header className="header">
			<div className="header__logo">
				<img src={logo} alt="APIchu logo" />
			</div>
			<nav className="header__navigation">
				<NavLink 
					to='/'
					style={({ isActive }) => ({color: isActive ? '#fdd835' : '#6A5ACD', fontSize: '20px'})}
					>
					Solo Pikachu..
				</NavLink>
				<NavLink 
					to='/sass'
					style={({ isActive }) => ({color: isActive ? '#fdd835' : '#6A5ACD', fontSize: '20px'})}
					>A lot of Pikachu..</NavLink>
			</nav>
			<div className="header__search">
				<input type="text" placeholder='Pika...' />
			</div>
		</header>
	)
}

export default AppHeader;