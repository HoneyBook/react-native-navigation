
const Utils = require('./Utils');
const TestIDs = require('../playground/src/testIDs');

const { elementById } = Utils;

describe(':ios: orientation', () => {

  beforeEach(async () => {
    await device.relaunchApp();
    waitForDeviceToSettleAfterOrientationChangeAndroid = ms => new Promise(res => setTimeout(res, device.getPlatform() === 'ios' ? 0 : 400));
    await elementById(TestIDs.NAVIGATION_TAB).tap();
    await elementById(TestIDs.SHOW_ORIENTATION_SCREEN).tap();
  });

  it('default allows all', async () => {
    await elementById(TestIDs.DEFAULT_ORIENTATION_BTN).tap();
    waitForDeviceToSettleAfterOrientationChangeAndroid();
    await expect(elementById(TestIDs.PORTRAIT_ELEMENT)).toBeVisible();
    await device.setOrientation('landscape');
    waitForDeviceToSettleAfterOrientationChangeAndroid();
    await expect(elementById(TestIDs.LANDSCAPE_ELEMENT)).toBeVisible();
    await device.setOrientation('portrait');
    waitForDeviceToSettleAfterOrientationChangeAndroid();
    await expect(elementById(TestIDs.PORTRAIT_ELEMENT)).toBeVisible();
    await elementById(TestIDs.DISMISS_BTN).tap();
  });

  it('landscape and portrait array', async () => {
    await elementById(TestIDs.LANDSCAPE_PORTRAIT_ORIENTATION_BTN).tap();
    await expect(element(by.id(TestIDs.PORTRAIT_ELEMENT))).toBeVisible();
    await device.setOrientation('landscape');
    waitForDeviceToSettleAfterOrientationChangeAndroid();
    await expect(element(by.id(TestIDs.LANDSCAPE_ELEMENT))).toBeVisible();
    await device.setOrientation('portrait');
    waitForDeviceToSettleAfterOrientationChangeAndroid();
    await expect(element(by.id(TestIDs.PORTRAIT_ELEMENT))).toBeVisible();
    await elementById(TestIDs.DISMISS_BTN).tap();
  });

  it(':ios: portrait only', async () => {
    await elementById(TestIDs.PORTRAIT_ORIENTATION_BTN).tap();
    await expect(elementById(TestIDs.PORTRAIT_ELEMENT)).toBeVisible();
    await device.setOrientation('landscape');
    await expect(elementById(TestIDs.PORTRAIT_ELEMENT)).toBeVisible();
    await device.setOrientation('portrait');
    await expect(elementById(TestIDs.PORTRAIT_ELEMENT)).toBeVisible();
    await elementById(TestIDs.DISMISS_BTN).tap();
  });

  it(':ios: landscape only', async () => {
    await elementById(TestIDs.LANDSCAPE_ORIENTATION_BTN).tap();
    await device.setOrientation('landscape');
    await expect(element(by.id(TestIDs.LANDSCAPE_ELEMENT))).toBeVisible();
    await device.setOrientation('portrait');
    await expect(element(by.id(TestIDs.LANDSCAPE_ELEMENT))).toBeVisible();
    await elementById(TestIDs.DISMISS_BTN).tap();
  });
});
