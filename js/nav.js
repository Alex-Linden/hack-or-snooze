"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();

}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navLeft.show();
}

/** When called displays submit story form */

function showSubmitNewStoryForm(evt) {
  console.log("click");
  evt.preventDefault();
  $inputStory.show();
}

$navSubmit.on("click", showSubmitNewStoryForm);

/** when called hides all stories list and shows favorite stories list */

function showFavorites(evt) {
  evt.preventDefault();
  console.log('Favorites');
  putFavoriteStoriesOnPage();
  $favoriteList.show();
  $allStoriesList.hide();
}

$navFavorite.on('click', showFavorites);

