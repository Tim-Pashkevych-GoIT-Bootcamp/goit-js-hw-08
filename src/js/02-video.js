import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

/**
  |============================
  | Class to manage Local Storage
  |============================
*/
const localStorageManager = {
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      if (serializedValue) {
        localStorage.setItem(key, serializedValue);
      }
    } catch (error) {
      console.log(
        `Could not save '${key}:${value}' to Local Sorage. Error:`,
        error,
      );
    }
  },
  get(key) {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue === null ? undefined : JSON.parse(serializedValue);
    } catch (error) {
      console.log(
        `Could not retrieve '${key}' from Local Sorage. Error:`,
        error,
      );
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(`Could not remove '${key}' from Local Sorage. Error:`, error);
    }
  },
};
// Retreive Video Player Current Time from Local storage
const videoplayerCurrentTime = localStorageManager.get(
  'videoplayer-current-time',
);

/**
  |============================
  | Vimeo-Player Event Listener
  |============================
*/
// Save current time
player.on(
  'timeupdate',
  throttle(data => {
    localStorageManager.set('videoplayer-current-time', data.seconds);
  }, 1000),
);

// Set current time retrieved from Local Storage
if (videoplayerCurrentTime) {
  player
    .setCurrentTime(localStorageManager.get('videoplayer-current-time'))
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log(
            'The time was less than 0 or greater than the video’s duration',
          );
          break;

        default:
          console.log('setCurrentTime error: ', error.name);
          break;
      }
    });
}
