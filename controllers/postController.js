const posts = require("../data/posts")

const connection = require('../data/db')

//index (read)
function index(req, res) {

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })

        res.json(results)
    })
}

//show (read)
function show(req, res) {

    const postSlug = req.params.Slug.replaceAll("-", " ")

    const sql = `SELECT * FROM posts WHERE title LIKE ? `

    const sqlJoin = `
    SELECT tags.*
    FROM post_tag
    JOIN tags ON post_tag.tag_id = tags.id
    WHERE post_tag.post_id = ?`


    connection.query(sql, [postSlug], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed 1' })

        if (results.length === 0) return res.status(404).json({ message: 'Post not found' })

        const post = results[0]

        console.log(post);


        connection.query(sqlJoin, [post.id], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database query failed 2' })

            post.tags = results

            res.json(post)
        })

    })
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

    const sql = `DELETE FROM posts WHERE title LIKE '${postSlug.replaceAll("-", " ")}'`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })

        console.log('delete complite');

        res.sendStatus(204)
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}