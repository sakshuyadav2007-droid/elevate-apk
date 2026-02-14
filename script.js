// DATABASE: 100+ Mixed Length Quotes (Short, Medium, Long)
const quotes = [
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    "Your time is limited, so don't waste it living someone else's life.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "It is better to fail in originality than to succeed in imitation.",
    "The man who moves a mountain begins by carrying away small stones.",
    "Do not wait to strike till the iron is hot; but make it hot by striking.",
    "Great things are done by a series of small things brought together.",
    "Opportunities don't happen, you create them.",
    "I am not what happened to me, I am what I choose to become.",
    "The best way to predict the future is to create it.",
    "Don't watch the clock; do what it does. Keep going.",
    "Hardships often prepare ordinary people for an extraordinary destiny.",
    "Believe you can and you're halfway there.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Everything you've ever wanted is on the other side of fear.",
    "Dream big and dare to fail.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "If you want to lift yourself up, lift up someone else.",
    "You are never too old to set another goal or to dream a new dream.",
    "Act as if what you do makes a difference. It does.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don't be afraid to give up the good to go for the great.",
    "I find that the harder I work, the more luck I seem to have.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "The ones who are crazy enough to think they can change the world, are the ones who do.",
    "Do one thing every day that scares you.",
    "Whatever you are, be a good one.",
    "Pain is temporary. Quitting lasts forever.",
    "The distance between your dreams and reality is called action.",
    "Discipline is doing what needs to be done, even if you don't want to do it.",
    "A river cuts through rock, not because of its power, but because of its persistence.",
    "Don't tell people your plans. Show them your results.",
    "To be a top 1% man, you must be willing to do what the 99% won't do.",
    "A smooth sea never made a skilled sailor.",
    "If it doesn't challenge you, it doesn't change you.",
    "Your life does not get better by chance, it gets better by change.",
    "We suffer more often in imagination than in reality.",
    "He who has a why to live can bear almost any how.",
    "Waste no more time arguing about what a good man should be. Be one.",
    "The happiness of your life depends upon the quality of your thoughts.",
    "Dwell on the beauty of life. Watch the stars, and see yourself running with them.",
    "You have power over your mind - not outside events. Realize this, and you will find strength.",
    "It is not death that a man should fear, but he should fear never beginning to live.",
    "Man conquers the world by conquering himself.",
    "The soul becomes dyed with the color of its thoughts.",
    "Self-control is strength. Right thought is mastery. Calmness is power.",
    "First say to yourself what you would be; and then do what you have to do.",
    "Luck is what happens when preparation meets opportunity.",
    "Silence is sometimes the best answer.",
    "Be the change that you wish to see in the world.",
    "An unexamined life is not worth living.",
    "Knowing yourself is the beginning of all wisdom.",
    "Education is the kindling of a flame, not the filling of a vessel.",
    "Quality is not an act, it is a habit.",
    "There is no great genius without some touch of madness.",
    "He who fears he will suffer, already suffers because he fears.",
    "Life is really simple, but we insist on making it complicated.",
    "A journey of a thousand miles begins with a single step.",
    "When you are content to be simply yourself and don't compare or compete, everybody will respect you.",
    "If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.",
    "Care about what other people think and you will always be their prisoner.",
    "Simplicity is the ultimate sophistication.",
    "The obstacle is the way.",
    "Ego is the enemy.",
    "Stillness is the key.",
    "Amor Fati - Love your fate.",
    "Memento Mori - Remember you will die.",
    "Iron sharpens iron.",
    "Stay hungry, stay foolish.",
    "Think different.",
    "Your time is your most valuable asset.",
    "Invest in yourself.",
    "Knowledge is power.",
    "Time waits for no one.",
    "Carpe Diem - Seize the day.",
    "Make it happen.",
    "No excuses.",
    "Just do it.",
    "Impossible is nothing.",
    "Be a warrior, not a worrier.",
    "Stars can't shine without darkness.",
    "Turn your wounds into wisdom.",
    "Be yourself; everyone else is already taken.",
    "Be kind, for everyone you meet is fighting a hard battle.",
    "This too shall pass.",
    "Change your thoughts and you change your world.",
    "Happiness depends upon ourselves.",
    "Nothing is impossible, the word itself says 'I'm possible'!",
    "It always seems impossible until it is done.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "You must do the things you think you cannot do.",
    "Start where you are. Use what you have. Do what you can."
];

