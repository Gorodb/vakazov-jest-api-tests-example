require("allure-jest");

const {PetRequests} = require("../api/requests/petRequsts");

describe("Pets apit tests", () => {
  let pet;
  let petFromApi;

  test("Should be possible to create new pet", async () => {
    let response;
    await allure.step("Create new pet", async () => {
      pet = PetRequests.generatePetObject();
      response = await PetRequests.createNewPet(pet);
      petFromApi = response.data;
    });

    await allure.step("Check status", async () => {
      await expect(response.status).toEqual(200);
    });
    await allure.step("Check response", async () => {
      await expect(pet).toBeEqualToObject(response.data);
    });
  });

  test("Should be possible to get previously created pet", async () => {
    let response;
    await allure.step("Create new pet", async () => {
      response = await PetRequests.getPetById(petFromApi.id);
    });

    await allure.step("Check status", async () => {
      await expect(response.status).toEqual(200);
    });
    await allure.step("Check response", async () => {
      await expect(pet).toBeEqualToObject(response.data);
    });
  })
});
