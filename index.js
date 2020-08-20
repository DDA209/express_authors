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
        books: []
    }
]

const homePage = '<a href="../../"><p>Homepage</p></a>'

let authorId = 0;
let arrGetUrl = [];

// Homepage
app.get('/', (req, res,) => {
    console.log('GET /');

    let authors = '';

    api.map( (obj) => {
        // console.log('obj', obj.author)
        authors = authors + `<li><a href="./${obj.id}">${obj.author}</a></li>`
    })

    res.send(`
        <h1>Authors API</h1>
        <ol>
            ${authors}
        </ol>
    `);

});


// other pages
app.get('/*', (req, res) => {
    arrGetUrl = req.url.split('/'); // récupération des éléments de l'URL dans un array
    authorId = parseInt(arrGetUrl[1]); // récupération de l'ID de l'auteur dans l'URL

    console.log('GET * :'); 
    console.log('1 - req.url',req.url); // URL user
    // console.log('2 - arrGetUrl', arrGetUrl);
    console.log('3 - authorId', authorId);
    // console.log('4 - api.length', api.length);
    // console.log('5 - arrGetUrl[3]', arrGetUrl[3]);


    if ( isNaN(authorId) || arrGetUrl.length > 3 || (arrGetUrl.length === 3 && arrGetUrl[2] !== 'books')  ) {
        console.log("Erreur 404");
        res.send(`404 error : This page does not exists. Go to${homePage}` )
        
    } else if (authorId > api.length || authorId < 1) {

        console.log("Erreur de n° d'auteur");
        res.send( `The author with the ID ${authorId} does not exist`);

    } else if (authorId <= api.length && authorId > 0) {
        if (arrGetUrl[2]){

            // res.send(`<h2>${api[authorId -1 ].author}</h2>`)
            // console.log('api[authorId -1 ].books', api[authorId -1 ].books);
            
            let result = ''
            
            api[authorId -1 ].books.map( (book)=>{
                // console.log('book', book);
                result = result + `<p>${book}</p>`
            });
            
            // console.log('result', result);

            res.send( `
                ${homePage}
                <a href="../${authorId}">
                    <h3>${api[authorId -1 ].author}</h3>
                </a>
                ${result}
            ` );
            

        } else {

            // console.log('api[authorId].name', api[authorId -1].author);
            res.send(`
                ${homePage}
                <h2>${api[authorId -1 ].author}</h2>
                <a href="${authorId}/books"><p>Livres</p></a>
            `);

        };
    
    };

    // console.log('----------------------------');
    
})         

app.listen( port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`)
})