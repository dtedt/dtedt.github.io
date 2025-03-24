
I'd planned on my first web development project being a completely from-scratch website, but instead I spent the evening getting to know [Jekyll](https://jekyllrb.com/), the simple static site generator perfect for hosting on [Github Pages](https://pages.github.com/). 

I messed around with Jekyll a bit last year, but since then I've become a little more educated on web development (I've been watching a lot of [Traversy Media](https://www.youtube.com/traversymedia) videos on the recommendation of several local devs). This time setting up a Jekyll site was far less intimiating, since I have a basic understanding of how websites are hosted and the underlying relationship between HTML, CSS & Javascript. That being said, I still ran into some difficulties and thought I might relay them here in case it is useful to anyone out there.

### Jekyll & Github Pages

I host this website on Github because I am in the process of learning how to use Github, and because it's free. 

[Setting up a Github Pages site with Jekyll \ Github.com](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)

Jekyll is an open-source tool that makes it easy to build and serve a static website, and it happens to have built-in support for Github Pages. It also has numerous themes to choose from. My theme is [Lanyon](https://lanyon.getpoole.com/), which is based on [Poole](https://github.com/poole/poole).

---

Once I had duplicated all of the necessary folders to my github repo for dtedt.com, I managed to get the HTML to load, but not the CSS. It looked something like this:

![No CSS :(](/images/noCSS.png)

Luckily, it wasn't long until I found an extremely helpful article over at MakingMistakes.com

[Jekyll’s site.url and baseurl \ MakingMistakes.com](https://mademistakes.com/mastering-jekyll/site-url-baseurl/#absolute_url-filter)

Sure enough, I tried Inspecting the page and, sure enough, I was having problems with my links. However, omitting the `baseurl` section of `_config.yml` was not the solution-- my site was still sans-CSS! I started digging into the HTML files to see where I was going wrong. I also checked the console for errors, which is always a good step in web dev troubleshooting

![Always check the console...](/images/console1.png)

As it turns out, Jekyll relies on a templating language called [Liquid](https://shopify.github.io/liquid/?shpxid=88067a60-4D7E-432A-9F92-6B6E2E784719). What's cool about Liquid is, it enables HTML files to refer to one another and build a single page out of multiple HTML files. That explains why the Jekyll themes have so many HTML files like `head.html` or `sidebar.html` rather than everything residing on `index.html`. It "includes" other HTML files (from the `_Includes` folder) like this:
```

{% include head.html %}

```
The above line in an html file will "include" the content of head.html at that point in the document. **NOTE: It seems that Jekyll does not run the most recent version of Liquid; If you're using the latest Liquid, `includes` is deprecated. `render` is now the preferred tag.**

Similarly, Jekyll's version of Liquid uses variables and filters to refer to certain key datapoints such as the site url. In my case, the offending stylesheet references were using Liquid to sub in my URL:

```
 <link rel="stylesheet" href="{{ '/public/css/poole.css' | absolute_url }}">
  <link rel="stylesheet" href="{{ '/public/css/syntax.css' | absolute_url }}">
  <link rel="stylesheet" href="{{ '/public/css/lanyon.css' | absolute_url }}">
```

I thought that making my `url: dtedt.github.io` would be appropriate, since that is where all of this is hosted, but it seems that was somehow redirecting to an unsecured http://dtedt.com and halting the stylesheet references, which explains why my site was blank. Once I changed the url to my custom domain name, https://dtedt.com, everything worked!

Long story longer, I'm now online and I will be posting here in order to document my journey. I intend to become at least conversant in web design and front-end engineering principles by 2026. I still have much more to learn, and my focus right now is on vanilla Javascript and CSS frameworkd (either Bootstrap or Tailwind). I'm glad that I took the time to learn how to deploy Jekyll, as troubleshooting and examining it's documentation has taught me a lot.

---
I'm very new to all of this, so feel free to email me if anything in this post is inaccurate, I would love to hear from you. Hopefully if you're reading this my blog post was helpful to you!

P.S. If you ever need to escape quote Liquid within a Jekyll page, you can do it like so:

```
{% raw %}
{% liquid here %}
{% endraw %}
```

