const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

let cards = null;

start_game();

function start_game(){
    // cards = game.create_cards();
    initialize_cards(game.create_cards());
}

function initialize_cards(cards){
    let game_board = document.getElementById("game_board");
    game_board.innerHTML = ''
    game.cards.forEach(card =>{
        let card_element = document.createElement('div');
        card_element.id = card.id;
        card_element.classList.add(CARD);
        card_element.dataset.icon = card.icon;

        create_card_content(card, card_element);

        card_element.addEventListener('click', flipcard)
        game_board.appendChild(card_element);
    })
    
}

function create_card_content(card, card_element){
    create_card_face(FRONT, card, card_element);
    create_card_face(BACK, card, card_element);
}

function create_card_face(face, card, element){
    let card_element_face = document.createElement('div');
    card_element_face.classList.add(face);
    if (face === FRONT){
        let icon_element = document.createElement('img')
        icon_element.classList.add(ICON);
        icon_element.src = "./images/" + card.icon + ".png";
        card_element_face.appendChild(icon_element)
    } else{
        card_element_face.innerHTML = "&lt/&gt";
    }
    element.appendChild(card_element_face);
}

function shuffle_cards(cards){
    let current_index = cards.length;
    let random_index = 0;

    while(current_index !== 0){
        random_index = Math.floor(Math.random() * current_index);
        current_index--;

        [cards[random_index], cards[current_index]] = [cards[current_index], cards[random_index]]
    }
}

function flipcard(){
    if (game.set_card(this.id)){
        this.classList.add('flip');
        if (game.second_card){
            if (game.check_match()){
                game.clear_cards();
                if (game.check_gameover()){
                    let gameover_layer = document.getElementById("game_over");
                    gameover_layer.style.display = 'flex';
                }
            } else{
                setTimeout(() => {
                    let first_cardView = document.getElementById(game.first_card.id);
                    let second_cardView = document.getElementById(game.second_card.id);

                    first_cardView.classList.remove('flip');
                    second_cardView.classList.remove('flip');
                    game.unflip_cards()
                }, 1000);
            }
        }
    }
}

function restart(){
    start_game();
    let gameover_layer = document.getElementById("game_over");
    gameover_layer.style.display = 'none';
}