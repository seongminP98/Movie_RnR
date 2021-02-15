const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const db = require('../lib/db');
const qs = require('querystring');
const authCheck = require('../lib/authCheck');

router.post('/', function (req, res, next) {
  if (!authCheck.IsOwner(req, res)) {
    console.log('not login');
    return res.status(400).send({ code: 400, error: 'not login' });
  }
  //글 쓰기
  const post = req.body;
  if (post.rates > 10) {
    post.rates = 10;
  }
  db.query(
    `INSERT INTO movie(title,overview,genres,rates,created,user_id)
            VALUES(?,?,?,?,NOW(),?);`,
    [post.title, post.overview, post.genres, post.rates, req.user.id],
    function (error, result) {
      if (error) {
        next(error);
      }
      db.query(
        `SELECT * FROM movie WHERE title=? and overview=? and genres=?`,
        [post.title, post.overview, post.genres],
        function (error, result) {
          if (error) {
            next(error);
          }
          res.status(201).send({ code: 201, data: result });
        }
      );
    }
  );
});

router.patch('/update', function (req, res, next) {
  if (!authCheck.IsOwner(req, res)) {
    return res.status(400).send({ code: 400, error: 'not login' });
  }
  const patch = req.body;
  if (patch.rates > 10) {
    patch.rates = 10;
  }
  db.query(`SELECT user_id FROM movie WHERE id=?`, [patch.id], function (error, result) {
    if (error) {
      next(error);
    }
    if (result[0].user_id != req.user.user_id) {
      return res.status(400).send({ code: 400, error: '다른 사용자가 작성한 글입니다.' });
    } else {
      //글 수정
      db.query(
        `UPDATE movie SET title=?, overview=?, genres=?, rates=?, updated=NOW() WHERE id=?;`,
        [patch.title, patch.overview, patch.genres, patch.rates, patch.id],
        function (error, result) {
          if (error) {
            next(error);
          }
          db.query(`SELECT * FROM movie WHERE id=?`, [patch.id], function (error, result) {
            if (error) {
              next(error);
            }
            res.status(201).send({ code: 201, data: result });
          });
        }
      );
    }
  });
});

router.delete('/:id', function (req, res, next) {
  if (!authCheck.IsOwner(req, res)) {
    return res.status(400).send({ code: 400, error: 'not login' });
  }
  db.query(`SELECT user_id FROM movie WHERE id=?`, [req.params.id], function (error, result) {
    if (error) {
      next(error);
    }
    if (result[0].user_id != req.user.user_id) {
      return res.status(400).send({ code: 400, error: '다른 사용자가 작성한 글입니다.' });
    } else {
      //글 삭제
      db.query(`DELETE FROM movie WHERE id = ?;`, [req.params.id], function (error, result) {
        if (error) {
          next(error);
        }
        res.status(200).send({ code: 200 });
      });
    }
  });
});

router.get('/', async function (req, res, next) {
  await db.query(`SELECT * FROM movie ORDER BY created desc LIMIT 20;`, function (error, result) {
    if (error) {
      next(error);
    }
    res.json(result);
  });
});

router.get('/:id', async function (req, res, next) {
  await db.query(`SELECT * FROM movie WHERE id=?;`, [req.params.id], async function (error, result) {
    if (error) {
      next(error);
    }
    await db.query(`SELECT user.id, nickname from user LEFT JOIN movie ON user.id=movie.user_id WHERE movie.id=?`,[req.params.id],
    function (error2, result2){
      if(error2){
        next(error2);
      }
      console.log({...result, user:{...result2}});
      res.json({...result, user:{...result2}});
    }
    )
    
  });
});

module.exports = router;
