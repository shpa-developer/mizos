const { withAndroidManifest } = require('expo/config-plugins');

// `orientation: "portrait"` sets android:screenOrientation on MainActivity, which makes
// Google Play imply android.hardware.screen.portrait as a *required* hardware feature and
// hide the app from devices that don't report it (desktop, XR, some tablets). Declaring it
// explicitly optional keeps the portrait lock without restricting availability.
const FEATURES = ['android.hardware.screen.portrait'];

module.exports = function withPortraitNotRequired(config) {
  return withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;
    const existing = manifest['uses-feature'] || [];

    for (const name of FEATURES) {
      const entry = existing.find((f) => f.$ && f.$['android:name'] === name);
      if (entry) {
        entry.$['android:required'] = 'false';
      } else {
        existing.push({ $: { 'android:name': name, 'android:required': 'false' } });
      }
    }

    manifest['uses-feature'] = existing;
    return cfg;
  });
};
