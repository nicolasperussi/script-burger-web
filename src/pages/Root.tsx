import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Root() {
	// Remove when possible
	let location = useLocation();
	let navigate = useNavigate();
	useEffect(() => {
		if (location.pathname === '/') navigate('/orders');
	});

	return (
		<div className="flex bg-neutral-100">
			<Sidebar />
			<div className="p-10 w-full h-screen">
				<Outlet />
			</div>
		</div>
	);
}

export default Root;
