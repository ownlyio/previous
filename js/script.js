let loading_interval;

$(window).on("load", function() {
    $("#loading-ownly-container").removeClass("d-flex");
    $("#loading-ownly-container").addClass("d-none");

    clearInterval(loading_interval);

    $(".artist-description").each(function() {
        let height = parseFloat($(this).css("height"));
        $(this).css("bottom", "-" + height + "px")
    });

    $(".team-description").each(function() {
        let height = parseFloat($(this).css("height"));
        $(this).css("bottom", "-" + height + "px")
    });
});

$(document).ready(function() {
    loading_interval = setInterval(function() {
        if($("#loading-ownly").css('width') === "200px") {
            $("#loading-ownly").css('width', '300px');
        } else {
            $("#loading-ownly").css('width', '200px');
        }
    }, 1100);
});

$(document).on("mouseover", ".artist-card", function() {
    if($(window).width() >= 768) {
        $(this).find(".artist-description").css("bottom", "0");
    }
});

$(document).on("mouseout", ".artist-card", function() {
    if($(window).width() >= 768) {
        let height = parseFloat($(this).find(".artist-description").css("height"));
        $(this).find(".artist-description").css("bottom", "-" + height + "px");
    }
});

$(document).on("click", ".show-artist-description", function() {
    $(this).closest(".artist-card").find(".artist-description").css("bottom", "0");
});

$(document).on("click", ".hide-artist-description", function() {
    let height = parseFloat($(this).closest(".artist-card").find(".artist-description").css("height"));
    $(this).closest(".artist-card").find(".artist-description").css("bottom", "-" + height + "px");
});

$(document).on("mouseover", ".team-card", function() {
    if($(window).width() >= 768) {
        $(this).find(".team-description").css("bottom", "0");
    }
});

$(document).on("mouseout", ".team-card", function() {
    let height = parseFloat($(this).find(".team-description").css("height"));
    $(this).find(".team-description").css("bottom", "-" + height + "px");
});

$(document).on("click", ".show-team-description", function() {
    $(this).closest(".col-lg-4").find(".team-description").css("bottom", "0");
});

$(document).on("click", ".hide-team-description", function() {
    let height = parseFloat($(this).closest(".team-card").find(".team-description").css("height"));
    $(this).closest(".team-card").find(".team-description").css("bottom", "-" + height + "px");
});

$(document).on('click', "a", function(event) {
    if (this.hash !== "") {
        event.preventDefault();
        let hash = this.hash;

        console.log($(hash).offset().top);

        $('html').animate({
            scrollTop: $(hash).offset().top - parseFloat($("header").css("height"))
        }, 200, function(){
            window.location.hash = hash;
        });

        $('html').animate({
            scrollTop: $(hash).offset().top - parseFloat($("header").css("height"))
        }, 200, function(){
            window.location.hash = hash;
        });
    }
});