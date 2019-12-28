---
title: Setting Up Node API with Typescript
author: Ezekiel Ekunola
date: 2019-08-13
hero: ./images/preview.png
excerpt: I'll be taking us through the steps of setting up a basic Node API with typescript.
---

I'll be taking us through the steps of setting up a basic Node API with typescript.

**Note: You should have [Nodejs](https://nodejs.org/en/) installed on your machine.**


First thing is to create our project folder and initialize it with npm to generate the `package.json` file.
```
npm init -y
```

Install dependencies
```
npm i express --save
npm i @types/node @types/express ts-node typescript nodemon --save-dev
```



Create a `tsconfig.json` file in the root of your application or run `npx tsc --init` on your terminal and add the configuration below.

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "allowJs": true,
    "outDir": "./build",
    "rootDir": "./src",
    "esModuleInterop": true
  }
}

```
**Note: More options can be added to the `tsconfig.json` file.
Find out more [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html).**


Add scripts to package.json file.

```json
"scripts": {
  "dev": "nodemon src/app.ts",
  "start": "tsc && node build/app"
  }
```

Create a `src` directory where our application would be built. Inside the `src` directory, create an `app.ts` file.

Inside the `app.ts` file, add the code below.

```js
import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): object => {
    return res.json({ status: "success", message: "Welcome to API Service" });
  }
);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Route Not found");
  next(error);
});

app.use((error: { message: string; status: number }, req: Request, res: Response,next: NextFunction
  ) => {
    res.status(error.status || 500);
    res.json({
      status: "error",
      message: error.message
    });
    next();
  }
);

const PORT: any = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

```

At this point, your project structure should look like the image below.

![Project Structure](https://thepracticaldev.s3.amazonaws.com/i/2lfl5rlcjrjksx9d3ba3.png)

### Development 👨🏾‍💻
To run the application on the development environment, run the command below 
```
npm run dev
```

> Note: The above command compiles the files found in the src directory in memory.

### Production 🚀
To run the application on the production environment, run the command below
```
npm start
```

** Note: The above command compiles the files found in the `src` directory to a `build` directory and runs the app.js file in the `build` directory, as specified above in the `start script` in our `package.json` file.**

The project used in this article can be found [here](https://github.com/Easybuoy/node-api-typescript).


If you have any questions or feedback, please feel free to reach out on [Twitter](https://twitter.com/easybuoy).

Thanks for reading.