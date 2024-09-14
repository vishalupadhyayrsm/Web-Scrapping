# Web Scraping with Puppeteer.js: A Guide

This guide demonstrates how to perform basic web scraping using Puppeteer.js to extract information from a website, specifically Scopus. We'll focus on retrieving basic details about a searched topic.

**Prerequisites:**

- Node.js and npm (or yarn) installed on your system. You can download Node.js from the official website: https://nodejs.org/

## Project Setup:

### Create a project directory:

### Install `node.js`

Before we begin, ensure you have Node.js installed on your system. You can verify it using:

```bash
   node -v
```

If you don't have Node.js, install it by running:

`Using npm`

```bash
  npm install node.js
```

`Using yarn`

```bash
yarn install node.js
```

### Create a project directory

Create a folder for your project and navigate into it:

```bash
mkdir scopus-scraper
cd scopus-scraper

```

### Initialize the project

To set up a `package.json` file for your project, run:

```bash
 npm init -y
```

This will automatically generate a package.json file with default settings.

### Install Puppeteer

Puppeteer is the key package we will use to control a browser instance and perform web scraping. Install it using:

```bash
npm install puppeteer
```

### Create the Web Scraping Script

Inside your project folder, create a file named `index.js`. This will contain our web scraping logic. You can create the file using:

```bash
touch index.js
```

Open the file and add your scraping code.

### Run the Web Scraping Script

To execute the web scraping script, navigate to your project directory in the terminal and run the following command:

```bash
node index.js
```

### Understanding `package.json` File

When you run npm init -y, a package.json file is created. Here's an example of how it should look after setting up Puppeteer:

```bash
{
  "name": "scopus-web-scraping",
  "version": "1.0.0",
  "description": "A simple web scraping script for Scopus using Puppeteer",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "puppeteer": "^20.0.0"
  },
  "author": "Vishal Kumar Upadhyay",
  "license": "ISC"
}

```

### Explanation

- `"start": "node index.js"` allows you to run the script using npm start.
- `puppeteer` is listed as a dependency.

### Clone this project

You can clone this project using the following command:

```bash
git clone git@github.com:vishalupadhyayrsm/Web-Scrapping.git
```

### Author

Vishal Kumar Upadhyay

### Useful Commands

- Initialize Project: `npm init -y`
- Install Puppeteer: `npm install puppeteer`
- Run Script: `node index.js`

### Enhancements:

1. **Command Blocks**: Bash commands are highlighted for better readability.
2. **JSON Code**: Displayed in a block for easy understanding of the `package.json`.
3. **Clone Section**: Added better formatting for the `git clone` command and simplified structure.
4. **Headings**: Organized sections to make them more logical and easier to foll.
