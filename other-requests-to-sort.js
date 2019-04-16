app.get('/api/*', (req, res) => {
    res.json({ok: true});
  });

  app.get('/items', (req, res) => {
    Item
      .find()
      // .then(items => {
      //   res.json({
      //       items: items.map((item) => item.serialize())
      //   });
      // })
      .then(items => {
        res.json({
          items: items[Math.floor(Math.random() * Math.floor(items.length-1))]
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

  // POST for filters
  app.get('/random2', (req, res) => {
  God.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)
    God.findOne().skip(random)
        .then(god => {
            res.json({
              god: god.serialize()
            });
          })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
})

app.get('/random', (req, res) => {
    God
    .find()
        .then(gods => {
            
            res.json({
                gods: gods[Math.floor(Math.random() * Math.floor(gods.length-1))]
            });
          })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

app.get('/gods', (req, res) => {
    God
      .find({class: 'Warrior'})
      .then(gods => {
        res.json({
            // gods: gods[Math.floor(Math.random() * Math.floor(gods.length-1))]
            gods:gods
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });