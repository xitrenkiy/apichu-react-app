import { NavLink } from 'react-router-dom'

import './decorativeTabs.sass';

const DecorativeTabs = () => {
	return (
		<div className="tabs-wrapper">
			<svg className="decorative-line" viewBox="0 0 100 20" preserveAspectRatio="none">
				<path d="
				M 0 15 
				H 35 
				Q 37 15, 37 10 
				V 5 
				Q 37 0, 42 0 
				H 58 
				Q 63 0, 63 5 
				V 10 
				Q 63 15, 65 15 
				H 100
				" fill="none" stroke="#FFD700" strokeWidth="1.5"/>
			</svg>

			<div className="tabs">
				<NavLink 
					end 
					to='/' 
					className="tab"
					style={({ isActive }) => ({backgroundColor: isActive ? '#DAA520' : '#FFD700',
											   transition: '.2s all',
											   boxShadow: isActive ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
											   transform: isActive ? 'translateY(2px)' : 'translateY(0)'})}
					>Random</NavLink>
				<NavLink 
					to='/gallery' 
					className="tab"
					style={({ isActive }) => ({backgroundColor: isActive ? '#DAA520' : '#FFD700',
											   transition: '.2s all',
											   boxShadow: isActive ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
											   transform: isActive ? 'translateY(2px)' : 'translateY(0)'})}
					>Gallery</NavLink>
			</div>
		</div>
	)
}

export default DecorativeTabs;