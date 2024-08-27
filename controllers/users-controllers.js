const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "1",
    name: "Ali",
    email: "ali@test.com",
    password: "testers",
    places: "2",
    image:
      "https://assets.pokemon.com/assets/cms2/img/misc/countries/au/country_detail_pokemon.png",
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@test.com",
    password: "testers",
    places: "2",
    image:
      "https://assets.pokemon.com/assets/cms2/img/misc/countries/au/country_detail_pokemon.png",
  },
  {
    id: "3",
    name: "Majed",
    email: "majed@test.com",
    password: "testers",
    places: "2",
    image:
      "https://assets.pokemon.com/assets/cms2/img/misc/countries/au/country_detail_pokemon.png",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuid.v4(),
    name, // name: name
    email,
    password,
    image:
      "https://assets.pokemon.com/assets/cms2/img/misc/countries/au/country_detail_pokemon.png",
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
