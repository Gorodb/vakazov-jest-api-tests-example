const {existsSync, unlinkSync} = require("fs");
const {pack} = require("7zip-min");
const requests = require("./api/requests/allureRequests");


const archiveAllureBy7Zip = async (folder) => {
  const fileName = `${folder}.zip`;
  const projectDescription = process.env.PROJECT_DESC || "pets store service";
  const project = process.env.PROJECT_NAME || "pets-store";

  await requests.createProject(project, "rest-api", projectDescription);

  // @ts-ignore
  await pack(folder, fileName, async (err) => {
    if (err) {
      console.error(err);
    }
    await requests.allureSend(project, fileName, "allure-results.7z");
    if (existsSync(fileName)) {
      unlinkSync(fileName);
    }
  });
};

(async () => {
  await console.log(`Sending reports to the remote hub`);
  await archiveAllureBy7Zip("./allure-results");
  await console.log(`Reports hub: http://45.9.188.130:5015/en`);
  await console.log(`Reports are generated and available by url: http://45.9.188.130:5015/web/allure/${process.env.PROJECT_NAME}/`);
})();
