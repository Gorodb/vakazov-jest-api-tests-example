FROM mcr.microsoft.com/playwright:v1.44.1-focal

# Set the work directory for the application
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# COPY the needed files to the app folder in Docker image
COPY api/ /app/api/
COPY helpers/ /app/helpers/
COPY tests/ /app/tests/
COPY package.json /app/
COPY package-lock.json /app/
COPY .env /app/
COPY archiver.js /app/
COPY customMatchers.js /app/
COPY jest.config.js /app/
COPY setup.js /app/

# Get the needed libraries to run Playwright
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Install the dependencies in Node environment
RUN npm install
