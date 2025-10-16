# What's In Your Fridge?

![What's In Your Fridge Screenshot](./screenshots/frontpage.png)
![Recipe Modal Screenshot](./screenshots/results.png)

## Summary

"What's In Your Fridge?" is a web application that helps users reduce food waste by suggesting recipes based on ingredients they currently have available. Users can input their available ingredients and receive recipe suggestions powered by the Spoonacular API, complete with cooking instructions, ingredient lists, and nutritional information.

## Motivation

I built this project as a hands-on way to learn JavaScript, jQuery, and API integration by turning an issue I encounter from my daily life into a coding project.

## Requirements

This application requires a Spoonacular API key. The current implementation uses a demo key with limited requests. For production use, obtain your own API key from [Spoonacular](https://spoonacular.com/food-api).

## Tech Stack

- **Frontend**: HTML5, JavaScript, jQuery
- **Styling**: Bootstrap, CSS
- **API Integration**: Spoonacular Recipe API

## Features

- **Ingredient Input**: Enter multiple ingredients separated by commas
- **Recipe Search**: Instant recipe suggestions based on available ingredients
- **Detailed Recipe Information**: Click any recipe to view:
  - Complete ingredient lists
  - Step-by-step cooking instructions
  - Recipe summaries and descriptions
- **Responsive Design**: Optimized for both desktop and mobile devices
- **API Integration**: Integration with Spoonacular's recipe database

## Quick Start

Clone the repository:

```
git clone https://github.com/izcheung/whatsInYourFridge.git
cd whatsInYourFridge
```

Right-click `index.html` → Click “Open with Live Server”

## Acknowledgments

Powered by the Spoonacular API for recipe and ingredient data.
