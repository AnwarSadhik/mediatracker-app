const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/watchlist")
  .get(protect, movieController.getWatchListMovies)
  .post(protect, movieController.watchlistMovies);
router
  .route("/dashboard/:id")
  .delete(protect, movieController.deleteMovie)

router
  .route("/considering")
  .get(protect, movieController.getConsideringMovies)
  .post(protect, movieController.ConsideringMovies);
router
  .route("/considering:id")
  .delete(protect, movieController.deleteMovie)

router
  .route("/completed")
  .get(protect, movieController.getCompletedMovies)
  .post(protect, movieController.CompletedMovies);
router
  .route("/completed/:id")
  .delete(protect, movieController.deleteMovie)

module.exports = router;
