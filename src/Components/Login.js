import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate()
	const userLogin = async () => {
		try {
			const response = await axios.post('https://mlm-backend-mx3k.onrender.com/members/login', {
				email: email,
				password: password,
			});
			const memberData = response.data.member;
			console.log(response.data);
			const memberDataJSON = JSON.stringify(memberData);
			localStorage.setItem('userData', memberDataJSON)
			navigate('/');
		} catch (error) {
			if (error.response) {
				// The request was made, but the server responded with a status code
				console.log('Server Error:', error.response.data);
			} else if (error.request) {
				// The request was made, but no response was received
				console.log('No Response:', error.request);
			} else {
				// Something happened in setting up the request
				console.log('Request Error:', error.message);
			}
		}
	};
	return (
		<div className="container contain">
			<div className="screen">
				<div className="screen__content">
					<h2 style={{ textAlign: 'center' }}>Login</h2>
					<form className="login">
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							<input
								type="email"
								className="login__input"
								placeholder="Email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-lock"></i>
							<input
								type="password"
								className="login__input"
								placeholder="Password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</form>
					<button className="button login__submit" onClick={userLogin}>
						<span className="button__text">Login Now</span>
						<i className="button__icon fas fa-chevron-right"></i>
					</button>
					<div style={{ padding: '5px' }}>
						Don't have an account <Link to={'/signup'}>signup</Link>
					</div>

				</div>
				<div className="screen__background">
					<span className="screen__background__shape screen__background__shape4"></span>
					<span className="screen__background__shape screen__background__shape3"></span>
					<span className="screen__background__shape screen__background__shape2"></span>
					<span className="screen__background__shape screen__background__shape1"></span>
				</div>
			</div>
		</div>
	)
}

export default Login
