---
title: Deploying React App from Github to Netlify
tags: [react, javascript]
date: 2019-07-04T05:25:44.226Z
path: blog/deploying-react-app-from-github-to-netlify
cover: ./preview.png
excerpt: Learn about deploying react app to netlify.
---

I will be doing a walk-through process of deploying a React app from Github to Netlify.


If you have a project structure where the react app is **NOT** nested in a sub-directory like in the example shown below
 
![](https://thepracticaldev.s3.amazonaws.com/i/k6m7qw5aru5yrr4hov8f.png)

You can use the following steps to deploy:
- Push your code to Github
- Connect Github account to your Netlify account
- Select the project to deploy
- Deploy project


![](https://thepracticaldev.s3.amazonaws.com/i/ir0dx8e157r8y3kaj7a6.gif)


In cases where the react app is in a nested directory like the example shown below

![](https://thepracticaldev.s3.amazonaws.com/i/9th5maami9dct1ttqhw7.gif)


 Add a **`netlify.toml`** file to the root of your project, and add the configuration below to the file.

   

    [build]
      command = "npm run build"
      publish="path-to-react-app/build"
      base = "path-to-react-app"




## React Router

If you've made use of react-router in your project, on redirecting and reloading to a new route, you may run into issue where Netlify would throw an error ("page not found") as shown in the example beloww

![](https://thepracticaldev.s3.amazonaws.com/i/s1d1njph3hvj1q5o72zk.gif)
 

You can add the following code to your `netlify.toml` file.

    [[redirects]]
      from = "/*"
      to = "/index.html"
      status = 200
Once added, push the changes to Github. Netlify should automatically deploy the changes, if not, deploy the changes manually. Once deployed, your application should not throw errors, as shown below.

![](https://thepracticaldev.s3.amazonaws.com/i/zpi9ay3vqwe9kqk7gxtz.gif)


**Note:** *`netlify.toml` is a configuration file where you can specify how Netlify should build/run your application. A lot can be accomplished with the `netlify.toml` file. Find out more about the `netlify.toml` file [here.](https://www.netlify.com/docs/netlify-toml-reference/)*


## Environment Variables
If you've made use of environment variables in your project, you can also add them to Netlify by following the steps shown in the image below

![](https://thepracticaldev.s3.amazonaws.com/i/wwt70a8li0bekdy9xg82.gif)


## Conclusion
From the foregoing, we have seen and been able to demonstrate that hosting a react application through Github on Netlify is pretty simple and seamless, hence can be done in little or no time.


If you have any questions or feedback about this article, feel free to reach out.
Thanks for reading.