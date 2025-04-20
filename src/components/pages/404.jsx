import { Link } from 'react-router-dom';

import ErrorMessage from "../errorMessage/errorMessage";

const Page404 = () => {
	return (
		<>
			<ErrorMessage />
			<Link 
				to='/' 
				style={{
					padding: '10px 20px',
					backgroundColor: '#FFD700',
					color: 'white',
					textDecoration: 'none',
					borderRadius: '5px',
					fontSize: '18px',
					textAlign: 'center',
					display: 'block',
					transition: 'background-color 0.3s ease',
					width: '100px',
					margin: '0 auto'
				}}
			>
			Go back</Link>
		</>
	)
}

export default Page404;