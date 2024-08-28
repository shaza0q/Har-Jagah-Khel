const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const fileUploadRoute = require('./file-upload.route');
const docsRoute = require('./docs.route');
const gmachRoute = require('./gmach.route');
const formCategory = require('./formCategory.route');
const communityNewsRoute = require('./communityNews.route');
const communityCalendarRoute = require('./communityCalendar.route');
const simchasRoute = require('./simchas.route');
const postCollection = require('./postCollection.route');
const inspirationalRoute = require('./inspirationalStories.route');
const freeAdvertisement = require('./freeAdvertisements.route');
const needsAndWantsRoute = require('./needsAndWants.route');
const bereavementsRoute = require('./bereavements.route');
const comunityEventRoutes = require('./communityEvents.route');
const refuaShelaimaRoute = require('./refuaShelaima.route');
const contactUsRoute = require('./contactUs.route');
const jobRoute = require('./job.route');
const realEstateRoute = require('./realestate.route');
const registerBusinessRoute = require('./registerBusiness.route');
const postRoute = require('./post.route');
const trendingRoute = require('./trending.route');
const allRoute = require('./allPost.route');
const shivaMinyanRoute = require('./shivaMinyan.route');
const minyanRoute = require('./minyanMaker.route');
const shidduchimRoute = require('./shidduchim.route');
const classifiedRoute = require('./classifieds.route');
const myNachamu = require('./nachamuProfile.route');
const comingSoonRoute = require('./comingSoon.route');
const comingSoonEmailRoute = require('./comingSoonEmail.route');
const footerRoute = require('./footer.route');
const demographicsRoute = require('./demographics.route');
const couponAndWeeklySpecialRoute = require('./coupon-weeklySpecial.route');
const newletterRoute = require('./newsletter.route');
const registerPostRoute = require('./registerPost.route');
const luckydrawRoute = require('./luckydraw.route');
const influencerRoute = require('./influencer.route');
const categoryRoute = require('./category.route');
const referralRoute = require('./referralProcess.route');
const articleRoute = require('./articles.route');
const userStatsRoute = require('./userStats.route');
const categorySubcategoryRoute = require('./category-subcategory.route');
const paidAdvertisementRoute = require('./paidAdvertisement.route');
const rewardObjectRoute = require('./rewardObject.route');
const successMessageRoute = require('./successMessage.route');
const changePostStatusRoute = require('./changePostStatus.route');
const ctaRoute = require('./cta.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/userStats',
    route: userStatsRoute,
  },
  {
    path: '/myNachamu',
    route: myNachamu,
  },
  {
    path: '/comingSoon',
    route: comingSoonRoute,
  },
  {
    path: '/comingSoonEmail',
    route: comingSoonEmailRoute,
  },
  {
    path: '/footer',
    route: footerRoute,
  },
  {
    path: '/post/gmach',
    route: gmachRoute,
  },
  {
    path: '/post/communityNews',
    route: communityNewsRoute,
  },
  {
    path: '/post/simchas',
    route: simchasRoute,
  },
  {
    path: '/post/inspirationalStories',
    route: inspirationalRoute,
  },
  {
    path: '/post/freeAdvertisements',
    route: freeAdvertisement,
  },
  {
    path: '/post/classified',
    route: classifiedRoute,
  },
  {
    path: '/post/needsAndWants',
    route: needsAndWantsRoute,
  },
  {
    path: '/post/bereavements',
    route: bereavementsRoute,
  },
  {
    path: '/post/communityEvents',
    route: comunityEventRoutes,
  },
  {
    path: '/post/refuaShelaima',
    route: refuaShelaimaRoute,
  },
  {
    path: '/post/contactUs',
    route: contactUsRoute,
  },
  {
    path: '/post/jobs',
    route: jobRoute,
  },
  {
    path: '/post/realEstate',
    route: realEstateRoute,
  },
  {
    path: '/post/registerBusiness',
    route: registerBusinessRoute,
  },
  {
    path: '/post/communityCalendar',
    route: communityCalendarRoute,
  },
  {
    path: '/post/trending',
    route: trendingRoute,
  },
  {
    path: '/post/all',
    route: allRoute,
  },
  {
    path: '/post/shivaminyan',
    route: shivaMinyanRoute,
  },
  {
    path: '/post/minyan',
    route: minyanRoute,
  },
  {
    path: '/post/shidduchim',
    route: shidduchimRoute,
  },
  {
    path: '/generic',
    route: postRoute,
  },
  {
    path: '/file-upload',
    route: fileUploadRoute,
  },
  {
    path: '/forms',
    route: formCategory,
  },
  {
    path: '/collection',
    route: postCollection,
  },
  {
    path: '/couponAndWeeklySpecial',
    route: couponAndWeeklySpecialRoute,
  },
  {
    path: '/demographics',
    route: demographicsRoute,
  },
  {
    path: '/newsletter',
    route: newletterRoute,
  },
  {
    path: '/registerPost',
    route: registerPostRoute,
  },
  {
    path: '/luckydraw',
    route: luckydrawRoute,
  },
  {
    path: '/influencer',
    route: influencerRoute,
  },
  {
    path: '/referralProcess',
    route: referralRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/searchArticle',
    route: articleRoute,
  },
  {
    path: '/categorySubcategory',
    route: categorySubcategoryRoute,
  },
  {
    path: '/paidAdd',
    route: paidAdvertisementRoute,
  },
  {
    path: '/rewardObject',
    route: rewardObjectRoute,
  },
  {
    path: '/successMessage',
    route: successMessageRoute,
  },
  {
    path: '/changePostStatus',
    route: changePostStatusRoute,
  },
  {
    path: '/cta',
    route: ctaRoute,
  },
];
const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;