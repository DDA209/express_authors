const express = require ('express');

const app = express();

const port = 3000;

const api = [
    {
        id: 1,
        author: 'Lawrence Nowell',
        nationality: 'UK',
        books: ['Beowulf']
    },
    {
        id: 2,
        author: 'William Shakespeare',
        nationality: 'UK',
        books: ['Hamlet', 'Othello', 'Romeo and Juliet', 'MacBeth']
    },
    {
        id: 3,
        author: 'Charles Dickens',
        nationality: 'US',
        books: ['Oliver Twist', 'A Christmas Carol']
    },
    {
        id: 4,
        author: 'Oscar Wilde',
        nationality: 'UK',
        books: ['The Picture of Dorian Gray', 'The Importance of Being Earnest']
    },
    {
        id: 5,
        author: 'Didier Pascarel',
        nationality: 'FR',
        books: null
    }
]


let authorId = 0;
let arrGetUrl = [];

// Homepage
app.get('/', (req, res) => {
    console.log('GET /')

    res.send('Authors API')

});


// other pages
app.get('*', (req, res) => {
    arrGetUrl = req.url.split('/'); // récupération des éléments de l'URL dans un array
    authorId = parseInt(arrGetUrl[1]); // récupération de l'ID de l'auteur dans l'URL

    console.log('GET * :'); 
    console.log('1 - req.url',req.url); // URL user
    console.log('2 - arrGetUrl', arrGetUrl);
    console.log('3 - authorId', authorId);
    console.log('4 - api.length', api.length);
    console.log('----------------------------');


    if ( authorId === NaN ) {
        //s'il y a trop d'arguments ou que l'ID de l'auteur de l'URL n'est pas un nombre on renvoie à la homepage
        res.send('<p>Error page not found. <a href="/">Go to homepage</a></p>')
        
    } else if (authorId <= api.length) {
        if (arrGetUrl[2]){

            // res.send(`<h2>${api[authorId -1 ].author}</h2>`)
            console.log('api[authorId -1 ].books', api[authorId -1 ].books);
            
            res.send( 
                api[authorId -1 ].books.map( (book)=>{
                `<p>${book}</p>` 
                })
                
            );

        } else {

            console.log('api[authorId].name', api[authorId -1].author);
            res.send( `<h3>${api[authorId -1 ].author}</h3>` );

        };
    } else {
        `The author with the ID ${authorId} does not exist`;
    };
    
})         

app.listen( port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`)
})