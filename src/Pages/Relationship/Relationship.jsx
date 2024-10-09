import { useState, useEffect } from 'react';

import Header from '../../Containers/Header/Header';
import http from '../../axios.config';
import Pagination from '../../Components/Pagination/Pagination';
import useToken from '../../Hooks/useToken';

function Relationship() {
	const [page, setPage] = useState(1);
	const [token, setToken] = useToken();

	const [relationship, setRelationship] = useState({
		isFetched: false,
		data: [],
		err: false,
	});

	useEffect(() => {
		http
			.get(`users/relationship?limit=15&page=${page}`, {
				headers: {
					token: token,
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				if (res.data.status === 401) {
					setToken();
				} else {
					setRelationship({
						isFetched: true,
						data: res.data.data,
						err: false,
					});
				}
			})
			.catch((error) =>
				setRelationship({
					isFetched: true,
					data: [],
					err: error,
				}),
			);
	}, [page]);

	return (
		<div>
			<div className='container'>
				<Header />
				<div className='table_wrap'>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Имя</th>
								<th>Пол</th>
								<th>День рождения</th>
								<th>Номер</th>
								<th>имя пользователя</th>
							</tr>
						</thead>
						<tbody>
							{relationship.data.map((user, index) => (
								<tr key={index} className='table_tr'>
									<td>{++index}</td>
									<td>{user.relationship_name}</td>
									<td>{user.relationship_gender}</td>
									<td>{user.relationship_birthday}</td>
									<td>{user.user_phone}</td>
									<td>{user.user_name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<Pagination
					page={page}
					setPage={setPage}
					data={relationship.data}
				/>
			</div>
		</div>
	);
}

export default Relationship;
