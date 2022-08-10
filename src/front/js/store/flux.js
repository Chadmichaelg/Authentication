const getToken = () => {
	const tokenObject = localStorage.getItem("token");
	if (
	(!tokenObject || typeof tokenObject === "undefined") &&
	!window.location.href.includes("/login")
	) {
	window.location.href = "/login";
	}
	return JSON.parse(tokenObject)?.access_token || null;
};

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiURL: process.env.BACKEND_URL,
			token: [],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			logOut: function () {
				localStorage.clear();
				window.location.href = "/";
			},
			login: async (email, password) => {
				try {
				const response = await fetch(getStore().apiURL + "/api/login", {
					method: "POST",
					headers: {
					"Content-Type": "application/json",
					},
					body: JSON.stringify({
					email,
					password,
					}),
				});
				if (response.ok) {
					const token = await response.json();
					localStorage.setItem("token", JSON.stringify(token));
					console.log(response);
		
					return true;
				} else {
					throw new Error("Password is not correct");
				}
				} catch (error) {
				throw Error("Please check your credentials");
				}
			},
			formSignup: async (
				name,
				email,
				password,
				password2,
			) => {
				try {
				console.log("post /formsignup");
				const response = await fetch(getStore().apiURL + "/api/FormSignup/", {
					method: "POST",
					headers: {
					"Content-Type": "application/json",
					},
					body: JSON.stringify({
					name,
					email,
					password,
					password2,
					}),
				});
				return response.json();
				} catch (error) {
				throw error;
				}
			},

			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

				//reset the global store
				// setStore({ demo: demo });
			}
		}
	};
// };

export default getState;
