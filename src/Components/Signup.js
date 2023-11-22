import React, { useEffect, useCallback } from 'react'
import './Signup.css'
import { useState } from 'react';
import useRazorpay from "react-razorpay";
import GooglePayButton from '@google-pay/button-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
	const [Razorpay] = useRazorpay();
	const [step, setStep] = useState(1); // Step 1: Initial signup, Step 2: Payment method selection
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		Name: '',
		Email: '',
		Phone: '',
		JoiningDate: new Date().toDateString(),
		Balance: 0,
		Address: '',
		Password: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};


	const handleSignup = async () => {
		// Proceed to the payment method selection step
		setStep(2);

		try {
			const response = await fetch('https://mlm-backend-mx3k.onrender.com/members/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const data = await response.json();
				// Registration was successful, you can handle the response here
				console.log('Registration successful', data);
				navigate('/login')
			} else {
				// Registration failed, handle the error response here
				console.log('Registration failed');
			}

		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handlePaymentMethodSelection = (method) => {
		// Handle the selected payment method (Google Pay or Razorpay)
		setSelectedPaymentMethod(method);

		// You can implement the payment logic here based on the selected method

		// Handle Google Pay integration
		if (method === 'razorpay') {
			// Handle Razorpay integration
			// const handlePayment = async () => {
			// 	const order = await createOrder(params);

			// 	const options = {
			// 		key: "YOUR_KEY_ID",
			// 		amount: "10000",
			// 		currency: "INR",
			// 		name: "Acme Corp",
			// 		description: "Test Transaction",
			// 		image: "https://example.com/your_logo",
			// 		order_id: order.id,
			// 		handler: function (res) {
			// 			console.log(res);
			// 		},
			// 		prefill: {
			// 			name: "Piyush Garg",
			// 			email: "youremail@example.com",
			// 			contact: "9999999999",
			// 		},
			// 		notes: {
			// 			address: "Razorpay Corporate Office",
			// 		},
			// 		theme: {
			// 			color: "#3399cc",
			// 		},
			// 	};

			// 	const rzpay = new Razorpay(options);
			// 	rzpay.open();
			// navigate('/login')
			// };
		}
	};


	return (
		<div className="container contain">
			<div className="screen">
				<div className="screen__content">
					{step === 1 ? (
						<>
							<h2 style={{ textAlign: 'center' }}>Sign Up</h2>
							<form className="login">
								<div className="login__field">
									<i className="login__icon fas fa-user"></i>
									<input
										type="text"
										className="login__input"
										placeholder="Name"
										name="Name"
										value={formData.Name}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div className="login__field">
									<i className="login__icon fas fa-envelope"></i>
									<input
										type="email"
										className="login__input"
										placeholder="Email"
										name="Email"
										value={formData.Email}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div className="login__field">
									<i className="login__icon fas fa-lock"></i>
									<input
										type="password"
										className="login__input"
										placeholder="Password"
										name="Password"
										value={formData.Password}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div className="login__field">
									<i className="login__icon fas fa-phone"></i>
									<input
										type="number"
										className="login__input"
										placeholder="Phone"
										name="Phone"
										value={formData.Phone}
										onChange={handleInputChange}
									/>
								</div>
								<div className="login__field">
									<i className="login__icon fas fa-map-marker"></i>
									<input
										type="text"
										className="login__input"
										placeholder="Address"
										name="Address"
										value={formData.Address}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div className="login__field">
									<i className="login__icon fas fa-user"></i>
									<input
										type="number"
										className="login__input"
										placeholder="Referring ID"
										name="Referring ID"
										value={formData.ReferringMemberID}
										onChange={handleInputChange}
										required
									/>
								</div>

							</form>
							<button className="button login__submit" onClick={handleSignup}>
								<span className="button__text">Sign Up</span>
								<i className="button__icon fas fa-chevron-right"></i>
							</button>
							<div style={{ textAlign: 'center' }}>
								Have an account <Link to={'/login'}>login</Link>
							</div>
						</>
					) : (
						<div>
							<h2 style={{ textAlign: 'center' }}>Please Pay Before Proceeding</h2>
							<div className="payment-methods">
								{/* <button
									className="payment-method"
									onClick={() => handlePaymentMethodSelection('google-pay')}
								>
									<img
										src="google-pay-icon.png" // Replace with the actual Google Pay icon
										alt="Google Pay"
									/>
								</button> */}
								<GooglePayButton
									environment="TEST"
									paymentRequest={{
										apiVersion: 2,
										apiVersionMinor: 0,
										allowedPaymentMethods: [
											{
												type: 'CARD',
												parameters: {
													allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
													allowedCardNetworks: ['MASTERCARD', 'VISA'],
												},
												tokenizationSpecification: {
													type: 'PAYMENT_GATEWAY',
													parameters: {
														gateway: 'example',
														gatewayMerchantId: 'exampleGatewayMerchantId',
													},
												},
											},
										],
										merchantInfo: {
											merchantId: '12345678901234567890',
											merchantName: 'Demo Merchant',
										},
										transactionInfo: {
											totalPriceStatus: 'FINAL',
											totalPriceLabel: 'Total',
											totalPrice: '10000.00',
											currencyCode: 'INR',
											countryCode: 'IN',
										},
									}}
									onLoadPaymentData={paymentRequest => {
										console.log('load payment data', paymentRequest);
										if (paymentRequest.status === 'SUCCESS') {
											// Payment was successful, navigate to the login page
											navigate('/login');
										} else {
											// Handle other cases if needed
											console.log('Payment was not successful');
										}
									}}
								/>
								{/* <button
									className="payment-method"
									onClick={() => handlePaymentMethodSelection('razorpay')}
								>
									<img
										style={{ width: '235px', height: '40px', objectFit: "cover", background: "black" }}
										src="https://dashboard.razorpay.com/img/logo_full.png" // Replace with the actual Razorpay icon
										alt="Razorpay"
									/>
								</button> */}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="screen__background">
				<span className="screen__background__shape screen__background__shape4"></span>
				<span className="screen__background__shape screen__background__shape3"></span>
				<span className="screen__background__shape screen__background__shape2"></span>
				<span className="screen__background__shape screen__background__shape1"></span>
			</div>
		</div>
	)
}

export default Signup
