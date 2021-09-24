function stripHTMLTags(content) {
    return content.replace(/(<([^>]+)>)/ig, "");
}

function shortenText(text, startingPoint, maxLength) {
    return text.length > maxLength ? text.slice(startingPoint, maxLength) : text;
}

// featured post
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/ownlyio/tagged/updates')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    var featured_post = data.items[0]

    var featured_post_description = stripHTMLTags(featured_post.description);
    var feat_output = `<div class="col-md-6">`
    feat_output += `    <a href="${featured_post.guid}" target="_blank">`
    feat_output += `        <div class="w-100 background-image-cover mb-3 mb-md-0" style="padding-top:54%; background-image:url('${featured_post.thumbnail}')"></div>`
    feat_output += `    </a>`
    feat_output += `</div>\n`
        
    feat_output += `<div class="col-md-6">`
    feat_output += `    <div class="mb-3">`
    feat_output += `        <a class="neo-bold text-color-6 font-size-200 font-size-lg-220 text-decoration-none link-blog" href="${featured_post.guid}" target="_blank">${featured_post.title}</a>`
    feat_output += `    </div>`
    feat_output += `    <div class="text-color-7 font-size-110 font-size-lg-120 mb-3">${shortenText(featured_post_description, 1, 200) + "..."}</div>`
    feat_output += `    <div class="text-color-8 font-size-110 font-size-lg-120 mb-4">${featured_post.author}</div>`
    feat_output += `</div>`

    document.querySelector('#featured-post').innerHTML = feat_output;
});

// other posts
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/ownlyio')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    // check if on the first 6 blogs, the featured post is included
    var featuredPostIncluded = data.items.findIndex(x => x.title.includes('August 2021'))
    var posts = featuredPostIncluded != -1 ? 
        data.items.slice(0, 8).filter(x => !x.title.includes('August 2021') && !x.title.includes('Ownly Marketplace Beta Version Features')) : // return 8 blogs less the featured post and beta features blog (total of 6)
        data.items.slice(0, 7).filter(x => !x.title.includes('Ownly Marketplace Beta Version Features')) // return just 7 blogs less beta features blog (total of 6)

    var output = ''
    posts.forEach(function (post) {
        var textOnlyDescription = stripHTMLTags(post.description)
        output += `<div class="col-md-4 pb-3 pb-md-0">`
        output += `    <a href="${post.guid}" target="_blank">`
        output += `        <div class="w-100 background-image-cover mb-3" style="padding-top:54%; background-image:url('${post.thumbnail}"></div>`
        output += `    </a>`
            
        output += `    <div class="mb-3">`
        output += `        <a class="neo-bold text-color-6 font-size-140 font-size-lg-170 text-decoration-none link-blog" href="${post.guid}" target="_blank">${post.title}</a>`
        output += `    </div>`
        output += `    <div class="text-color-7 font-size-100 font-size-lg-120 mb-3">${shortenText(textOnlyDescription, 1, 150) + '...'}</div>`
        output += `    <div class="text-color-8 font-size-100 font-size-lg-120 mb-4">${post.author}</div>`
        output += `</div>`
    });

    document.querySelector('#other-posts').innerHTML = output;
});