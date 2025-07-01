import React, { useEffect } from "react"

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Profile = () => {

	const { store, dispatch } = useGlobalReducer()
	// Set Page Title
	document.title = "Glow Log - Profile";


	return (
		// todo: refactor css with css custom properties
		// add more responsive design bootstrap classes
		<div className="container-lg pb-3" >
			<div className="text-start mt-5 ">
				<div className="row">
					<div className="col-4 mx-auto">
						<h1 className="display-4">User Profile</h1>
						<form>

							{/* NAME - Input */}
							<div className="mb-3">
								<label htmlFor="name" className="form-label">Name</label>
								<input type="text" class="form-control" id="name" placeholder="Enter a Name" />

							</div>

							{/* {EMAIL - Input} */}
							<div className="mb-3">
								<label htmlFor="email" className="form-label">Email address</label>
								<input type="email" class="form-control" id="email" placeholder="name@example.com" />
							</div>

							{/* PASSWORD Input */}
							<div className="mb-3">
								<label htmlFor="password" className="form-label">Password</label>
								<input class="form-control" id="password" rows="3" />
							</div>

							{/* PHOTO - BIO */}
							<div className="mb-3">
								<img className="img-thumbnail" src="https://placehold.co/200x200/png" alt="Bio Image" />
							</div>


							<div className="mb-3">
								<label htmlFor="formFileSm" className="form-label">Upload Bio 200x200 Image </label>
								<input class="form-control form-control-sm" id="formFileSm" type="file" />
							</div>

							{/* BUTTONS  */}
							<div className="button-wrap d-flex justify-content-center pb-3">
								<button className="btn btn-primary" type="submit">Save</button>
								<button className="ms-3 btn btn-outline-secondary" type="button">Exit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div >
	);
};