// SIGMA COLOR PALETTE (Purple, Red, Neon, Dark)
const gradients = [
    "linear-gradient(135deg, #240b36 0%, #c31432 100%)", /* Deep Red/Purple */
    "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)", /* Royal Night */
    "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)", /* Neon Purple */
    "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", /* Matrix Green */
    "linear-gradient(135deg, #000000 0%, #434343 100%)", /* Pure Sigma Grey */
    "linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)", /* Neon Pop */
    "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)", /* Deep Blue */
    "linear-gradient(135deg, #D4145A 0%, #FBB03B 100%)"  /* Sunset Fire */
];

let currentQuoteText = "";
let lastColorIndex = -1;

// Elements
const quoteEl = document.getElementById('quote');
const heartBtn = document.getElementById('heartBtn');
const toast = document.getElementById('toast');
const favScreen = document.getElementById('favoritesScreen');
const favList = document.getElementById('favList');

// INIT
function init() {
    loadNewQuote();
    // Check local storage availability
    if(!localStorage.getItem('elevateFavs')) {
        localStorage.setItem('elevateFavs', JSON.stringify([]));
    }
}

// 1. GENERATE NEW QUOTE & COLOR
function loadNewQuote() {
    // Random Quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuoteText = quotes[randomIndex];
    
    // Animate Text
    quoteEl.style.animation = 'none';
    quoteEl.offsetHeight; /* Trigger reflow */
    quoteEl.style.animation = 'fadeInUp 0.6s forwards';
    quoteEl.textContent = currentQuoteText;

    // Random Color (Ensure it changes every time)
    let colorIndex;
    do {
        colorIndex = Math.floor(Math.random() * gradients.length);
    } while (colorIndex === lastColorIndex);
    
    lastColorIndex = colorIndex;
    document.body.style.background = gradients[colorIndex];

    updateHeartVisual();
}

// 2. CHECK IF LIKED
function updateHeartVisual() {
    const favorites = JSON.parse(localStorage.getItem('elevateFavs')) || [];
    const isLiked = favorites.includes(currentQuoteText);
    
    if (isLiked) {
        heartBtn.classList.add('liked');
        // Fill heart
        heartBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="#ff4757" stroke="#ff4757" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    } else {
        heartBtn.classList.remove('liked');
        // Empty heart
        heartBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    }
}

// 3. TOGGLE FAVORITE
function toggleFavorite() {
    let favorites = JSON.parse(localStorage.getItem('elevateFavs')) || [];
    
    if (favorites.includes(currentQuoteText)) {
        // Remove
        favorites = favorites.filter(q => q !== currentQuoteText);
        showToast("Removed");
    } else {
        // Add
        favorites.push(currentQuoteText);
        showToast("Saved to Favorites");
    }
    
    localStorage.setItem('elevateFavs', JSON.stringify(favorites));
    updateHeartVisual();
    renderFavoritesList();
}

// 4. RENDER FAVORITES LIST
function renderFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem('elevateFavs')) || [];
    favList.innerHTML = '';
    
    if (favorites.length === 0) {
        document.getElementById('emptyMsg').style.display = 'block';
    } else {
        document.getElementById('emptyMsg').style.display = 'none';
        favorites.forEach(q => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${q}
                <button class="delete-fav" onclick="deleteSpecificFav('${q.replace(/'/g, "\\'")}')">&times;</button>
            `;
            favList.appendChild(li);
        });
    }
}

// 5. DELETE SPECIFIC ITEM
window.deleteSpecificFav = function(quoteStr) {
    let favorites = JSON.parse(localStorage.getItem('elevateFavs')) || [];
    favorites = favorites.filter(q => q !== quoteStr);
    localStorage.setItem('elevateFavs', JSON.stringify(favorites));
    renderFavoritesList();
    updateHeartVisual(); // If current quote was deleted, update heart
}

// 6. SHARE
function shareQuote() {
    if (navigator.share) {
        navigator.share({
            title: 'Elevate Motivation',
            text: `"${currentQuoteText}" - via Elevate App`
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(`"${currentQuoteText}"`);
        showToast("Copied to Clipboard");
    }
}

// Toast Notification
function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2000);
}

// Event Listeners
document.getElementById('refreshBtn').addEventListener('click', loadNewQuote);
heartBtn.addEventListener('click', toggleFavorite);
document.getElementById('shareBtn').addEventListener('click', shareQuote);

// Open Favorites
document.getElementById('openFavBtn').addEventListener('click', () => {
    renderFavoritesList();
    favScreen.classList.add('open');
});

// Close Favorites
document.getElementById('closeFavBtn').addEventListener('click', () => {
    favScreen.classList.remove('open');
});

// Start
init();