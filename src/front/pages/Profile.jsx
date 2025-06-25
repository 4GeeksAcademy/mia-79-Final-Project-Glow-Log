import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { NavBar } from "../components/Navbar.jsx";

// This component is used to display the profile page of the user.
// Coppied from the Home Component
// TODO: Refactor this component for the profile page
export const Profile = () => {

	const { store, dispatch } = useGlobalReducer()

	// const loadMessage = async () => {
	// 	try {
	// 		const backendUrl = import.meta.env.VITE_BACKEND_URL

	// 		if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

	// 		const response = await fetch(backendUrl + "/api/hello")
	// 		const data = await response.json()

	// 		if (response.ok) dispatch({ type: "set_hello", payload: data.message })

	// 		return data

	// 	} catch (error) {
	// 		if (error.message) throw new Error(
	// 			`Could not fetch the message from the backend.
	// 			Please check if the backend is running and the backend port is public.`
	// 		);
	// 	}

	// }

	// useEffect(() => {
	// 	loadMessage()
	// }, [])

	return (
		<>
			<NavBar />
			<div className="text-center mt-5">
				<h1 className="display-4">Profile Page</h1>
				<form>
					<div class="mb-3">
						<label for="exampleFormControlInput1" class="form-label">Email address</label>
						<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
					</div>
					<div class="mb-3">
						<label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
						<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
					</div>

					<div className="button-wrap">
						<button type="submit">Save</button>
						<button>Exit</button>
					</div>
				</form>
				{/* <div className="alert alert-info">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div> */}
			</div>
		</>
	);
}; 