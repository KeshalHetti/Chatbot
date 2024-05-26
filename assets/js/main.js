jQuery(function ($) {
    "use strict";

    var footerHeight = $(".main-wrapper").height();
    $(".main-wrapper").css('margin-bottom', footerHeight + 'px');

    /*------------------------------------
        SCROLL NAV BACKGROUND ACTIVE
    ------------------------------------*/

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 70) {
            $('.site-navigation').addClass('header-white');
        } else {
            $('.site-navigation').removeClass('header-white');
        }
    });

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 70) {
            $(' .top-nav').addClass('header-white-top');
        } else {
            $(' .top-nav').removeClass('header-white-top');
        }
    });

    $(".gallery-item").owlCarousel({
        items: 4,
        margin: 10,
        loop: true,
        autoplay: false,
        nav: false,
        dots: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        mouseDrag: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 4,
            }
        }
    });

    // Collapse navbar on click

    $(document).on('click.nav', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).removeClass('in').addClass('collapse');
        }
    });

    jQuery(document).on('ready', function () {
        /* Closes the Responsive Menu on Menu Item Click*/
        $('.navbar-collapse ul li a').on('click', function () {
            $('.navbar-toggler:visible').click();
        });
    });


    //    Main slider

    $('.carousel').carousel({
        interval: 4000
    })

    /*---------------------------
        VIdeo PLAY
    -----------------------------*/
    $('.videobox').venobox(); 

    /*---------------------------
        MENU SMOOTH SCROLL
      -----------------------------*/
    // scrollIt
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'easing', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -40 // offste (in px) for fixed top navigation
    });


    /* Testimonial Box Carousel */


});



document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function loadChatLog() {
    const chatLog = JSON.parse(sessionStorage.getItem('chatLog')) || [];
    chatLog.forEach(({ message, sender }) => appendMessage(message, sender));
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    // Simulating bot response
    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        appendMessage(botResponse, 'bot');
    }, 1000);
}

function appendMessage(message, sender) {
    const messageElem = document.createElement('div');
    messageElem.classList.add('message');
    messageElem.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElem.textContent = message;

    const chatBox = document.getElementById('chat-box');
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Store the message in session storage
    const chatLog = JSON.parse(sessionStorage.getItem('chatLog')) || [];
    chatLog.push({ message, sender });
    sessionStorage.setItem('chatLog', JSON.stringify(chatLog));
}

function getBotResponse(userInput) {
    // Here you would call your chatbot API with the user input and return the response
    // For now, we'll just echo the user's input for demonstration purposes
    return "I'm just a demo bot. You said: " + userInput;
}

// Load chat log when the page loads
window.onload = loadChatLog;
