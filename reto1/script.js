function setUserCookie(userId) {
  // Call to the backend to set the cookie
  fetch("http://localhost:3000/setUserCookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userId }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Cookie set successfully");
      } else {
        console.error("Failed to set cookie");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function clearUserCookie() {
  //Call to the backend to clear the cookie
  fetch("http://localhost:3000/clearUserCookie", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Cookie cleared successfully");
      } else {
        console.error("Failed to clear cookie");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function changeTheme(theme) {
  if (theme) {
    document.body.className = theme;
  }

  // Call to the backend to change the theme cookie
  fetch("http://localhost:3000/changeTheme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ theme }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Theme changed successfully");
      } else {
        console.error("Failed to change theme");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
