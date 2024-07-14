import { useState, useEffect } from 'react';

import http from '../../axios.config';
import Edit from '../../Assets/images/icons/edit.svg';
import DeleteSvg from '../../Assets/images/icons/delete.svg';

import useToken from '../../Hooks/useToken';
import Header from '../../Containers/Header/Header';
import DeleteModal from '../../Components/DeleteModal/DeleteModal';
import AddProducts from '../../Components/Add/AddProducts/AddProducts';
import EditProducts from '../../Components/Edit/EditProducts/EditProducts';
import ProductsInfo from '../../Components/InfoModal/ProductsInfo/ProductsInfo';
import Pagination from '../../Components/Pagination/Pagination';

function Products() {
	const [page, setPage] = useState(1);
	const [token, setToken] = useToken();
	const [addModal, setAddModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [defaultTitleUz, setDefaultTitleUz] = useState('');
	const [defaultTitleRu, setDefaultTitleRu] = useState('');
	const [defaultDescUz, setDefaultDescUz] = useState('');
	const [defaultDescRu, setDefaultDescRu] = useState('');
	const [defaultPrice, setDefaultPrice] = useState('');
	const [defaultImg, setDefaultImg] = useState('');

	const [infoModal, setInfoModal] = useState(false);
	const [infoId, setInfoId] = useState('');
	const [infoNameUz, setInfoNameUz] = useState('');
	const [infoNameRu, setInfoNameRu] = useState('');
	const [infoDescRu, setInfoDescRu] = useState('');
	const [infoDescUz, setInfoDescUz] = useState('');
	const [infoImg, setInfoImg] = useState('');
	const [infoPrice, setInfoPrice] = useState('');
	const [infoDate, setInfoDate] = useState('');
	const [defaultCategoryId, setDefaultCategoryId] = useState('');
	const [productsList, setProductsList] = useState({
		isFetched: false,
		data: [],
		err: false,
	});

	useEffect(() => {
		http
			.get(`products/list/admin?limit=15&page=${page}`, {
				headers: {
					token: token,
					'Content-Type': 'application/json',
				},
			})
			.then((res) =>
				setProductsList({
					isFetched: true,
					data: res.data.data,
					err: false,
				}),
			)
			.catch((error) =>
				setProductsList({
					isFetched: true,
					data: [],
					err: error,
				}),
			);
	}, [page]);
	console.log(productsList);
	function truncateTextAfterWords(text) {
		const words = text.split(' ');
		if (words.length > 3) {
			return words.slice(0, 3).join(' ') + '...';
		}
		return text;
	}
	return (
		<div>
			{productsList.isFetched ? (
				<div className='container'>
					<Header />
					<DeleteModal
						deleteModal={deleteModal}
						setDeleteModal={setDeleteModal}
						api={'product/delete'}
						id={'id'}
						mark_id={selectedId - 0}
					/>
					<AddProducts
						addModal={addModal}
						setAddModal={setAddModal}
						api={'product/add'}
					/>
					<EditProducts
						editModal={editModal}
						setEditModal={setEditModal}
						api={'product/edit'}
						id={selectedId}
						default_title_uz={defaultTitleUz}
						default_title_ru={defaultTitleRu}
						default_description_uz={defaultDescUz}
						default_description_ru={defaultDescRu}
						default_price={defaultPrice}
						default_category_id={defaultCategoryId}
						default_img={defaultImg}
					/>
					<ProductsInfo
						infoModal={infoModal}
						setInfoModal={setInfoModal}
						info_id={infoId}
						info_title_uz={infoNameUz}
						info_title_ru={infoNameRu}
						info_description_uz={infoDescUz}
						info_description_ru={infoDescRu}
						date={infoDate}
						info_price={infoPrice}
						img={infoImg}
					/>
					<div className='table_wrap '>
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Имя</th>
									<th>Описание</th>
									<th>Цена</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{productsList.data?.map((product, index) => (
									<tr key={index} className='table_tr'>
										<td>{product.product_id}</td>
										<td>{product.product_name_uz}</td>
										<td>
											{truncateTextAfterWords(
												product.product_description_uz,
											)}
										</td>
										<td>{product.product_price}</td>
										<td></td>
										<td className='btns'>
											<button
												className='edit'
												onClick={() => {
													setEditModal(true);
													setSelectedId(product.product_id);
													setDefaultTitleUz(
														product.product_name_uz,
													);
													setDefaultTitleRu(
														product.product_name_ru,
													);
													setDefaultDescUz(
														product.product_description_uz,
													);
													setDefaultDescRu(
														product.product_description_ru,
													);
													setDefaultPrice(product.product_price);
													setDefaultCategoryId(
														product.category_id,
													);
													setDefaultImg(product.product_image_url);
												}}>
												<img src={Edit} alt='edit' />
											</button>
											<button
												className='delete'
												onClick={() => {
													setDeleteModal(true);
													setSelectedId(product.product_id);
												}}>
												<img src={DeleteSvg} alt='deleteBtn' />
											</button>
											<button
												className='ellipsis'
												onClick={() => {
													setInfoId(product.product_id);
													setInfoNameRu(product.product_name_ru);
													setInfoNameUz(product.product_name_uz);
													setInfoDescUz(
														product.product_description_uz,
													);
													setInfoDescRu(
														product.product_description_ru,
													);
													setInfoImg(product.product_image_url);
													setInfoImg(product.product_image_url);
													setInfoPrice(product.product_price);
													setInfoDate(product.product_create_at);
													setInfoModal(true);
												}}>
												<i className='fa-solid fa-ellipsis'></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className='add'>
						<button
							onClick={() => {
								setAddModal(true);
							}}>
							Добавить
						</button>
					</div>
					<Pagination
						page={page}
						setPage={setPage}
						data={productsList.data}
					/>
				</div>
			) : (
				<div className='loader'>
					<div className='loader__wrap'>
						<div className='bar1'></div>
						<div className='bar2'></div>
						<div className='bar3'></div>
						<div className='bar4'></div>
						<div className='bar5'></div>
						<div className='bar6'></div>
						<div className='bar7'></div>
						<div className='bar8'></div>
						<div className='bar9'></div>
						<div className='bar10'></div>
						<div className='bar11'></div>
						<div className='bar12'></div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Products;
