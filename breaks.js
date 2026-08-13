let quoteList = [
    `“Stay afraid, but do it anyway. What's important is the action. You don't have to wait to be confident. Just do it and eventually the confidence will follow.” - Carrie Fisher`,
    `“One can choose to go back toward safety or forward toward growth. Growth must be chosen again and again; fear must be overcome again and again.” - Abraham Maslow`,
    `“Be not afraid of growing slowly; be afraid only of standing still.” - Chinese Proverb`,
    `“When someone tells me 'no,' it doesn't mean I can't do it, it simply means I can't do it with them.” - Karen E. Quinones Miller`,
    `“I'm a great believer in luck, and I find the harder I work the more I have of it.” - Thomas Jefferson`,
    `“We are products of our past, but we don't have to be prisoners of it.” - Rick Warren`,
    `“Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails.” - Mark Twain`,
    `“Without ambition one starts nothing. Without work one finishes nothing. The prize will not be sent to you. You have to win it.” - Ralph Waldo Emerson`,
    `“We often miss opportunity because it's dressed in overalls and looks like work.” - Thomas A. Edison`,
    `“The difference between ordinary and extraordinary is that little extra.” - Jimmy Johnson`,
    `“Every morning we are born again. What we do today is what matters most.” - Buddha`
]

let storeRem = "";

function genQuote() {
    document.getElementById("quote").hidden = false;
    let a = document.getElementById("insquo");
    let rand = Math.floor(Math.random() * quoteList.length);
    if (quoteList.length == 11) {
        storeRem = quoteList[rand];
        a.innerHTML = storeRem;
        quoteList.splice(rand, 1);
    }
    else if (quoteList.length < 11) {
        quoteList.push(storeRem);
        storeRem = quoteList[rand];
        a.innerHTML = storeRem;
        quoteList.splice(rand, 1);
    }
}

document.getElementById("quoteDir").onclick = genQuote; // do not put () by it; this will make the function run automatically (disregards
// need for click)
document.getElementById("regen").onclick = genQuote;