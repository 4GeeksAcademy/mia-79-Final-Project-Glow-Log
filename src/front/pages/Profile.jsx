import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
// import { Navbar } from "../components/Navbar.jsx";

// This component is used to display the profile page of the user.
// Coppied from the Home Component
// TODO: Refactor this component for the profile page
export const Profile = () => {

	const { store, dispatch } = useGlobalReducer()



	return (
		<div className="container">
			<div className="text-center mt-5">
				<h1 className="display-4">Profile Page</h1>
				<form>
					{/* NAME - Input */}
					<div className="mb-3">
						<label htmlFor="name" class="form-label">Name</label>
						<input type="text" class="form-control" id="name" placeholder="Enter a Name" />

					</div>
					{/* {EMAIL - Input} */}
					<div className="mb-3">
						<label htmlFor="email" class="form-label">Email address</label>
						<input type="email" class="form-control" id="email" placeholder="name@example.com" />
					</div>
					{/* PASSWORD Input */}
					<div className="mb-3">
						<label htmlFor="password" class="form-label">Password</label>
						<input class="form-control" id="password" rows="3" />
					</div>
					{/* BUTTONS  */}
					<div className="button-wrap">
						<button className="btn btn-primary" type="submit">Save</button>
						<button className="btn btn-outline-secondary" type="button">Exit</button>
					</div>
				</form>

			</div>
		</div>
	);
};