import './appHeader.sass';
import { useState, useEffect } from 'react';

import logo from '../../assets/logo92.png';
import usePikachuService from '../../service/PikachuService';

const AppHeader = () => {

	return (
		<header className="header">
			<div className="header__logo">
				<img src={logo} alt="APIchu logo" />
			</div>
			<nav className="header__navigation">
				<a href="#">Solo Pikachu..</a>
				<a href="#">A lot of Pikachu..</a>
			</nav>
			<div className="header__search">
				<input type="text" placeholder='Pika...' />
			</div>
		</header>
	)
}

export default AppHeader;