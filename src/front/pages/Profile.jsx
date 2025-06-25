import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar.jsx";

// This component is used to display the profile page of the user.
// Coppied from the Home Component
// TODO: Refactor this component for the profile page
export const Profile = () => {

	const { store, dispatch } = useGlobalReducer()



	return (
		<>
			<Navbar />
			<div className="text-center mt-5">
				<h1 className="display-4">Profile Page</h1>
				<form>
					<div class="mb-3">
						<label for="FormControlName" class="form-label">Name</label>
						<input type="text" class="form-control" id="FormControlName" placeholder="Enter a Name" />
						<label for="exampleFormControlemail" class="form-label">Email address</label>
						<input type="email" class="form-control" id="exampleFormControlemail" placeholder="name@example.com" />
					</div>
					<div class="mb-3">
						<label for="FormControlPassword" class="form-label">Password</label>
						<input class="form-control" id="FormControlPassword" rows="3" />
					</div>

					<div className="button-wrap">
						<button type="submit">Save</button>
						<button>Exit</button>
					</div>
				</form>

			</div>
		</>
	);
}; 