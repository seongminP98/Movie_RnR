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
  //댓글 쓰기
  const post = req.body;
  db.query(
    `INSERT INTO comment(contents,created,commenter,movie_id)
            VALUES(?,now(),?,?);`,
    [post.contents, req.user.id, post.movie_id],
    function (error, result) {
      if (error) {
        next(error);
      }
      db.query(
        `SELECT * FROM comment WHERE contents=? and commenter=? and movie_id=?`,
        [post.contents, req.user.id, post.movie_id],
        function (error2, result2) {
          if (error2) {
            next(error2);
          }
          res.status(201).send({ code: 201, data: result2 });
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

    db.query(`SELECT commenter FROM user WHERE id=?`, [patch.id], function (error, result) {
      if (error) {
        next(error);
      }
      if (result[0].commenter != req.user.id) {
        return res.status(400).send({ code: 400, error: '다른 사용자가 작성한 댓글입니다.' });
      } else {
        //글 수정
        db.query(
          `UPDATE comment SET contents=?, updated=now() WHERE id=?;`,
          [patch.contents, patch.id],
          function (error, result) {
            if (error) {
              next(error);
            }
            db.query(`SELECT * FROM comment WHERE id=?`, [patch.id], function (error, result) {
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
    db.query(`SELECT commenter FROM comment WHERE id=?`, [req.params.id], function (error, result) {
      if (error) {
        next(error);
      }
      if (result[0].commenter != req.user.id) {
        return res.status(400).send({ code: 400, error: '다른 사용자가 작성한 글입니다.' });
      } else {
        //글 삭제
        db.query(`DELETE FROM comment WHERE id = ?;`, [req.params.id], function (error, result) {
          if (error) {
            next(error);
          }
          res.status(200).send({ code: 200 });
        });
      }
    });
  });

  router.get('/:id', async function (req, res, next) {//req.params.id > movie_id
    await db.query(`SELECT * FROM comment WHERE movie_id=?;`, [req.params.id], async function (error, result) {
      if (error) {
        next(error);
      }
      await db.query(`SELECT user.id, nickname from user LEFT JOIN comment ON user.id=comment.commenter WHERE user.id=?`,[req.user.id],
      function (error2, result2){
        if(error2){
          next(error2);
        }
        console.log({...result, user:{...result2}});
        res.status(200).send({ code: 200, data: { comment: { ...result }, user: { ...result2 } } });
      }
      )
      
    });
  });

module.exports = router;