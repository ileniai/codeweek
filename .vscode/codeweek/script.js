import { GET } from "./api.js";
//import { products } from "./user.js";

const cE = (type) => document.createElement(type);
const qS = (element) => document.querySelector(element);

//const bodyEl = qS('.body')
const containerEl = qS("#container_user");
const btnAe = qS("#ae");
const btnFl = qS("#fl");
const btnMz = qS("#mz");
const btnEl = qS("#all");
const searchEl = qS("#search-letter");

const errorMessage = (message) => {
  document.querySelector(".message")?.remove();
  const paragrafo = cE("p");
  paragrafo.className = "message";
  paragrafo.textContent = message;
  containerEl.appendChild(paragrafo);
};

//I CREATE THE CARD

const createCard = (user, filter) => {
  const { id, name, username, email, phone } = user;

  const cardEl = cE("div");
  cardEl.className = "card";

  const imgEl = cE("img");
  imgEl.setAttribute(
    "src",
    "https://randomuser.me/api/portraits/women/" + id + ".jpg"
  );
  imgEl.setAttribute("alt", name);
  imgEl.className = "image";

  const boxEl = cE("div");
  boxEl.className = "intro";

  const nameEL = cE("h2");
  nameEL.textContent = name;
  nameEL.className = "name";

  const userNameEl = cE("h3");
  userNameEl.textContent = username;
  userNameEl.className = "info";

  const emailEl = cE("p");
  emailEl.textContent = email;
  emailEl.className = "info";

  const phoneEl = cE("p");
  phoneEl.textContent = phone;
  phoneEl.className = "info";

  boxEl.append(nameEL, userNameEl, emailEl, phoneEl);
  cardEl.append(imgEl, boxEl);
  //containerEl.appendChild(cardEl)

  //I CREATE CONDITIONS

  const initial = name[0];
  if (filter == "search") {
    containerEl.appendChild(cardEl);
  } else if (filter == "ae") {
    if (
      initial.toLowerCase() == "a" ||
      initial.toLowerCase() == "b" ||
      initial.toLowerCase() == "c" ||
      initial.toLowerCase() == "d" ||
      initial.toLowerCase() == "e"
    ) {
      containerEl.appendChild(cardEl);
    }
  } else if (filter == "fl") {
    if (
      initial.toLowerCase() == "f" ||
      initial.toLowerCase() == "g" ||
      initial.toLowerCase() == "h" ||
      initial.toLowerCase() == "i" ||
      initial.toLowerCase() == "k" ||
      initial.toLowerCase() == "l"
    ) {
      containerEl.appendChild(cardEl);
    }
  } else if (filter == "mz") {
    if (
      initial.toLowerCase() == "m" ||
      initial.toLowerCase() == "n" ||
      initial.toLowerCase() == "o" ||
      initial.toLowerCase() == "p" ||
      initial.toLowerCase() == "r" ||
      initial.toLowerCase() == "s" ||
      initial.toLowerCase() == "t" ||
      initial.toLowerCase() == "v" ||
      initial.toLowerCase() == "z"
    ) {
      containerEl.appendChild(cardEl);
    }
  } else if (filter == "all") {
    containerEl.appendChild(cardEl);
  } else {
    errorMessage("Attention! No users found!");
  }
};

//I ADD EVENTS TO THE BUTTONS

btnAe.addEventListener("click", () => {
  containerEl.textContent = ""; //innerHTML = ''
  GET("users").then((users) =>
    users.forEach((user) => {
      createCard(user, "ae");
    })
  );
});
btnFl.addEventListener("click", () => {
  containerEl.textContent = ""; //innerHTML = ''
  GET("users").then((users) =>
    users.forEach((user) => {
      createCard(user, "fl");
    })
  );
});
btnMz.addEventListener("click", () => {
  containerEl.textContent = ""; //innerHTML = ''
  GET("users").then((users) =>
    users.forEach((user) => {
      createCard(user, "mz");
    })
  );
});

btnEl.addEventListener("click", () => {
  containerEl.textContent = ""; //innerHTML = ''
  GET("users").then((users) =>
    users.forEach((user) => {
      createCard(user, "all");
    })
  );
});

  //SET EVENT FOR SEARCH


searchEl.addEventListener("input", (event) => {
  containerEl.textContent = ""; //innerHTML = ''
  let serchedName = "";
  serchedName = event.target.value;

  GET("users").then((users) => {
    const filterdUsers = users.filter((item) =>
      item.name.includes(serchedName)
    );

    if (filterdUsers.length === 0) {
      errorMessage("Attention! No users found!");
    } else {
      filterdUsers.map((user) => createCard(user, "search"));
    }

  });
});

