import { Routes, Route } from 'react-router-dom';
import useToken from './Hooks/useToken';

import Login from './Pages/Login/Login';
import Admin from './Pages/Admin/Admin';
import QrCodeScanner from './Pages/Scanner/Scanner';
import './Hooks/useToken';

function App() {
	const [token] = useToken(true);

	if (token) {
		return (
			<Routes>
				<Route path='/*' element={<Admin />} />
				<Route path='/scanner' element={<QrCodeScanner />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		);
	} else {
		return (
			<Routes>
				<Route path='/*' element={<Login />} />
				<Route path='/scanner' element={<QrCodeScanner />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		);
	}
}

export default App;
