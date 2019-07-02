const express = require("express");
const router = express.Router();
var unirest = require("unirest");
const Episode = require("../models/episode-model");
const Bibliotheque = require("../models/bibliotheque-model");

/* GET home page */
router.post("/podcasts", (req, res, next) => {
  //let query = "Game%20of%20Thrones";

  let searchedPodcast = req.body.query;
  let page = req.body.page;
  let query = encodeURI(searchedPodcast);
  //console.log("query", query, searchedPodcast, req.body.query);

  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/search?q=${query}&sort_by_date=0&scope=podcast&offset=${page *
        9}&date_filter=any&language=French&country=France&age_filter=any&ecount_min=0&ecount_max=0`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      res.send(result.body);
    });
});

router.get("/lastTrends", (req, res, next) => {
  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/best_podcasts/?genre_id=68&page=2&region=fr&language=French&country=France&safe_mode=1`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      res.send(result.body);
    });
});

router.get("/categories", (req, res, next) => {
  unirest
    .get(`https://listen-api.listennotes.com/api/v2/genres`)
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      res.send(result.body);
    });
});

router.get("/lyssnaRecommandation", (req, res, next) => {
  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/episodes/7f040bf77b21424e8b12390c6e7d427f/recommendations?safe_mode=1`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      res.send(result.body);
    });
});

router.get("/policier", (req, res, next) => {
  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/episodes/266f79f9b70a4a77a290a78076c31988/recommendations?safe_mode=1`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      res.send(result.body);
    });
});

router.post("/bestPodcastsByGenre", (req, res, next) => {
  let searchGenre = req.body.query;
  let query = searchGenre;
  //console.log("query :" + query);

  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${query}&region=fr&safe_mode=1`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      res.send(result.body);
    });
});

// PODCAST

router.get("/podcast/:id", (req, res, next) => {
  let genre = req.params.id;
  //console.log("genre", genre);

  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${genre}&region=fr`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      //console.log("------result");
      //console.log(result.raw_body);
      res.json(result.body);
    });
});

router.post("/podcastEpisodes", (req, res, next) => {
  let searchEpisodes = req.body.query;
  let query = searchEpisodes;
  //console.log(query);

  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/podcasts/${query}?sort=recent_first`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      res.send(result.body);
    });
});

// EPISODES

router.post("/topic", (req, res, next) => {
  let searchTopic = req.body.query;
  //let query = searchTopic;
  let query = encodeURI(searchTopic);
  //console.log(query);
  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/search?q=${query}&sort_by_date=0&scope=podcast&date_filter=any&language=French&country=France&age_filter=any&ecount_min=0&ecount_max=0`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      res.send(result.body);
    });
});

router.get("/episodes/:id", (req, res, next) => {
  let topic = req.params.id;
  let page = req.body.page;
  //console.log("topic", topic);

  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/search?q=${topic}&sort_by_date=0&scope=podcast&offset=${page *
        12}&date_filter=any&language=French&country=France&age_filter=any&ecount_min=0&ecount_max=0`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      //console.log(result);
      res.json(result.body);
    });
});

// RECOMMENDATIONS

router.post("/recommendations", (req, res, next) => {
  let searchRecommendation = req.body.query;
  let query = encodeURI(searchRecommendation);
  //console.log(query);
  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/episodes/${query}/recommendations?safe_mode=1`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      //console.log("------result");
      //console.log(result.raw_body);
      res.send(result.body);
    });
});

router.get("/recommendations/:id", (req, res, next) => {
  let recommendations = req.params.id;
  //console.log("recommendations", recommendations);

  unirest
    .get(
      `https://listen-api.listennotes.com/api/v2/episodes/${recommendations}/recommendations?safe_mode=1`
    )
    .header("X-ListenAPI-Key", "45972432384c472f99957ea77dc60840")
    .end(function(result) {
      //console.log("------result");
      //console.log(result.raw_body);
      //console.log(result);
      res.json(result.body);
    });
});

// Add comments and rating

router.post("/addReviews", (req, res, next) => {
  const { id, user, rating, comments, title, image } = req.body;

  //console.log(req.body);
  const newEpisode = new Episode({
    id,
    reviews: [
      {
        id,
        user,
        rating,
        comments,
        title,
        image
      }
    ]
  });
  newEpisode
    .save()

    .then(episode => {
      res.send(req.body);
    })
    .catch(error => {
      //console.log(error);
    });
});

router.get("/reviews/:id", (req, res, next) => {
  let episode = req.params.id;

  Episode.find({
    id: { $eq: episode }
  })
    .populate("reviews.user")
    .then(result => {
      //console.log(result);
      res.json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

// POST EPISODE TO PLAYLIST

router.post("/addEpisodeToMyPlaylist", (req, res, next) => {
  const {
    user,
    id,
    image,
    title_original,
    publisher_original,
    audio
  } = req.body;

  console.log(req.body);

  const newBibliotheque = new Bibliotheque({
    user,
    id,
    image,
    title_original,
    publisher_original,
    audio
  });
  newBibliotheque
    .save()

    .then(episode => {
      res.send(req.body);
    })
    .catch(error => {
      console.log(error);
    });
});

// DELETE EPISODE FROM PLAYLIST

router.post("/deleteEpisodeFromPlaylist/:id", (req, res, next) => {
  Bibliotheque.findByIdAndRemove({ _id: req.params.id })
    .then(episode => {
      res.send(req.body);
    })
    .catch(error => {
      console.log(error);
    });
});

// GET PLAYLIST FROM USER

router.get("/playlist/:id", (req, res, next) => {
  let user = req.params.id;

  console.log("user", user);
  console.log("req.params.id", req.params.id);

  Bibliotheque.find({
    user: { $eq: user }
  })
    .sort({ createdAt: -1 })
    .populate("user")
    .then(result => {
      //console.log(result);
      res.json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

// GET LAST REVIEWS

router.get("/lastReviews", (req, res, next) => {
  Episode.find()
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("reviews.user")
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
