"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  return $(`
      <li id="${story.storyId}" class="story">
      <span class="star">${changeStarColor(story)}</i></span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
  $navLeft.show();
}
/**grab the values from the input story form and use them to call
 * the storylist.addstory method and then put that new story
 * on the page
 */
async function getSubmittedStoryFromForm(evt) {
  evt.preventDefault();
  const author = $('#author-input').val();
  const title = $("#title-input").val();
  const url = $("#story-url-input").val();
  await storyList.addStory(currentUser, {
    author,
    title,
    url
  });
  console.log('clicked');
  $inputStory.hide();
  await getAndShowStoriesOnStart();
}

$('#input-story').on('submit', getSubmittedStoryFromForm);

/** when called looks at the favorites property in the current user
 * and generates the html for the page
 */

function putFavoriteStoriesOnPage() {
  console.debug("putFavoriteStoriesOnPage");

  $favoriteList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $favStory = generateStoryMarkup(story);
    $favoriteList.append($favStory);

  }

}
/** creates an array of favorite stories from the currentuser properties */

function getFavStoryIds() {
  const favArr = [];
  for (let i = 0; i < currentUser.favorites.length; i++) {
    favArr.push(currentUser.favorites[i].storyId);
  }
  return favArr;
}

/** looks at the event target storyID and updates the currentUser's
 * favorites property. adjusts the color of the star element to reflect
 * change
 */

async function updateUserFavoritesStories(evt) {
  evt.preventDefault();
  const currentStoryId = $(evt.target).closest(".story").attr("id");
  console.log("updates favs");
  const favArr = getFavStoryIds();
  if (favArr.includes(currentStoryId)) {
    await currentUser.removeFavorite(currentStoryId);
    $(evt.target).closest('.star').empty().append(
      '<i id="starfavbtn" class="far fa-star"></i>'
    );
  }
  else {
    await currentUser.addFavorite(currentStoryId);
    $(evt.target).closest('.star').empty().append(
      '<i id="starfavbtn" class="fas fa-star"></i>'
    );
  }
}

$allStoriesList.on("click", ".star", updateUserFavoritesStories);

$favoriteList.on("click", ".star", updateUserFavoritesStories);

/** takes in a story, generates the currentUser's favorite stories and creates
 * a solid star if the current story is included in the the favorites, or a star
 * outline if the story is not included in favorites.
 */

function changeStarColor(story) {
  const currentStoryId = story.storyId;
  const favArr = getFavStoryIds();
  if (favArr.includes(currentStoryId)) {
    return ('<i id="starfavbtn" class="fas fa-star"></i>');
  } else {
    return '<i id="starfavbtn" class="far fa-star"></i>';
  }
}

