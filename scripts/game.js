let game = {
    techs: ['bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'],
    cards: null,

    lockMode: false,
    first_card: null,
    second_card: null,

    set_card: function (id){
        let card = this.cards.filter(card=>card.id===id)[0];
        if (card.flipped || this.lockMode){
            return false;
        }
        if (!this.first_card){
            this.first_card = card;
            this.first_card.flipped = true;
            return true;
        } else{
            this.second_card = card;
            this.second_card.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    check_gameover(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    check_match: function(){
        if (!this.first_card || !this.second_card){
            return false
        }
        return (this.first_card.icon === this.second_card.icon);
    },

    clear_cards: function(){
        this.first_card = null;
        this.second_card = null;
        this.lockMode = false;
    },

    unflip_cards: function(){
        this.first_card.flipped = false;
        this.second_card.flipped = false;
        this.clear_cards();
    },
    
    create_cards: function(){
        this.cards = [];
        this.techs.forEach( (tech) => {
            this.cards.push(this.create_pair(tech));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffle_cards();
        return this.cards
    },

    create_pair: function(tech){
        return [{
            id: this.create_id(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.create_id(tech),
            icon: tech,
            flipped: false, 
        }]
    },

    create_id: function(tech){
        return tech + parseInt(Math.random() * 1000);
    },

    shuffle_cards: function(cards){
        let current_index = this.cards.length;
        let random_index = 0;
    
        while(current_index !== 0){
            random_index = Math.floor(Math.random() * current_index);
            current_index--;
    
            [this.cards[random_index], this.cards[current_index]] = [this.cards[current_index], this.cards[random_index]]
        }
    },

}