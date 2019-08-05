let auth0 = null;

const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience // NEW - add the audience value
  });
};

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;

  document.getElementById("btn-sync-fitbit").disabled = !isAuthenticated;

  // NEW - add logic to show/hide gated content after authentication
  if (isAuthenticated) {
    let token = await auth0.getTokenSilently();
    let userProfile = JSON.stringify(await auth0.getUser());

    document.getElementById("gated-content").classList.remove("hidden");
    // document.getElementById("ipt-access-token").innerText = token;
    // document.getElementById("ipt-user-profile").innerText = userProfile;

    let currentUser = await auth0.getUser();

    console.log("RIGHT HERE>>>>>>");
    console.log(currentUser);

    const response = await fetch(`/accounts/${currentUser.sub}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    let results = await response.json();

    console.log();
    console.log(currentUser);

    if (results.statusCode == 404) {
      await fetch("/accounts", {
        method: "post",
        body: JSON.stringify({
          firstName: currentUser.given_name,
          lastName: currentUser.family_name,
          id: currentUser.sub
        }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      const responseElement = document.getElementById("api-call-result");
      responseElement.innerText = JSON.stringify(results, {}, 2);
    }
  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }
};

const login = async () => {
  console.log("login attempt");
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};

const syncFitbit = async () => {
  try {
    // Get the access token from the Auth0 client
    const token = await auth0.getTokenSilently();
    let currentUser = await auth0.getUser();

    console.log(window.location.origin);

    window.location.href = `${window.location.origin}/accounts/${
      currentUser.sub
    }/authorizeDevice/fitbit`;
  } catch (e) {
    console.error(e);
  }
};

window.onload = async () => {
  await configureClient();
  updateUI();

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    // show the gated content
    return;
  }

  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    // Process the login state
    await auth0.handleRedirectCallback();

    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};
