const usersModule = (() => {
	const BASE_URL = "http://localhost:3000/api/v1/users";

	const headers = new Headers();
	headers.set("Content-Type", "application/json");

	return {
		fetchAllUsers: async () => {
			const res = await fetch(BASE_URL);
			const users = await res.json();

			users.forEach((user) => {
				const body = `<tr>
                           <td>${user.id}</td>
                           <td>${user.name}</td>
                           <td>${user.profile}</td>
                           <td>${user.date_of_birth}</td>
                           <td>${user.created_at}</td>
                           <td>${user.updated_at}</td>
                           <td><a href="edit.html?uid=${user.id}">編集</a></td>
                           
                        </tr>`;
				document
					.getElementById("users-list")
					.insertAdjacentHTML("beforeend", body);
			});
		},
		createUser: async () => {
			const name = document.getElementById("name").value;
			const profile = document.getElementById("profile").value;
			const dateOfBirth = document.getElementById("date-of-birth").value;
			const body = {
				name,
				profile,
				date_of_birth: dateOfBirth,
			};
			console.log(body);

			const res = await fetch(BASE_URL, {
				method: "POST",
				headers,
				body: JSON.stringify(body),
			});
			const resJson = await res.json();
			console.log(resJson);

			alert(resJson.message);
			location.href = "/";
		},
		setExistingValue: async (uid) => {
			const res = await fetch(BASE_URL + "/" + uid);
			const resJson = await res.json();

			document.getElementById("name").value = resJson.name;
			document.getElementById("profile").value = resJson.profile;
			document.getElementById("date-of-birth").value = resJson.date_of_birth;
		},
		saveUser: async (uid) => {
			const name = document.getElementById("name").value;
			const profile = document.getElementById("profile").value;
			const dateOfBirth = document.getElementById("date-of-birth").value;
			const body = {
				name,
				profile,
				date_of_birth: dateOfBirth,
			};
			console.log(body);

			const res = await fetch(BASE_URL + "/" + uid, {
				method: "PUT",
				headers,
				body: JSON.stringify(body),
			});
			const resJson = await res.json();
			console.log(resJson);

			alert(resJson.message);
			location.href = "/";
		},
		deleteUser: async (uid) => {
			const ret = confirm("このユーザーを削除しますか？");
			if (!ret) {
				return false;
			} else {
				const res = await fetch(BASE_URL + "/" + uid, {
					method: "DELETE",
					headers,
				});
				const resJson = await res.json();
				alert(resJson.message);
				location.href = "/";
			}
		},
	};
})();
