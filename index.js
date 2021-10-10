/**
 * Choosing JS over TS at the moment because it's getting late and need to get some sleep.
 * Otherwise I would apply all of the types.
 *
 * Prompt: Write the lambda to validate the event linked from github in a language of your choice.
 */
exports.handler = async function (event, context) {
  // get the release event data from the `event`
  const {
    id,
    type,
    actor,
    repo,
    payload: { action, release },
  } = event; // making the assumption that `ReleaseEvent` is `event` and not a sub property of `event`. should verify this later

  // validate and process the release event, not quite sure what exactly we want to validate or process. i need to get this question answered.

  // is this a repo we are concerned about?
  const validRepo = validateRepo(repo);

  // is the actor someone we expect to trigger the release?
  const validActor = validateActor(actor);

  // validate the event linked from github
  const { url, html_url, tarball_url, zipball_url } = release;

  const validUrl = verifyUrl(url);
  const validHtmlUrl = verifyUrl(html_url);
  const validTarball = verifyUrl(tarball_url);
  const validZipball = verifyUrl(zipball_url);

  if (
    !validRepo ||
    !validActor ||
    !validUrl ||
    !validHtmlUrl ||
    !validTarball ||
    !validZipball
  ) {
    // we might want to log an invalid release attempt to do some investigation in the future
    // could use CloudWatch logs for this
    return;
  }

  // send the release event to a SQS
  sendVerifiedReleaseEventToSQS(event); // still assuming that `ReleaseEvent` is `event`. we could also map the `ReleaseEvent` to a domain model. That could be done here or in a lambda further down the line of this event driven architecture.
};

const validateRepo = (repo) => {
  // check a watchlist
};

const validateActor = (actor) => {
  // check a permissions list
};

const verifyUrl = (url) => {
  // verify that the url exists
};

const sendVerifiedReleaseEventToSQS = (event) => {
  // google how to publish an event to a SQS
};
