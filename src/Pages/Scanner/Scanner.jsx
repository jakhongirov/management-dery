import './Scanner.scss'
import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrCodeScannerForm = () => {
	const [result, setResult] = useState('');
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		selectValue: '',
		inputValue: '',
	});

	useEffect(() => {
		const config = { fps: 10, qrbox: { width: 250, height: 250 } };
		const qrCodeSuccessCallback = (decodedText) => {
			setResult(decodedText);
		};
		const qrCodeErrorCallback = (errorMessage) => {
			// No need to set the error state for every frame where no QR code is detected
		};

		const html5QrcodeScanner = new Html5QrcodeScanner(
			'qr-reader',
			config,
			false,
		);
		html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

		return () => {
			html5QrcodeScanner.clear().catch((error) => {
				console.error('Failed to clear QR scanner.', error);
			});
		};
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form Data:', formData);
		console.log('Scanned QR Code:', result);
	};

	return (
		<div className='container scanner__container'>
			<h1 className='scanner__heading'>Форма сканера QR-кода</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label className='select_label'>Выберите вариант:</label>
					<select
						className='select'
						name='selectValue'
						value={formData.selectValue}
						onChange={handleInputChange}>
						<option value='income'>Доход</option>
						<option value='pay'>Платить</option>
					</select>
				</div>
				<div>
					<label className='input_label'>Сумма:</label>
					<input
						className='scanner_input'
						type='number'
						name='inputValue'
						value={formData.inputValue}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label className='scanner_label'>Сканер QR-кода:</label>
					<div id='qr-reader' style={{ width: '100%' }}></div>
					{result && <p>Scanned Code: {result}</p>}
					{error && <p>Error: {error}</p>}
				</div>
				<button className='scanner_btn' type='submit'>Отправить</button>
			</form>
		</div>
	);
};

export default QrCodeScannerForm;