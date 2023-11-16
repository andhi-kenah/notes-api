function login() {
    const user = {
        username: "John",
        password: "john",
    };
    axios
        .post("http://localhost:9000/api/auth/login", user)
        .then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            console.log(localStorage.getItem("token"));
        })
        .catch((err) => console.log(err));
}

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
)}`;

function register() {
    const user = {
        username: "John",
        password: "john",
        confirmation: "john",
    };
    axios
        .post("http://localhost:9000/api/auth/register", user)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
}

function notes() {
    axios
        .get("http://localhost:9000/api/notes")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
}
