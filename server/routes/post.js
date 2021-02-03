const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const db = require('../lib/db');
const qs = require('querystring');

router.post('/', function(req,res){ //create
    const post = req.body;
    if(post.rates >10){
        post.rates=10;
    }
    db.query(
        `INSERT INTO movie(title,description,genre,rates,created)
        VALUES(?,?,?,?,NOW());`,
        [post.title,post.overview,post.genres,post.rates],
        function(error,result){
            if(error){
                throw error;
            }
            res.redirect(`/`);
        }
    );
});

router.post('/update_process',function(req,res){
    const post = req.body;
    if(post.rates >10){
        post.rates=10;
    }
    db.query(
        `UPDATE movie SET title=?, description=?, genre=?, rates=?, updated=NOW() WHERE id=?;`
        ,[post.title,post.overview,post.genres,post.rates,post.id],
        function(error,result){
            if(error){
                throw error;
            }
            res.redirect(`/`);
        }
    );
});

router.delete('/', function(req,res){
    const post = res.body;
    db.query(`DELETE FROM movie WHERE id = ?;`,[post.id],function(error,result){
        if(error){
            throw error;
        }
        res.redirect('/');
    });
});

router.get('/', async function(req,res){
    await db.query(
        `SELECT * FROM movie ORDER BY created desc LIMIT 20;`,function(error,result){
            if(error){
                throw error;
            }
            res.json(result);
        }
    );
});

router.get('/:id',async function(req,res){
    await db.query(
        `SELECT * FROM movie WHERE id=?;`,[req.params.id],function(error,result){
            if(error){
                throw error;
            }
            res.json(result);
        }
    );
});

module.exports = router;
