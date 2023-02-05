const Movie = require("../models/Movies");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getWatchListMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({ user: req.user.id, Status: "watching" });

  res.status(200).json(movies);
});

const getConsideringMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({ user: req.user.id, Status: "considering" });

  res.status(200).json(movies);
});

const getCompletedMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({ user: req.user.id, Status: "completed" });

  res.status(200).json(movies);
});

const watchlistMovies = asyncHandler(async (req, res) => {
  const { Title, Poster, Type, Year } = req.body;

  const movie = await Movie.create({
    Title: req.body.Title,
    Poster: req.body.Poster,
    Type: req.body.Type,
    Status: "watching",
    user: req.user.id,
  });
  res.status(201).json(movie);
});


const ConsideringMovies = asyncHandler(async (req, res) => {
  const { Title, poster, type, year } = req.body;

  const movie = await Movie.create({
    Title: req.body.Title,
    Poster: req.body.Poster,
    Type: req.body.Type,
    Status: "considering",
    user: req.user.id,
  });
  res.status(201).json(movie);
});
const CompletedMovies = asyncHandler(async (req, res) => {
  const { Title, Poster, Type, Year } = req.body;

  const movie = await Movie.create({
    Title: req.body.Title,
    Poster: req.body.Poster,
    Type: req.body.Type,
    Status: "completed",
    user: req.user.id,
  });
  res.status(201).json(movie);
});

const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    res.status(401);
    throw new Error("Movie not found");
  }
  if (movie.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await movie.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getWatchListMovies,
  getConsideringMovies,
  getCompletedMovies,
  watchlistMovies,
  ConsideringMovies,
  CompletedMovies,
  deleteMovie,
};
