const randomNames =  require("random-name");

const {DataHelper} =  require("../../helpers/dataHelper");
const PetsApiService =  require("../axiosInstances/petsStoreAxiosInstance");
const ApiService =  require("../apiService");

const petsApiService = new ApiService(PetsApiService);
const statuses = ["available", "pending", "sold"]

exports.PetRequests = class PetRequests {
  static async createNewPet(pet) {
    return await petsApiService.postRequest("pet", pet)
  }

  static async getPetById(id) {
    return await petsApiService.getRequest(`pet/${id}`)
  }

  static generateRandomTags() {
    // get random count of tages
    const randomInt = DataHelper.getRandomInt(1, 10);
    // generate array of randomInt and update its values
    return [...Array(randomInt)].map((value, index) => ({
      id: index + 1,
      name: randomNames.first(),
    }));
  }

  // generates pet's object with random values
  static generatePetObject() {
    return  {
      "category": {
        "id": DataHelper.getRandomInt(1, 10),
        "name": "Dogs"
      },
      "name": randomNames.first(),
      "photoUrls": [
        "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg",
        "https://www.zooplus.fr/magazine/wp-content/uploads/2018/11/border-collie-1536x1017.jpeg"
      ],
      "tags": this.generateRandomTags(),
      "status": statuses[DataHelper.getRandomInt(0, 2)]
    }
  }
}
