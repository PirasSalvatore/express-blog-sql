const posts = require("../data/posts")

const connection = require('../data/db')

//index (read)
function index(req, res) {

    let postsFiltered = posts

    const filter = req.query.tags

    console.log(filter);
    console.log(posts[0].tags.join("").replaceAll(" ", ""))


    if (filter) {
        /*
        utilizzo la funzione join per trasformare l'array tag in una stringa
        utilizzo la funzione replaceALL per andare a rimuovere eventuali spazzi nella stringa
        utilizzo la funzione includes per verificare se nella stringa generata è presente il pattern per il filtro
        */
        postsFiltered = posts.filter(post => post.tags.join("").replaceAll(" ", "").includes(filter))
    }

    res.json(postsFiltered)
}

//show (read)
function show(req, res) {

    const postSlug = req.params.Slug

    console.log(postSlug.length);


    const post = postSlug.length > 2 ? posts.find((post) => post.slug === postSlug) : posts.find((post) => post.id === Number(postSlug))

    if (!post) {

        return res.status(404).json({
            error: "404 NOT FOUD",
            messege: "post not found"
        })
    }

    res.json(post);
}

//store (create)
function store(req, res) {

    //ricavo i parametri nel corpo della richiesta
    const { title, content, image, tags } = req.body

    //creo un nuovo post
    const newPost = {
        title: title,
        slug: title.toLowerCase().replaceAll(" ", "-"),
        content: content,
        image: image,
        tags: tags
    }

    // inserisco il nuovo post nell'array dei post
    posts.push(newPost)

    //rispondo alla richiesta con uno status 201 e con il json del nuovo post
    res.status(201).json(newPost)

}

//update (update)
function update(req, res) {
    // mi ricavo lo slug dalla richiest
    const postSlug = req.params.Slug

    //prendo il post corrispondente a quello richiesto
    const post = posts.find((post) => post.slug === postSlug)

    //controllo se esiste
    if (!post) {

        return res.status(404).json({
            error: "404 NOT FOUD",
            messege: "post not found"
        })
    }

    //ricavo i parametri nel corpo della richiesta
    const { title, slug, content, image, tags } = req.body

    //creo un nuovo post
    const newPost = {
        title: title,
        slug: slug,
        content: content,
        image: image,
        tags: tags
    }

    //sostituisco il vecchio con il nuovo
    posts[posts.indexOf(post)] = newPost

    //loggo l'array post
    console.log(posts);

    //rispondo alla richiesta con  il json del post modificato
    res.json(newPost)
}

//partial update (modify)
function modify(req, res) {
    const postSlug = req.params.Slug
    res.send(`modify your post have Slug : ${postSlug}`);
}

//delete (delete)
function destroy(req, res) {

    const postSlug = req.params.Slug

    const post = posts.find((post) => post.slug === postSlug)

    if (!post) {

        return res.status(404).json({
            error: "404 NOT FOUD",
            messege: "post not found"
        })
    }


    posts.splice(posts.indexOf(post), 1)

    console.log(posts);

    res.sendStatus(204);
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}