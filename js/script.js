let loading_interval;
let newsletter_form;

let initiate_loading_page = () => {
    loading_interval = setInterval(function() {
        if($("#loading-ownly").css('opacity') === "1") {
            $("#loading-ownly").css('opacity', '0.3');
        } else {
            $("#loading-ownly").css('opacity', '1');
        }
    }, 1100);

    let all = document.getElementsByTagName("*");
    for (let i=0, max=all.length; i < max; i++)
    {
        loading_set_ele(all[i]);
    }
};
let close_loading_page = () => {
    $("#loading-ownly-container").removeClass("d-flex");
    $("#loading-ownly-container").addClass("d-none");

    clearInterval(loading_interval);
};
let adjust_artist_descriptions = () => {
    $(".artist-description").each(function() {
        let height = parseFloat($(this).css("height")) * -1;
        $(this).css("bottom", height + "px")
    });

    $(".team-description").each(function() {
        let height = parseFloat($(this).css("height")) * -1;
        $(this).css("bottom", height + "px")
    });
};
let loading_check_element = (ele) => {
    let all = document.getElementsByTagName("*");
    let per_inc=100/all.length;

    if($(ele).on())
    {
        let prog_width=per_inc+Number(document.getElementById("progress_width").value);
        document.getElementById("progress_width").value=prog_width;
        $("#loading-page-progress-bar").css("width", prog_width + "%")
    } else {
        loading_set_ele(ele);
    }
}
let loading_set_ele = (set_element) => {
    loading_check_element(set_element);
}

let pad_zeroes = (number) => {
    number = number.toString();

    while(number.length < 2) {
        number = "0" + number;
    }

    return number;
};

let start_countdown = () => {
    let countDownDate = new Date("Jul 27, 2021 17:00:00").getTime();

    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;

        let days = pad_zeroes(Math.floor(distance / (1000 * 60 * 60 * 24)));
        let hours = pad_zeroes(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        let minutes = pad_zeroes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        let seconds = pad_zeroes(Math.floor((distance % (1000 * 60)) / 1000));

        $("#days").text(days);
        $("#hours").text(hours);
        $("#minutes").text(minutes);
        $("#seconds").text(seconds);

        $("#days").removeClass("invisible");
        $("#hours").removeClass("invisible");
        $("#minutes").removeClass("invisible");
        $("#seconds").removeClass("invisible");

        if (distance < 0) {
            clearInterval(x);
            $("#days").text("00");
            $("#hours").text("00");
            $("#minutes").text("00");
            $("#seconds").text("00");
        }
    }, 1000);
};

$(window).on("load", function() {
    close_loading_page();
    // adjust_artist_descriptions();
});

$(window).on("scroll", function() {
    let elementTarget = $("#own-countdown-container")[0];

    if(window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight)) {
        $("#header").removeClass("d-none");
    } else {
        $("#header").addClass("d-none");
    }
});

$(document).ready(function() {
    initiate_loading_page();
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
    $(this).closest(".team-row-item").find(".team-description").css("bottom", "0");
});

$(document).on("click", ".hide-team-description", function() {
    let height = parseFloat($(this).closest(".team-card").find(".team-description").css("height"));
    $(this).closest(".team-card").find(".team-description").css("bottom", "-" + height + "px");
});

// $(document).on('click', "a", function(event) {
//     if(this.hash !== "") {
//         event.preventDefault();
//         let hash = this.hash;

//         $('html').animate({
//             scrollTop: $(hash).offset().top - parseFloat($("header").css("height"))
//         }, 200, function(){
//             window.location.hash = hash;
//         });

//         $('html').animate({
//             scrollTop: $(hash).offset().top - parseFloat($("header").css("height"))
//         }, 200, function(){
//             window.location.hash = hash;
//         });
//     }
// });

$(document).on("submit", ".newsletter-form", async (event) => {
    event.preventDefault();

    newsletter_form = $(this);
    newsletter_form.find("[type='submit']").prop("disabled", true);

    let data = new FormData(event.target);
    fetch(event.target.action, {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        newsletter_form.find("input").val("");

        $("#newsletter-form [type='submit']").prop("disabled", false);

        $("#modal-subscribe-success").modal("show");
    }).catch(error => {
        console.log('Oops! There was a problem submitting your form');
    });
});

$(document).on('click', "#show-mobile-nav", function() {
    $("#mobile-nav").css("top", 0);
});

$(document).on('click', "#hide-mobile-nav", function() {
    $("#mobile-nav").css("top", "-104px");
});

$(document).scroll("body", function() {
    if($(window).width() >= 768) {
        $("#header").removeClass("scrolled");
        $("#mobile-scroll-up").addClass("d-none");
    } else {
        if($(window).scrollTop()) {
            $("#header").addClass("scrolled");
        } else {
            $("#header").removeClass("scrolled");
        }

        if($(window).scrollTop() >= $(window).height()) {
            $("#mobile-scroll-up").removeClass("d-none");
        } else {
            $("#mobile-scroll-up").addClass("d-none");
        }
    }
});