import error from '../../assets/error.gif';
import './errorMessage.sass';

const ErrorMessage = () => {
	return (
		<>
			<img style={{ display: 'block', width: '250px', height: '250px', 
						objectFit: 'contain', margin: '15px auto' }} src={error} alt='Error'/>
			<p className="error">Something went wrong, try again...</p>
		</>
	)
}

export default ErrorMessage;