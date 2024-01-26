# Project Name

Weather Forecast & Traffic Cam Website

## Table of Contents

- [Running the web application locally](#local)
- [Running the web application development](#development)
- [How to use the web application](#howtouse)
- [Assumptions](#assumptions)
- [Potential Enhancements](#potential-enhancements)

## local

git clone <https://github.com/weijie1992/WeatherForecastAndTrafficCam.git>
cd WeatherForecastAndTrafficCam
docker-compose up

## development

git clone <https://github.com/weijie1992/WeatherForecastAndTrafficCam.git>
cd WeatherForecastAndTrafficCam
cd backend
npm i
npm run dev
cd ../frontend
npm i
npm run dev

## HowToUse

Select a date and time, then click the search button. The date and time must not be later than the current date and time. After clicking the search button, choose a location; the screenshot and 2-hour weather information should be displayed.

## Assumptions

1) Search only allows past dates, as the weather forecast API only returns the current datetime. Any query beyond the current datetime will be treated as the current datetime.
2) Add a button for search instead of onChange for both date and time text components.
3) API responses from trafficImage and weatherForecast have differences in Latitude and Longitude. Currently, get all locations within 2 decimal places. This also means that many mismatched locations are not displayed.

## Potential Enhancements

1) Improve UI for reactivity on mobile devices (consider breakpoints).
2) Implement unit testing for the frontend with more coverage on the backend.
3) Explore potential end-to-end testing from frontend to backend using tools like Playwright or Cypress.
4) Investigate external APIs that better match latitude and longitude for both APIs to display a larger matched list.
