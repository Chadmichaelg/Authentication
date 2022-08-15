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
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

FormSignup: async (email, password, password2, setMessageState) => {
	console.log("I am the signup function");
	console.log(email);

	try {
		const res = await fetch(`${process.env.BACKEND_URL}/user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ email, password, password2 })
		});
		if (res.ok) {
			const token = await res.json();

			// localStorage.setItem("first_name", JSON.stringify(first_name));
			localStorage.setItem("token", JSON.stringify(token));
			console.log("The response is ok", res);
			getActions().getActiveUser(email);

			return true;
		} else {
			throw "Something went wrong";
		}
	} catch (error) {
		throw Error("Something went wrong");
	}
},

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

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded, synching the session storage token")
				if(token && token !="" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Logging out")
				setStore({ token: null });
			},

			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};

				try{		
				const resp = await fetch('https://3001-4geeksacade-reactflaskh-jm5oyejsu73.ws-us60.gitpod.io/api/token', opts)
				if(resp.status === 200){
					alert("There has been some error");
					return false;
				}
						
				const data = await resp.json();
				console.log("this came from the backend", data)
				sessionStorage.setItem("token", data.access_token);
				setStore({ token: data.access_token })
				return true;
			}
			catch(error){
				console.error("There has been an error login in")
			}
		},

				getMessage: () => {
					const store = getStore();
					const opts = {
						headers: {
							"Authorization": "Bearer " + store.token
						}
					}
					// fetching data from the backend
					fetch(process.env.BACKEND_URL + "/api/hello", opts)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			FormSignUp: async (email, password, password2, setMessageState) => {
				console.log("I am the signup function");
				console.log(email);

				try {
					const res = await fetch(`${process.env.BACKEND_URL}/user`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password, password2 })
					});
					if (res.ok) {
						const token = await res.json();

						// localStorage.setItem("first_name", JSON.stringify(first_name));
						localStorage.setItem("token", JSON.stringify(token));
						console.log("The response is ok", res);
						getActions().getActiveUser(email);

						return true;
					} else {
						throw "Something went wrong";
					}
				} catch (error) {
					throw Error("Something went wrong");
				}
			}
		}
	};
};

// const getState = ({ getStore, getActions, setStore }) => {
// 	return {
// 		store: {
// 			message: null,
// 			demo: [
// 				{
// 					title: "FIRST",
// 					background: "white",
// 					initial: "white"
// 				},
// 				{
// 					title: "SECOND",
// 					background: "white",
// 					initial: "white"
// 				}
// 			],
// 			token: JSON.parse(localStorage.getItem("token")) || []
// 		},
// 		actions: {
// 			// Use getActions to call a function within a fuction
// 			exampleFunction: () => {
// 				getActions().changeColor(0, "green");
// 			},

// 			getMessage: () => {
// 				// fetching data from the backend
// 				fetch(process.env.BACKEND_URL + "/api/hello")
// 					.then(resp => resp.json())
// 					.then(data => setStore({ message: data.message }))
// 					.catch(error => console.log("Error loading message from backend", error));
// 			},
// 			changeColor: (index, color) => {
// 				//get the store
// 				const store = getStore();

// 				//we have to loop the entire demo array to look for the respective index
// 				//and change its color
// 				const demo = store.demo.map((elm, i) => {
// 					if (i === index) elm.background = color;
// 					return elm;
// 				});

// 				//reset the global store
// 				setStore({ demo: demo });
// 			},
// 			getActiveUser: async email => {
// 				try {
// 					const res = await fetch(`${process.env.BACKEND_URL}/user/active`, {
// 						method: "POST",
// 						headers: {
// 							"Content-Type": "application/json"
// 						},
// 						body: JSON.stringify({ email })
// 					});
// 					const activeUser = await res.json();
// 					setStore({ activeUser: activeUser.first_name });
// 					localStorage.setItem("activeUser", activeUser.first_name);
// 				} catch (error) {
// 					throw Error("Wrong email or password");
// 				}
// 			},
// 			login: async (email, password, navigate) => {
// 				try {
// 					const res = await fetch(`${process.env.BACKEND_URL}/login`, {
// 						method: "POST",
// 						headers: {
// 							"Content-Type": "application/json"
// 						},
// 						body: JSON.stringify({ email, password })
// 					});
// 					if (res.ok) {
// 						const token = await res.json();
// 						localStorage.setItem("token", JSON.stringify(token));
// 						console.log("The response is ok", res);
// 						getActions().getActiveUser(email);
// 						navigate.push("/profile");

// 						return true;
// 					} else {
// 						throw "Something went wrong";
// 					}
// 				} catch (error) {
// 					throw Error("Wrong email or password");
// 				}
// 			},
// 			FormSignup: async (email, password, password2, setMessageState) => {
// 				console.log("I am the signup function");
// 				console.log(email);

// 				try {
// 					const res = await fetch(`${process.env.BACKEND_URL}/user`, {
// 						method: "POST",
// 						headers: {
// 							"Content-Type": "application/json"
// 						},
// 						body: JSON.stringify({ email, password, password2 })
// 					});
// 					if (res.ok) {
// 						const token = await res.json();

// 						// localStorage.setItem("first_name", JSON.stringify(first_name));
// 						localStorage.setItem("token", JSON.stringify(token));
// 						console.log("The response is ok", res);
// 						getActions().getActiveUser(email);

// 						return true;
// 					} else {
// 						throw "Something went wrong";
// 					}
// 				} catch (error) {
// 					throw Error("Something went wrong");
// 				}
// 			}
// 		}
// 	};
// };

export default getState;