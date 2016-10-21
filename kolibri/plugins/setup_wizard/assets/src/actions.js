const Kolibri = require('kolibri');

const DeviceOwnerResource = Kolibri.resources.DeviceOwnerResource;
const FacilityResource = Kolibri.resources.FacilityResource;
const coreActions = require('kolibri/coreVue/vuex/actions');

function createDeviceOwnerAndFacility(store, deviceownerpayload, facilitypayload) {
  const DeviceOwnerModel = DeviceOwnerResource.createModel(deviceownerpayload);
  const deviceOwnerPromise = DeviceOwnerModel.save();
  const FacilityModel = FacilityResource.createModel(facilitypayload);
  const facilityPromise = FacilityModel.save();
  const promises = [deviceOwnerPromise, facilityPromise];
  Promise.all(promises).then(
    responses => {
      // redirect to learn page after successfully created the DeviceOwner and Facility.
      window.location = Kolibri.urls['kolibri:learnplugin:learn']();
    },
    error => { coreActions.handleApiError(store, error); }
  );
}


module.exports = {
  createDeviceOwnerAndFacility,
};
